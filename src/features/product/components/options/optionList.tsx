import { Edit2, OptionIcon } from "lucide-react";
import Link from "next/link";

import type { Option, OptionItem } from "@/services/product/type";

import EmptyPlaceholder from "@/components/dashboard/empty";
import { IconLinkLoading } from "@/components/dashboard/link-loading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/dashboard/ui/accordion";
import { Button } from "@/components/dashboard/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import { Separator } from "@/components/dashboard/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/dashboard/ui/table";

import DeleteOptionButton from "./deleteOptionButton";

const OptionItems = ({ optionItems }: { optionItems: OptionItem[] }) => {
  return (
    <Table className="text-center">
      <TableHeader>
        <TableRow>
          <TableHead className="border-e max-w-fit text-start w-2">
            ردیف
          </TableHead>
          <TableHead className="text-center">برچسب</TableHead>
          <TableHead className="text-center">مقدار</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {optionItems.map(({ id, label, value }, i) => (
          <TableRow key={id}>
            <TableCell className="border-e">{i + 1}</TableCell>
            <TableCell>{label}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const OptionItemsAccordion = ({
  optionItems,
}: {
  optionItems: OptionItem[];
}) => {
  if (optionItems.length <= 0) return;
  return (
    <>
      <Separator />
      <CardContent>
        <Accordion type="multiple">
          <AccordionItem value="content">
            <AccordionTrigger className="py-1" value="content">
              مقادیر ویژگی ها
            </AccordionTrigger>
            <AccordionContent>
              <OptionItems optionItems={optionItems} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </>
  );
};

const OptionCard = ({ name, description, slug, items, id }: Option) => {
  return (
    <Card className="h-max">
      <CardHeader>
        <CardTitle className="flex gap-2">
          {name}
          <CardDescription>{slug}</CardDescription>
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <OptionItemsAccordion optionItems={items} />
      <Separator />
      <CardFooter>
        <CardAction className="ms-auto">
          <DeleteOptionButton id={id} name={name} />
          <Button size="sm" variant="ghost">
            <Link href={`/admin/products/options/${id}`}>
              <IconLinkLoading>
                <Edit2 />
              </IconLinkLoading>
            </Link>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
};

const OptionList = ({ options }: { options: Option[] }) => {
  if (options.length === 0) {
    return (
      <EmptyPlaceholder
        className="h-full"
        link="/admin/products/options/add"
        title="هیچ ویژگی ای وجود ندارد"
        type="link"
        actionTitle="افزودن"
        icon={OptionIcon}
      />
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {options.map((opt) => (
        <OptionCard key={opt.id} {...opt} />
      ))}
    </div>
  );
};

export default OptionList;
