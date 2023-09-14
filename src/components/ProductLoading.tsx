import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTimeToNow, getBookAgeStringFromEnum } from "@/lib/utils";
import { ExtendedBook } from "@/types/db";
import { FC } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface ProductProps {}

const ProductLoading: FC<ProductProps> = () => {
  return (
    <Card className="animate-pulse m-2 w-[25rem]">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <h1 className="h-2"></h1>
          <h1 className="h-2"></h1>
        </CardTitle>
        <CardDescription className="italic">Updated at</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-1">
        <div className="flex justify-between">
          <h1 className="font-semibold">Required In Year:</h1>
          <h1 className="font-medium"></h1>
        </div>
        <div className="flex justify-between">
          <h1 className="font-semibold">Book Age:</h1>
          <h1></h1>
        </div>
        <div className="flex justify-between">
          <h1 className="font-semibold">Course or Subject:</h1>
          <h1></h1>
        </div>
        <div className="flex justify-between">
          <h1 className="font-semibold">Branch:</h1>
          <h1></h1>
        </div>
        <div>
          <Separator className="my-2" />
        </div>
        <div className="flex justify-between">
          <h1 className="font-semibold">Seller Name:</h1>
          <h1></h1>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Contact Seller</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductLoading;
