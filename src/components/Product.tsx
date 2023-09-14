import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTimeToNow, getBookAgeStringFromEnum } from "@/lib/utils";
import { BookAge, Branch, Status } from "@prisma/client";
import { FC } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface ProductProps {
  book: {
    bookName: string;
    price: number;
    updatedAt: Date;
    requiredInYear: number;
    bookAge: BookAge | null;
    courseOrSubject: string | null;
    branch: Branch | null;
    seller: {
      name: string | null;
    };
    id: string;
    sellerPhone: string;
    status: Status;
  };
}

const Product: FC<ProductProps> = ({ book }) => {
  console.log(book);
  return (
    <Card className="m-2 w-[25rem]">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>{book.bookName}</div>
          <div>₹{book.price}</div>
        </CardTitle>
        <CardDescription className="italic">
          Updated {formatTimeToNow(new Date(book.updatedAt))}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-1">
        <div className="flex justify-between">
          <div className="font-semibold">Required In Year:</div>
          <div className="font-medium">{book.requiredInYear}</div>
        </div>
        <div className="flex justify-between">
          <div className="font-semibold">Book Age:</div>
          <div className={book.bookAge ? "font-medium" : "italic font-light"}>
            {book.bookAge
              ? `${getBookAgeStringFromEnum(book.bookAge)} old`
              : "unspecified"}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="font-semibold">Course or Subject:</div>
          <div
            className={
              book.courseOrSubject ? "font-medium" : "italic font-light"
            }
          >
            {book.courseOrSubject || "unspecified"}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="font-semibold">Branch:</div>
          <div className={book.branch ? "font-medium" : "italic font-light"}>
            {book.branch || "unspecified"}
          </div>
        </div>
        <div>
          <Separator className="my-2" />
        </div>
        <div className="flex justify-between">
          <div className="font-semibold">Seller Name:</div>
          <div
            className={book.seller.name ? "font-medium" : "italic font-light"}
          >
            {book.seller.name || "unspecified"}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Contact Seller</Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
