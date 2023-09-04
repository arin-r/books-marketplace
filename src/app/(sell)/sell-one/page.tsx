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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

type FormData = {
  step: number;
  bookName: string;
  requiredInYear: string;
  courseOrSubject: string;
  branch: string;
  bookAge: string;
  sellerName: string;
  sellerPhone: string;
};

//TODO: Move this to a types folder, will be needed in backend as well
const bookAges = {
  ALMOST_NEW: "Almost new",
  LESS_THAN_2: "< 2 years",
  LESS_THAN_4: "< 4 years",
  LESS_THAN_6: "< 6 years",
  LESS_THAN_8: "< 8 years",
  MORE_THAN_8: "8 + years",
};

const branches = {
  MECH: "MECH",
  ENI: "ENI",
  EEE: "EEE",
  ECE: "ECE",
  CS: "CS",
};

const firstStepSchema = z.object({
  step: z.literal(1),
  bookName: z.string().min(1, {
    message: "Book name should be atleast 1 character long",
  }),
  requiredInYear: z.enum(["1", "2", "3", "4", "5"]),
  courseOrSubject: z.string().optional(),
  branch: z
    .enum([
      branches.MECH,
      branches.ENI,
      branches.EEE,
      branches.ECE,
      branches.CS,
    ])
    .optional(),
  bookAge: z
    .enum([
      bookAges.ALMOST_NEW,
      bookAges.LESS_THAN_2,
      bookAges.LESS_THAN_4,
      bookAges.LESS_THAN_6,
      bookAges.LESS_THAN_8,
      bookAges.MORE_THAN_8,
    ])
    .optional(),
});

const secondStepSchema = firstStepSchema.extend({
  step: z.literal(2),
  sellerName: z.string().optional(),
  sellerPhone: z.string().optional(),
});

const schema = z.discriminatedUnion("step", [
  firstStepSchema,
  secondStepSchema,
]);

const Page = () => {
  const maxSteps = 2;

  const form = useForm<FormData>({
    //TODO: Explore all modes
    mode: "all",
    shouldFocusError: false,
    resolver: zodResolver(schema),
    defaultValues: {
      step: 1,
      bookName: "",
      // requiredInYear: "",
      courseOrSubject: "",
      // branch: "",
      // bookAge: "",
      sellerName: "",
      sellerPhone: "",
    },
  });

  const step = form.watch("step");
  const onSubmit = (values: FormData) => {
    toast({
      title: "Form data",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  };
  console.log("form = ", form);
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

  console.log("errors = ", form.formState.errors);
  return (
    <Card className="w-full sm:w-[600px]">
      <CardContent>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormStep
              step={1}
              currentStep={step}
              title="First Step"
              description={`${step}/${maxSteps} - book related information.`}
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
                        <SelectItem value={branches.MECH}>
                          {branches.MECH}
                        </SelectItem>
                        <SelectItem value={branches.ENI}>
                          {branches.ENI}
                        </SelectItem>
                        <SelectItem value={branches.EEE}>
                          {branches.ECE}
                        </SelectItem>
                        <SelectItem value={branches.CS}>
                          {branches.CS}
                        </SelectItem>
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
                        <SelectItem value={bookAges.ALMOST_NEW}>
                          {bookAges.ALMOST_NEW}
                        </SelectItem>
                        <SelectItem value={bookAges.LESS_THAN_2}>
                          {bookAges.LESS_THAN_2}
                        </SelectItem>
                        <SelectItem value={bookAges.LESS_THAN_4}>
                          {bookAges.LESS_THAN_4}
                        </SelectItem>
                        <SelectItem value={bookAges.LESS_THAN_6}>
                          {bookAges.LESS_THAN_6}
                        </SelectItem>
                        <SelectItem value={bookAges.LESS_THAN_8}>
                          {bookAges.LESS_THAN_8}
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
              disabled={!form.formState.isValid}
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
