import { Book, BookAge, Branch, Status } from "@prisma/client";

export type ExtendedBook = {
  id: string;
  updatedAt: Date;
  bookName: string;
  requiredInYear: number;
  courseOrSubject: string | null;
  branch: Branch | null;
  bookAge: BookAge | null;
  price: number;
  sellerPhone: string;
  status: Status;
} & {
  seller: {
    name: string;
  };
};
