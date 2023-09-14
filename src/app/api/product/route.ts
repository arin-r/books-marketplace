import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import sleep from "@/lib/sleep";
import {
  CreateProductRequestValidator,
  DeleteProductRequestValidator,
} from "@/lib/validators/product";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const data = CreateProductRequestValidator.parse(body);
    if (data.productType === "ONE_BOOK") {
      const {
        bookName,
        price,
        requiredInYear,
        sellerPhone,

        bookAge,
        branch,
        courseOrSubject,
      } = data;

      await db.book.create({
        data: {
          bookName,
          requiredInYear,
          sellerPhone,
          price,
          bookAge,
          branch,
          courseOrSubject,
          sellerId: session.user.id,
        },
      });
      // console.log('response = ', response);
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create product", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  await sleep(4000);
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { productId } = DeleteProductRequestValidator.parse(body);

    const prd = await db.book.findUnique({
      where: {
        id: productId,
        sellerId: session.user.id,
      },
      select: {
        id: true,
      },
    });
    if (!prd) {
      return new Response(
        "Product does not exist, or does not belong to user who made the request.",
        {
          status: 422,
        }
      );
    }

    await db.book.delete({
      where: {
        id: productId,
      },
    });
    // const x = await db.book.delete()
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.log("error = ", error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create product", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // const session = await getAuthSession();

    // if (!session?.user) {
    //   return new Response("Unauthorized", { status: 401 });
    // }

    const products = await db.book.findMany({
      where: {},
      select: {
        seller: {
          select: {
            name: true,
          },
        },
        bookAge: true,
        bookName: true,
        branch: true,
        courseOrSubject: true,
        id: true,
        price: true,
        requiredInYear: true,
        sellerPhone: true,
        updatedAt: true,
        status: true,
      },
    });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create product", { status: 500 });
  }
}
