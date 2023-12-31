import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-8 pt-14">
      <Link href="sign-in" className={buttonVariants({
        variant: "outline"
      })}>
        Log In
      </Link>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur iusto
        itaque fugit corporis aspernatur eveniet dolores reiciendis in
        voluptatibus corrupti earum consequuntur quo adipisci atque libero
        officiis, assumenda laudantium id! Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Recusandae quam ad dolores velit maxime
        odio maiores veniam, illo natus ut! Officiis dignissimos rerum porro,
        esse reiciendis quidem illo similique facere! Lorem ipsum dolor sit
        amet, consectetur adipisicing elit. At, delectus minima. A, ipsa quo
        laborum, maxime, libero eaque accusantium fugit praesentium repellendus
        vel natus dolore nesciunt odio placeat veniam mollitia. Lorem, ipsum
        dolor sit amet consectetur adipisicing elit. Voluptatibus et debitis
        aliquam voluptates nesciunt doloribus mollitia reprehenderit eveniet,
        officia, eum nobis ad autem sit maiores aspernatur numquam corporis
        adipisci itaque! arin here. Not really.
      </p>
    </main>
  );
}
