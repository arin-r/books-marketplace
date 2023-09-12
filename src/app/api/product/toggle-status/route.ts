// route to mark product as sold or unsold

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import sleep from "@/lib/sleep";
import {
  CreateProductRequestValidator, ToggleProductStatusRequestValidator,
} from "@/lib/validators/product";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const {productId} = ToggleProductStatusRequestValidator.parse(body);

    const prd = await db.listedBook.findUnique({
      where: {
        id: productId,
        sellerId: session.user.id,
      },
      select: {
        id: true,
        status: true,
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

    await db.listedBook.update({
      where: {
        id: productId,
      },
      data: {
        status: prd.status === "NOT_SOLD" ? "SOLD" : "NOT_SOLD"
      }
    })

    return new Response("OK", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create product", { status: 500 });
  }
}
