"use client";

import type { ComponentProps, PropsWithChildren } from "react";
import type { FieldPath, FieldPathValue } from "react-hook-form";

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
import type {
  Category,
  Option,
  ProductType,
  ProductVariableMeta,
} from "@/services/product/type";

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
import { StatusDictionary } from "@/services/product/type";

import type { CreateProductInput } from "../validations/product.schema";

import { OPTION_ITEM_IDS_SEPARATOR } from "../constant";
import { useEditProductContext } from "../context/editProduct";
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
            placeholder="product-name"
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
                }}
              />
            </Suspense>

            <div className="bg-background shadow-xs hover:text-accent-foreground dark:bg-input/30 dark:border-input gap-2 p-4 border-3 rounded-xl grid grid-cols-3 auto-rows-fr">
              {dataValidValues.map(({ url, id }) => (
                <div className="relative group" key={id}>
                  <Button
                    size="icon-sm"
                    className="absolute end-1.5 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:scale-100 opacity-0 invisible pointer-events-none scale-75 transition-all top-1.5 z-20 text-destructive backdrop-blur-xs "
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
  defaultValue,
}: {
  name: FieldPath<CreateProductInput>;
  defaultValue?: FieldPathValue<CreateProductInput, "thumbnail">;
  className?: string;
}) => {
  const sheetControllerRef = useRef<SheetController>(null);
  const { control, setValue } = useProductFormContext();
  return (
    <Controller
      defaultValue={defaultValue}
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
              <div className="relative">
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
                {value && (
                  <Button
                    size="icon-sm"
                    className="absolute end-2 top-2 z-20 text-destructive backdrop-blur-xs"
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          </div>
        );
      }}
    />
  );
};

export const ProductThumbnail = () => {
  return <SingleImagePicker name="thumbnail" />;
};

