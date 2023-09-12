"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormStep,
} from "@/components/ui/form";
import { Input, NumericInput, PatternInput } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { BookAge, Branch } from "@prisma/client";
import {
  CreateProductPayload,
  bookDetails,
  sellerDetails,
} from "@/lib/validators/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type FormData = {
  step: number;
  bookName: string;
  requiredInYear: string;
  price: string;
  courseOrSubject: string;
  branch: Branch;
  bookAge: BookAge;
  // sellerName: string;
  sellerPhone: string;
};

const firstStepSchema = bookDetails.extend({
  step: z.literal(1),
  //requiredInYear is overwritten to be an enum of strings in the frontend
  requiredInYear: z.enum(["1", "2", "3", "4", "5"]),
  //price is overwritten to a be string in the frontend
  price: z.string(),
});

const secondStepSchema = sellerDetails.merge(firstStepSchema).extend({
  step: z.literal(2),
});

const schema = z.discriminatedUnion("step", [
  firstStepSchema,
  secondStepSchema,
]);

const getBookAgeStringFromEnum = (bookAge: BookAge) => {
  if (bookAge === "ALMOST_NEW") {
    return "Almost new";
  } else if (bookAge === "LESS_THAN_2") {
    return "< 2 years";
  } else if (bookAge === "LESS_THAN_4") {
    return "< 4 years";
  } else if (bookAge === "LESS_THAN_6") {
    return "< 6 years";
  } else if (bookAge === "LESS_THAN_8") {
    return "< 8 years";
  } else if (bookAge === "MORE_THAN_8") {
    return "8 + years";
  }
};
const Page = () => {
  const maxSteps = 2;

  // cosnt {} = useQuery({

  // })
  const form = useForm<FormData>({
    //TODO: Explore all modes
    mode: "all",
    shouldFocusError: false,
    resolver: zodResolver(schema),
    defaultValues: {
      step: 1,
      bookName: "",
      // price: "0.00",
      // requiredInYear: "",
      courseOrSubject: "",
      // branch: "",
      // bookAge: "",
      // sellerName: "",
      // sellerPhone: "",
    },
  });

  const router = useRouter();

  const { mutate: createProduct, isLoading } = useMutation({
    mutationFn: async ({
      bookAge,
      bookName,
      branch,
      courseOrSubject,
      price,
      requiredInYear,
      sellerPhone,
    }: FormData) => {
      const payload: CreateProductPayload = {
        bookName,
        productType: "ONE_BOOK",
        price: parseFloat(price),
        requiredInYear: parseInt(requiredInYear),
        sellerPhone,
        bookAge,
        courseOrSubject,
        branch,
      };

      const response = await axios.post("/api/product", payload);
      console.log("response = ", response);
    },

    onSuccess: () => {
      router.push("/my-products")
    }
  });
  const step = form.watch("step");
  const onSubmit = (values: FormData) => {
    createProduct(values);
  };
  const prevStep = () => {
    if (step > 1) {
      form.setValue("step", step - 1, { shouldValidate: true });
    }
  };

  const nextStep = () => {
    if (step < maxSteps) {
      form.setValue("step", step + 1, { shouldValidate: true });
    }
  };

  return (
    <Card className="w-full sm:w-[600px]">
      <CardContent>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormStep
              step={1}
              currentStep={step}
              title="First Step"
              description={`${step}/${maxSteps} - Book Details.`}
              onPrevStepClick={prevStep}
            >
              {/* <h1>Fields labelled with a * are required, others are optional</h1> */}
              <FormField
                control={form.control}
                name="bookName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Book Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requiredInYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required in year *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="book required in year..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price *</FormLabel>
                    <FormControl>
                      <NumericInput
                        allowLeadingZeros={false}
                        decimalScale={2}
                        fixedDecimalScale
                        thousandsGroupStyle="thousand"
                        decimalSeparator="."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="courseOrSubject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course or subject</FormLabel>
                    <FormControl>
                      <Input placeholder="course or subject..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="branch..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Branch.MECH}>
                          {Branch.MECH}
                        </SelectItem>
                        <SelectItem value={Branch.EEE}>{Branch.EEE}</SelectItem>
                        <SelectItem value={Branch.ENI}>{Branch.ENI}</SelectItem>
                        <SelectItem value={Branch.ECE}>{Branch.ECE}</SelectItem>
                        <SelectItem value={Branch.CS}>{Branch.CS}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bookAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Book age</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="book age..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={BookAge.ALMOST_NEW}>
                          {getBookAgeStringFromEnum(BookAge.ALMOST_NEW)}
                        </SelectItem>
                        <SelectItem value={BookAge.LESS_THAN_2}>
                          {getBookAgeStringFromEnum(BookAge.LESS_THAN_2)}
                        </SelectItem>
                        <SelectItem value={BookAge.LESS_THAN_4}>
                          {getBookAgeStringFromEnum(BookAge.LESS_THAN_4)}
                        </SelectItem>
                        <SelectItem value={BookAge.LESS_THAN_6}>
                          {getBookAgeStringFromEnum(BookAge.LESS_THAN_6)}
                        </SelectItem>
                        <SelectItem value={BookAge.LESS_THAN_8}>
                          {getBookAgeStringFromEnum(BookAge.LESS_THAN_8)}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormStep>
            <FormStep
              step={2}
              currentStep={step}
              title="Second Step"
              description={`${step}/${maxSteps} - Seller Details`}
              onPrevStepClick={prevStep}
            >
              {/* <FormField
                control={form.control}
                name="sellerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="your name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="sellerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact No. *</FormLabel>
                    <FormControl>
                      <PatternInput
                        // can add +91 to this this format
                        format="### #### ###"
                        mask="_"
                        placeholder="your phone no..."
                        {...field}
                        type="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormStep>
            <Button
              key={step === maxSteps ? "submit-btn" : "next-step-btn"}
              type={step === maxSteps ? "submit" : "button"}
              className="w-full"
              variant={step === maxSteps ? "default" : "secondary"}
              disabled={!form.formState.isValid || isLoading}
              isLoading={isLoading}
              onClick={step === maxSteps ? undefined : nextStep}
            >
              {step === maxSteps ? "Submit" : "Next step"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Page;
