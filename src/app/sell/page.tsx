import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";

import SellingOptionsCard from "@/components/SellingOptionsCard";

const Page = async () => {
  return (
    <main className="flex min-h-screen flex-col items-center px-8 pt-14">
      <div className="flex flex-col lg:flex-row">
        <SellingOptionsCard
          cardTitle="Sell One"
          cardDescription="Sell one book individually"
          cardContent="Use this feature if you don't have a complete set of books for a particular year or semester. If you have, for example, three books which do not form a complete set and can be sold individually, use this feature; that is, individually list all three books on the marketplace."
          href="sell-one"
        />
        <SellingOptionsCard
          cardTitle="Sell Multiple Individually"
          cardDescription="Sell multiple books Individually"
          cardContent="Use this feature if you have a number of books which don't form a complete set. If you have, for example, 4 books but they don't form a complete set for a particular year or course, use this feature. Customers will be able to buy books individually."
          href="sell-multiple-individually"
        />
      </div>
      <div className="flex flex-col lg:flex-row">
        <SellingOptionsCard
          cardTitle="Sell Multiple As Set"
          cardDescription="Sell multiple books as a set"
          cardContent="Use this feature if you have a complete set of books for a particular year or semester. If you have, for example, 7 books all of which are required in the first year, use this feature."
          href="sell-multiple-as-set"
        />
        <SellingOptionsCard
          cardTitle="Sell Anything"
          cardDescription="Sell anything other than books"
          cardContent="Use this feature if you want to sell anything, other than books. It could be electronics, notes, bed matress etc."
          href="sell-anything"
        />
      </div>
    </main>
  );
};

export default Page;