export const ProductStatus = ({
  isPending,
  className,
}: {
  isPending: boolean;
  className?: string;
}) => {
  const { setValue, control } = useProductFormContext();
  return (
    <Controller
      name="status"
      control={control}
      render={({ fieldState, field: { value } }) => {
        return (
          <Field
            aria-invalid={fieldState.invalid}
            className={cn("w-max", className)}
          >
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
  metaIndex: number | string;
}

const ProductPriceCurrencty = ({
  metaIndex,
  defaultValue = "IRR",
}: MetaProps & {
  defaultValue?: FieldPathValue<
    CreateProductInput,
    "metadata.0.price.currency"
  >;
}) => {
  const { control } = useProductFormContext();
  return (
    <Controller
      defaultValue={defaultValue}
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
  defaultValue = 0,
}: PropsWithChildren<
  MetaProps & {
    defaultValue?: FieldPathValue<
      CreateProductInput,
      "metadata.0.price.amount"
    >;
  }
>) => {
  const { control } = useProductFormContext();

  return (
    <Controller
      defaultValue={defaultValue}
      name={`metadata.${metaIndex}.price.amount`}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Field aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>قیمت محصول</FieldLabel>
            <div className="flex gap-2">
              <Input {...field} id={field.name} placeholder="120000" />
              {children}
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

const ProductPriceFields = ({
  metaIndex,
  defaultValue,
}: MetaProps & {
  defaultValue?: FieldPathValue<CreateProductInput, "metadata.0.price">;
}) => {
  return (
    <ProductPriceAmount
      defaultValue={defaultValue?.amount}
      metaIndex={metaIndex}
    >
      <ProductPriceCurrencty
        defaultValue={defaultValue?.currency}
        metaIndex={metaIndex}
      />
    </ProductPriceAmount>
  );
};

const ProductStock = ({
  metaIndex,
  defaultValue = -1,
}: MetaProps & {
  defaultValue?: FieldPathValue<CreateProductInput, "metadata.0.stock">;
}) => {
  const { control } = useProductFormContext();
  return (
    <Controller
      defaultValue={defaultValue}
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

const ProductDiscount = ({
  metaIndex,
  defaultValue = 0,
}: MetaProps & {
  defaultValue?: FieldPathValue<CreateProductInput, "metadata.0.discount">;
}) => {
  const { control } = useProductFormContext();
  return (
    <Controller
      defaultValue={defaultValue}
      name={`metadata.${metaIndex}.discount`}
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>تخفیف</FieldLabel>
          <div className="relative">
            <Input {...field} id={field.name} placeholder="33" />
            <span className="absolute end-3 text-xl top-1">%</span>
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

const ProductVariantThumbnail = ({
  metaIndex,
  className,
  defaultValue,
}: MetaProps & {
  className?: string;
  defaultValue?: FieldPathValue<CreateProductInput, "thumbnail">;
}) => {
  return (
    <SingleImagePicker
      className={className}
      defaultValue={defaultValue}
      name={`metadata.${metaIndex}.thumbnail`}
    />
  );
};

const ProductDefaultMeta = () => {
  return (
    <FieldGroup>
      <div className="flex gap-4">
        <ProductPriceFields metaIndex="0" />
        <ProductDiscount metaIndex="0" />
      </div>
      <ProductStock metaIndex="0" />
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
}: MetaProps & {
  optionItemIds: string;
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

const VariableOptionItemFields = ({
  optionItemIds,
  label,
}: {
  optionItemIds: string;
  label: string;
}) => {
  let metadata: ProductVariableMeta[] | undefined;

  return (
    <VariableSection data-key={optionItemIds}>
      <p className="mb-3">{label}</p>
      <FieldGroup>
        <div className="flex gap-4">
          <ProductPriceFields
            defaultValue={metadata ? metadata[0].price : undefined}
            metaIndex={optionItemIds}
          />
          <ProductDiscount
            metaIndex={optionItemIds}
            defaultValue={metadata ? metadata[0].discount : undefined}
          />
        </div>
        <HiddenOptionItemIdsInput
          metaIndex={optionItemIds}
          optionItemIds={optionItemIds}
        />
        <div className="flex gap-4 @sm:flex-row flex-col">
          <ProductStock
            defaultValue={metadata ? metadata[0].stock : undefined}
            metaIndex={optionItemIds}
          />
          <ProductVariantThumbnail
            className="flex-1/3"
            defaultValue={metadata ? metadata[0].thumbnail : undefined}
            metaIndex={optionItemIds}
          />
        </div>
      </FieldGroup>
    </VariableSection>
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
        {items[counterToZiro].map(({ id, label }) => {
          const optionItemIds = parrentId
            ? [...parrentId, id].sort().join(OPTION_ITEM_IDS_SEPARATOR)
            : id;
          return (
            <VariableOptionItemFields
              key={id}
              label={label}
              optionItemIds={optionItemIds}
            />
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
          <VariableSection
            className="flex flex-col gap-4 @container"
            data-i={i}
            key={id}
          >
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

const recersiveVariable = ({
  items,
  counterToZiro,
  index,
  parrentId,
}: {
  items: { id: string; label: string }[][];
  counterToZiro: number;
  index?: number;
  parrentId?: string[];
}): {
  id: string;
  label: string;
  optionItemIds: string;
  regularIndex: number;
}[] => {
  if (items.length === 0) return [];
  if (counterToZiro === 0) {
    return items[counterToZiro].map(({ id, label }, i) => {
      const regularIndex = index ? items[counterToZiro].length * index + i : i;
      const optionItemIds = parrentId
        ? [...parrentId, id].sort().join(OPTION_ITEM_IDS_SEPARATOR)
        : id;
      return { regularIndex, id, label, optionItemIds };
    });
  }

  return items[counterToZiro]
    .map(({ id }, i) => {
      const regularIndex = index ? items[counterToZiro].length * index + i : i;
      const idList = parrentId ? [...parrentId, id] : [id];
      return recersiveVariable({
        index: regularIndex,
        items,
        parrentId: idList,
        counterToZiro: counterToZiro - 1,
      });
    })
    .flat();
};

const createVariableFromOptionItems = ({
  selectedOptionItem,
}: {
  selectedOptionItem: SelectOptionState;
}): string[] => {
  const valueOfSelectedOptionItems = Object.values(selectedOptionItem).filter(
    (option) => option.length > 0,
  );
  return recersiveVariable({
    items: valueOfSelectedOptionItems,
    counterToZiro: valueOfSelectedOptionItems.length - 1,
  }).map(({ optionItemIds }) => optionItemIds);
};

type ReturnOptionItemSelect = Parameters<
  ComponentProps<typeof SelectMultipleOptionItem>["onSelect"]
>[0];

const ProductVariableMetaFieldGroup = ({
  options,
  defaultItems,
}: {
  options: Option[];
  defaultItems?: SelectOptionState;
}) => {
  const {
    setValue,
    formState: { defaultValues },
  } = useProductFormContext();
  const [selectedOptionItem, setSelectedOptionItem] =
    useState<SelectOptionState>(defaultItems ? defaultItems : {});
  const selectedIds: string[] = Object.values(selectedOptionItem)
    .flat()
    .map(({ id }) => id);

  const handleRemoveItemData = ({ optionId, id }: ReturnOptionItemSelect) => {
    const prevOptionData = selectedOptionItem[optionId].filter(
      ({ id: prevId }) => id !== prevId,
    );
    return {
      ...selectedOptionItem,
      [optionId]: prevOptionData,
    };
  };

  const handleAddItemData = ({
    optionId,
    label,
    id,
  }: ReturnOptionItemSelect) => {
    const prevOptionData = selectedOptionItem[optionId] || [];
    return {
      ...selectedOptionItem,
      [optionId]: [...prevOptionData, { id, label }],
    };
  };

  const handleSelectedOptionItem = (selectedItem: ReturnOptionItemSelect) => {
    let newSelectedOptionItems;
    const { id } = selectedItem;

    if (selectedIds.indexOf(id) === -1) {
      newSelectedOptionItems = handleAddItemData(selectedItem);
    } else {
      newSelectedOptionItems = handleRemoveItemData(selectedItem);
    }

    setSelectedOptionItem(newSelectedOptionItems);
    const abcd = createVariableFromOptionItems({
      selectedOptionItem: newSelectedOptionItems,
    }).reduce(
      (prev, current) => ({
        ...prev,
        [current]: {
          optionItemIds: current,
          price: { amount: "0", currencty: "IRR" },
          stock: -1,
          ...(defaultValues?.metadata ? defaultValues.metadata[current] : {}),
        },
      }),
      {},
    );
    setValue("metadata", abcd, { shouldDirty: true });
  };

  return (
    <FieldGroup>
      <SelectMultipleOptionItem
        selectedItems={selectedIds}
        onSelect={handleSelectedOptionItem}
        options={options}
      />
      <VariableMapHanlder selectedOptionItem={selectedOptionItem} />
    </FieldGroup>
  );
};

export const ProductMeta = ({ options }: { options: Promise<Option[]> }) => {
  const { product } = useEditProductContext();
  const optionsData = use(options);
  const { control, setValue } = useProductFormContext();
  const typeValue = useWatch({ control, name: "type" });

  const handleChangeTabType = (t: ProductType) => {
    setValue("type", t, { shouldDirty: true });
    setValue("metadata", {}, { shouldDirty: true });
  };

  return (
    <div className="flex flex-col gap-3">
      <h4>نوع محصول</h4>
      <Tabs
        defaultValue="default"
        value={typeValue}
        onValueChange={(v) => handleChangeTabType(v as ProductType)}
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
            <ProductVariableMetaFieldGroup
              options={optionsData}
              defaultItems={
                product
                  ? (Object.groupBy(
                      product.optionItems,
                      ({ optionId }) => optionId,
                    ) as SelectOptionState)
                  : undefined
              }
            />
          </FieldGroup>
        </TabsContent>
      </Tabs>
    </div>
  );
};
