import type { Option, OptionItem } from "@/services/product/type";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/dashboard/ui/accordion";
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
      {items.length > 0 && (
        <>
          <Separator />
          <CardContent>
            <Accordion type="multiple">
              <AccordionItem value="content">
                <AccordionTrigger className="py-1" value="content">
                  مقادیر ویژگی ها
                </AccordionTrigger>
                <AccordionContent>
                  <OptionItems optionItems={items} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </>
      )}
      <Separator />
      <CardFooter>
        <CardAction className="ms-auto">
          <DeleteOptionButton id={id} name={name} />
        </CardAction>
      </CardFooter>
    </Card>
  );
};
const OptionList = ({ options }: { options: Option[] }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {options.map((opt) => (
        <OptionCard key={opt.id} {...opt} />
      ))}
    </div>
  );
};

export default OptionList;
