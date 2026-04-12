"use client";
import type { ComponentProps, PropsWithChildren } from "react";
import type { FieldPath } from "react-hook-form";

import { ChevronDown, Plus, Trash } from "lucide-react";
import Image from "next/image";
import {
  Suspense,
  use,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import type { SheetController } from "@/features/media/components/mediaPickerSheet";
import type { Category } from "@/services/article/types";
import type { Option, ProductType } from "@/services/product/type";

import RichEditor from "@/components/dashboard/rich-editor";
import { Button } from "@/components/dashboard/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/dashboard/ui/field";
import { Input } from "@/components/dashboard/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/dashboard/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/dashboard/ui/tabs";
import { Textarea } from "@/components/dashboard/ui/textarea";
import { CURRENCY } from "@/constant/appData";
import MediaPickerSheet from "@/features/media/components/mediaPickerSheet";
import { convertToSlug } from "@/lib/slug";
import { cn } from "@/lib/utils";
import { StatusDictionary } from "@/services/article/types";

import type { CreateProductInput } from "../validations/product.schema";

import SelectMultipleOptionItem from "./options/selectMultipleOptionItem";
import SelectMultipleCategories, {
  SelectMultipleCategoriesSkeleton,
} from "./selectMultipleCategories";
import StatusDropdown from "./statusDropdown";

const useProductFormContext = useFormContext<CreateProductInput>;

export const ProductName = ({ ...props }: ComponentProps<typeof Input>) => {
  const { control } = useProductFormContext();
  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>نام محصول</FieldLabel>
          <Input id={field.name} placeholder="تخت خواب" {...field} {...props} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const ProductSlug = () => {
  const { control, setValue, getValues } = useProductFormContext();
  return (
    <Controller
      name="slug"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="slug">Slug</FieldLabel>
          <Input
            dir="ltr"
            id="slug"
            placeholder="article-about"
            {...field}
            onFocus={(e) => {
              if (!e.target.value) {
                setValue("slug", convertToSlug(getValues("name")), {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }
            }}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const ProductExcerpt = () => {
  const { control } = useProductFormContext();
  return (
    <Controller
      name="excerpt"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="excerpt">توضیح کوتاه محصول</FieldLabel>
          <Textarea id="excerpt" {...field} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const ProductCategories = ({
  categories,
}: {
  categories: Promise<Category[]>;
}) => {
  const { control, setValue } = useProductFormContext();
  return (
    <Controller
      name="categoryIds"
      control={control}
      render={({ fieldState, field: { value } }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="categories">انتخاب دسته بندی ها</FieldLabel>
          <Suspense fallback={<SelectMultipleCategoriesSkeleton />}>
            <SelectMultipleCategories
              selectedItems={value}
              triggerId="categories"
              categories={categories}
              onSelect={({ id }) => {
                if (value.includes(id)) {
                  setValue(
                    "categoryIds",
                    value.filter((i) => i !== id),
                    { shouldDirty: true },
                  );
                } else {
                  setValue("categoryIds", [...value, id], {
                    shouldDirty: true,
                  });
                }
              }}
            />
          </Suspense>
        </Field>
      )}
    />
  );
};
export const ProductGallery = () => {
  const { control, setValue } = useProductFormContext();
  const sheetControllerRef = useRef<SheetController>(null);
  return (
    <Controller
      name="gallery"
      control={control}
      render={({ fieldState: { invalid }, field: { name, value } }) => {
        const dataValue = value || [];
        const dataValidValues = dataValue.filter(
          (item) => !!item && typeof item !== "string",
        );
        const dataValueIds = dataValidValues.map(({ id }) => id);

        const removeItem = (id: string) => {
          setValue(
            name,
            [...dataValidValues.filter(({ id: prevId }) => id !== prevId)],
            {
              shouldDirty: true,
            },
          );
        };
        return (
          <Field aria-invalid={invalid}>
            <FieldLabel htmlFor={name}>انتخاب تصویر گالری</FieldLabel>
            <Suspense fallback={null}>
              <MediaPickerSheet
                mediaKey="image"
                selectedIds={dataValueIds}
                controllerRef={sheetControllerRef}
                onSelect={({ id, url }) => {
                  if (dataValueIds.includes(id)) {
                    removeItem(id);
                  } else {
                    setValue(name, [...dataValue, { id, url }], {
                      shouldDirty: true,
                    });
                  }
                  // sheetControllerRef.current?.close();
                }}
              />
            </Suspense>

            <div className="bg-background shadow-xs hover:text-accent-foreground dark:bg-input/30 dark:border-input gap-2 p-4 border-3 rounded-xl grid grid-cols-3 auto-rows-fr">
              {dataValidValues.map(({ url, id }) => (
                <div className="relative group" key={id}>
                  <Button
                    size="icon-sm"
                    className="absolute end-1.5 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:scale-100 opacity-0 invisible pointer-events-none scale-75 transition-all top-1.5 z-20 text-destructive"
                    variant="outline"
                    onClick={() => removeItem(id)}
                  >
                    <Trash />
                  </Button>
                  <Image
                    alt="image preview"
                    className="size-full object-cover rounded-xl"
                    src={{
                      src: url,
                      width: 128,
                      height: 128,
                    }}
                  />
                </div>
              ))}
              <Button
                className="size-full"
                id={name}
                type="button"
                variant="outline"
                onClick={() => {
                  sheetControllerRef.current?.open();
                }}
              >
                <Plus />
              </Button>
            </div>
          </Field>
        );
      }}
    />
  );
};
const SingleImagePicker = ({
  name,
  className,
}: {
  name: FieldPath<CreateProductInput>;
  className?: string;
}) => {
  const sheetControllerRef = useRef<SheetController>(null);

  const { control, setValue } = useProductFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState, field: { value } }) => {
        const validImageUrl = value && typeof value !== "string";
        return (
          <div className={cn("relative", className)}>
            <Field aria-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={name}>انتخاب تصویر شاخص</FieldLabel>
              <Suspense fallback={null}>
                <MediaPickerSheet
                  mediaKey="image"
                  controllerRef={sheetControllerRef}
                  onSelect={({ id, url }) => {
                    setValue(name, { id, url }, { shouldDirty: true });
                    sheetControllerRef.current?.close();
                  }}
                  selectedIds={
                    validImageUrl ? [value.id] : value ? [value] : []
                  }
                />
              </Suspense>
              <Button
                className="w-full h-32"
                id={name}
                variant="outline"
                onClick={() => sheetControllerRef.current?.open()}
              >
                {validImageUrl && (
                  <Image
                    alt="image preview"
                    className="size-full object-contain"
                    src={{
                      src: value.url,
                      width: 128,
                      height: 128,
                    }}
                  />
                )}
              </Button>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
            {value && (
              <Button
                size="icon-sm"
                className="absolute end-4 top-10 z-20 text-destructive"
                variant="outline"
                onClick={() =>
                  setValue(name, null, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              >
                <Trash />
              </Button>
            )}
          </div>
        );
      }}
    />
  );
};

export const ProductThumbnail = () => {
  return <SingleImagePicker name="thumbnailId" />;
};

export const ProductStatus = ({ isPending }: { isPending: boolean }) => {
  const { setValue, control } = useProductFormContext();
  return (
    <Controller
      name="status"
      control={control}
      render={({ fieldState, field: { value } }) => {
        return (
          <Field aria-invalid={fieldState.invalid} className="w-max">
            <StatusDropdown
              value={value}
              onChange={(v) => setValue("status", v, { shouldDirty: true })}
            >
              <Button disabled={isPending} variant="outline">
                <span>{StatusDictionary[value]}</span>
                <ChevronDown />
              </Button>
            </StatusDropdown>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export const ProductContent = () => {
  const { control, setValue } = useProductFormContext();
  return (
    <Controller
      name="content"
      control={control}
      render={({ fieldState, field: { value } }) => {
        return (
          <Field aria-invalid={fieldState.invalid}>
            <RichEditor
              content={value}
              onUpdate={(content) => {
                setValue("content", content, { shouldDirty: true });
              }}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

interface MetaProps {
  metaIndex: number;
}

const ProductPriceCurrencty = ({ metaIndex }: MetaProps) => {
  const { control } = useProductFormContext();
  return (
    <Controller
      defaultValue="IRR"
      name={`metadata.${metaIndex}.price.currency`}
      control={control}
      render={({ field: currencyField, fieldState: currencyState }) => (
        <Field aria-invalid={currencyState.invalid} className="max-w-fit">
          <Select
            value={currencyField.value}
            onValueChange={currencyField.onChange}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCY.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
};
const ProductPriceAmount = ({
  metaIndex,
  children,
}: PropsWithChildren<MetaProps>) => {
  const { control } = useProductFormContext();
  return (
    <Controller
      defaultValue={0}
      name={`metadata.${metaIndex}.price.amount`}
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>قیمت محصول</FieldLabel>
          <div className="flex gap-2">
            <Input {...field} id={field.name} placeholder="120000" />
            {children}
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

const ProductPriceFields = ({ metaIndex }: MetaProps) => {
  return (
    <ProductPriceAmount metaIndex={metaIndex}>
      <ProductPriceCurrencty metaIndex={metaIndex} />
    </ProductPriceAmount>
  );
};

const ProductStock = ({ metaIndex }: MetaProps) => {
  const { control } = useProductFormContext();
  return (
    <Controller
      defaultValue={-1}
      name={`metadata.${metaIndex}.stock`}
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>موجودی</FieldLabel>
          <FieldDescription>
            عدد -1 به معنی نامحدود بودن و عدد 0 به معنای ناموجود بودن است
          </FieldDescription>
          <Input {...field} id={field.name} placeholder="120" />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
const ProductVariantThumbnail = ({
  metaIndex,
  className,
}: MetaProps & { className?: string }) => {
  return (
    <SingleImagePicker
      className={className}
      name={`metadata.${metaIndex}.thumbnailId`}
    />
  );
};
const ProductDefaultMeta = () => {
  return (
    <FieldGroup>
      <ProductPriceFields metaIndex={0} />
      <ProductStock metaIndex={0} />
    </FieldGroup>
  );
};
const VariableSection = ({
  children,
  className,
  ...more
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "p-4 rounded-xl border border-dashed border-border",
        className,
      )}
      {...more}
    >
      {children}
    </div>
  );
};

const HiddenOptionItemIdsInput = ({
  optionItemIds,
  metaIndex,
}: {
  optionItemIds: string;
  metaIndex: number;
}) => {
  const { control, setValue } = useProductFormContext();
  const fieldName = `metadata.${metaIndex}.optionItemIds` as const;
  const setNewIdValue = useEffectEvent(() => {
    setValue(fieldName, optionItemIds);
  });
  useEffect(() => {
    setNewIdValue();
  }, [optionItemIds]);
  return (
    <Controller
      defaultValue={optionItemIds}
      name={fieldName}
      control={control}
      render={({ field }) => (
        <Input type="hidden" {...field} value={optionItemIds} />
      )}
    />
  );
};

const VariableItemLoop = ({
  items,
  counterToZiro,
  index,
  parrentId,
}: {
  items: { id: string; label: string }[][];
  counterToZiro: number;
  index?: number;
  parrentId?: string[];
}) => {
  if (items.length === 0) return;
  if (counterToZiro === 0) {
    return (
      <>
        {items[counterToZiro].map(({ id, label }, i) => {
          const regularIndex = index
            ? items[counterToZiro].length * index + i
            : i;
          const optionItemIds = parrentId
            ? [...parrentId, id].sort().join("|")
            : id;
          return (
            <VariableSection data-key={regularIndex} key={id}>
              <p className="mb-3">{label}</p>
              <FieldGroup>
                <ProductPriceFields metaIndex={regularIndex} />
                <HiddenOptionItemIdsInput
                  metaIndex={regularIndex}
                  optionItemIds={optionItemIds}
                />
                <div className="flex gap-4">
                  <ProductStock metaIndex={regularIndex} />
                  <ProductVariantThumbnail
                    className="flex-1/4"
                    metaIndex={regularIndex}
                  />
                </div>
              </FieldGroup>
            </VariableSection>
          );
        })}
      </>
    );
  }
  return (
    <>
      {items[counterToZiro].map(({ id, label }, i) => {
        const regularIndex = index
          ? items[counterToZiro].length * index + i
          : i;
        const idList = parrentId ? [...parrentId, id] : [id];
        return (
          <VariableSection className="flex flex-col gap-4" data-i={i} key={id}>
            <p>{label}</p>
            <VariableItemLoop
              index={regularIndex}
              items={items}
              parrentId={idList}
              counterToZiro={counterToZiro - 1}
            />
          </VariableSection>
        );
      })}
    </>
  );
};
type SelectOptionState = Record<string, { id: string; label: string }[]>;
const VariableMapHanlder = ({
  selectedOptionItem,
}: {
  selectedOptionItem: SelectOptionState;
}) => {
  const valueOfSelectedOptionItems = Object.values(selectedOptionItem).filter(
    (option) => option.length > 0,
  );
  return (
    <VariableItemLoop
      items={valueOfSelectedOptionItems}
      counterToZiro={valueOfSelectedOptionItems.length - 1}
    />
  );
};
const ProductVariableMeta = ({ options }: { options: Option[] }) => {
  const [selectedOptionItem, setSelectedOptionItem] =
    useState<SelectOptionState>({});
  const selectedIds: string[] = Object.values(selectedOptionItem)
    .flat()
    .map(({ id }) => id);
  return (
    <FieldGroup>
      <SelectMultipleOptionItem
        selectedItems={selectedIds}
        onSelect={({ id, optionId, label }) => {
          if (selectedIds.indexOf(id) === -1) {
            setSelectedOptionItem((prev) => {
              const prevOptionData = prev[optionId] || [];
              return {
                ...prev,
                [optionId]: [...prevOptionData, { id, label }],
              };
            });
          } else {
            setSelectedOptionItem((prev) => {
              const prevOptionData = prev[optionId].filter(
                ({ id: prevId }) => id !== prevId,
              );
              return {
                ...prev,
                [optionId]: prevOptionData,
              };
            });
          }
        }}
        options={options}
      />
      <VariableMapHanlder selectedOptionItem={selectedOptionItem} />
    </FieldGroup>
  );
};
export const ProductMeta = ({ options }: { options: Promise<Option[]> }) => {
  const optionsData = use(options);
  const { control, setValue } = useProductFormContext();
  const typeValue = useWatch({ control, name: "type" });
  return (
    <div className="flex flex-col gap-3">
      <h4>نوع محصول</h4>
      <Tabs
        defaultValue="default"
        value={typeValue}
        onValueChange={(v) => setValue("type", v as ProductType)}
      >
        <TabsList className="w-full">
          <TabsTrigger defaultChecked value="default">
            معمولی
          </TabsTrigger>
          <TabsTrigger value="variable">متغیر</TabsTrigger>
        </TabsList>
        <TabsContent value="default">
          <FieldGroup>
            <ProductDefaultMeta />
          </FieldGroup>
        </TabsContent>
        <TabsContent value="variable">
          <FieldGroup>
            <ProductVariableMeta options={optionsData} />
          </FieldGroup>
        </TabsContent>
      </Tabs>
    </div>
  );
};
