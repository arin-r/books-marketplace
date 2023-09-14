import Product from "@/components/Product";
import { db } from "@/lib/db";

// export const dynamic = 'force-dynamic'

const Page = async () => {
  // const x = usePathname();
  const books = await db.book.findMany({
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

  let toDisplay: JSX.Element[] = [];
  for (let i = 0; i < books.length; ++i) {
    if (i % 2 == 1) continue;
    const one = books[i];
    const two = books[i + 1];

    toDisplay.push(
      <div className="flex flex-col lg:flex-row">
        <Product book={one} />
        {two && <Product book={two} />}
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-8 pt-14">
      {toDisplay.map((v) => v)}
    </main>
  );
};

export default Page;
