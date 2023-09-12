import ProductsTable from "@/components/ProductsTable";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getAuthSession();
  // const router = useRouter();

  if (!session?.user) {
    // router.push("/shop")
    redirect("/shop");
  }

  const products = await db.listedBook.findMany({
    where: {
      sellerId: session?.user.id,
    },
    select: {
      id: true,
      bookName: true,
      price: true,
      status: true,
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center px-3 pt-10">
      <ProductsTable _products={products}/>
    </main>
  );
};

export default Page;
