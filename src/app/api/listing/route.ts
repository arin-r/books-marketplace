import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ListingValidator } from "@/lib/validators/listing";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const data = ListingValidator.parse(body);
    if (data.listingType === "ONE_BOOK") {
      const {
        bookName,
        price,
        requiredInYear,
        sellerPhone,

        bookAge,
        branch,
        courseOrSubject,
      } = data;

      await db.listedBook.create({
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

    return new Response("Could not create listing", { status: 500 });
  }
}
