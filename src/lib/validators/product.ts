import { BookAge, Branch } from "@prisma/client";
import { z } from "zod";

export const bookDetails = z.object({
  bookName: z.string().min(1, {
    message: "Book name should be atleast 1 character long",
  }),
  requiredInYear: z
    .number()
    .min(1, {
      message: "Invalid year, should be greater than or equal to 1",
    })
    .max(5, {
      message: "Invalid year, should be lesser than or equal to 5",
    }),
  price: z.number().min(0.0, {
    message: "Price of book must be greater than or equal to 0",
  }),
  courseOrSubject: z.string().optional(),
  branch: z
    .enum([Branch.MECH, Branch.ENI, Branch.EEE, Branch.ECE, Branch.CS])
    .optional(),
  bookAge: z
    .enum([
      BookAge.ALMOST_NEW,
      BookAge.LESS_THAN_2,
      BookAge.LESS_THAN_4,
      BookAge.LESS_THAN_6,
      BookAge.LESS_THAN_8,
      BookAge.MORE_THAN_8,
    ])
    .optional(),
});
export type BookDetails = z.infer<typeof bookDetails>;

export const sellerDetails = z.object({
  sellerPhone: z.string(),
});
export type SellerDetails = z.infer<typeof sellerDetails>;

export const CreateProductRequestValidator = z.union([
  z
    .object({
      productType: z.literal("ONE_BOOK"),
    })
    .merge(bookDetails)
    .merge(sellerDetails),
  z
    .object({
      productType: z.literal("MULTIPLE_BOOKS_INDIVIDUALLY"),
    })
    .merge(
      z.object({
        numberOfBooks: z.number(),
      })
    ),
  z
    .object({
      productType: z.literal("MULTIPLE_BOOKS_AS_SET"),
    })
    .merge(
      z.object({
        numberOfBooks: z.number(),
      })
    ),
  z
    .object({
      productType: z.literal("UCATEGORIZED"),
    })
    .merge(
      z.object({
        objectName: z.string(),
      })
    ),
]);

export type CreateProductPayload = z.infer<
  typeof CreateProductRequestValidator
>;

export const DeleteProductRequestValidator = z.object({
  productId: z.string(),
});

export type DeleteProductPayload = z.infer<
  typeof DeleteProductRequestValidator
>;

export const ToggleProductStatusRequestValidator = z.object({
  productId: z.string(),
});

export type ToggleProductStatusPayload = z.infer<
  typeof ToggleProductStatusRequestValidator
>;
