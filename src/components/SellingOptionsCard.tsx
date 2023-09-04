import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
// import { Switch } from "@/components/ui/switch"

type CardProps = React.ComponentProps<typeof Card> & {
  cardContent: string;
  cardDescription: string;
  cardTitle: string;
  href: string;
};

function CardDemo({
  cardContent,
  cardDescription,
  cardTitle,
  className,
  href,
  ...props
}: CardProps) {
  return (
    <Card
      className={cn("w-[380px] m-2 flex flex-col justify-between", className)}
      {...props}
    >
      <div>
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p>{cardContent}</p>
        </CardContent>
      </div>
      <div>
        <CardFooter>
          <Link className={cn(buttonVariants(), "w-full")} href={href}>
            Proceed
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}

export default CardDemo;
