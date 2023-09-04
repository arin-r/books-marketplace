"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input, PatternInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TextareaAuto } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CreatableInput from "@/components/ui/creatable-input";
import { toast } from "@/components/ui/use-toast";
import { FC } from "react";

type FormData = {
  step: number;
  bookName: string;
  requiredInYear: string;
  courseOrSubject: string;
  branch: string;
  bookAge: number;
  sellerName: string;
  sellerPhone: string;
};

const firstStepSchema = z.object({
  step: z.literal(1),
  bookName: z.string().min(1, {
    message: "name must be atleast 2 characters long",
  }),
  requiredInYear: z.enum(["1", "2", "3", "4", "5"]),
  courseOrSubject: z.string().optional(),
  branch: z.enum(["MECH, ENI, EEE, ECE, CS"]),
  bookAge: z.number().optional(),
});

const secondStepSchema = firstStepSchema.extend({
  step: z.literal(2),
  sellerName: z.string().min(1, {
    message: "Name required",
  }),
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
      requiredInYear: "",
      courseOrSubject: "",
      branch: "",
      bookAge: 1,
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
    <Card className="w-[600px]">
      <CardContent>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            {/* <FormStep
              step={1}
              currentStep={step}
              title="First Step"
              description={`${step}/${maxSteps} - personal information`}
              onPrevStepClick={prevStep}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="e-mail..." {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <PatternInput
                        format="### ### ###"
                        mask="_"
                        placeholder="phone..."
                        {...field}
                        type="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormStep>
            <FormStep
              step={2}
              currentStep={step}
              title="Second Step"
              description={`${step}/${maxSteps} - favorite project`}
              onPrevStepClick={prevStep}
            >
              <FormField
                control={form.control}
                name="project"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <FormControl>
                      <Input placeholder="project..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project description</FormLabel>
                    <FormControl>
                      <TextareaAuto placeholder="description..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="technologies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technologies</FormLabel>
                    <FormControl>
                      <CreatableInput
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormStep> */}
            <FormStep
              step={1}
              currentStep={step}
              title="First Step"
              description={`${step}/${maxSteps} - experience`}
              onPrevStepClick={prevStep}
            >
              <FormField
                control={form.control}
                name="requiredInYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Favorite framework</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="framework..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">React</SelectItem>
                        <SelectItem value="vue">Vue</SelectItem>
                        <SelectItem value="svelte">Svelte</SelectItem>
                        <SelectItem value="angular">Angular</SelectItem>
                        <SelectItem value="solidjs">Solidjs</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Experience</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="0" />
                          </FormControl>
                          <FormLabel className="font-normal">none</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="1" />
                          </FormControl>
                          <FormLabel className="font-normal">1 year</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="2-3" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            2-3 years
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="4-7" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            4-7 years
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="8" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            8+ years
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
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
  // return (
  //   <Card className="w-[600px]">
  //     <CardContent>
  //       <Form {...form}>
  //         <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
  //           <FormStep
  //             step={1}
  //             currentStep={step}
  //             title="Book Details"
  //             description={`Step ${step}/${maxSteps}`}
  //             onPrevStepClick={prevStep}
  //           >
  //             <FormField
  //               control={form.control}
  //               name="bookName"
  //               render={({ field }) => (
  //                 <FormItem>
  //                   <FormLabel>Name</FormLabel>
  //                   <FormControl>
  //                     <Input placeholder="name..." {...field} />
  //                   </FormControl>
  //                   <FormMessage />
  //                 </FormItem>
  //               )}
  //             />
  //             <FormField
  //               control={form.control}
  //               name="requiredInYear"
  //               render={({ field }) => (
  //                 <FormItem>
  //                   <FormLabel>Year in which book is required</FormLabel>
  //                   <Select
  //                     onValueChange={field.onChange}
  //                     defaultValue={field.value}
  //                   >
  //                     <FormControl>
  //                       <SelectTrigger>
  //                         <SelectValue placeholder="1" />
  //                       </SelectTrigger>
  //                     </FormControl>
  //                     <SelectContent>
  //                       <SelectItem value="1">1</SelectItem>
  //                       <SelectItem value="2">2</SelectItem>
  //                       <SelectItem value="3">3</SelectItem>
  //                       <SelectItem value="4">4</SelectItem>
  //                       <SelectItem value="5">5</SelectItem>
  //                     </SelectContent>
  //                   </Select>
  //                   <FormMessage />
  //                 </FormItem>
  //               )}
  //             />
  //           </FormStep>
  //         </form>
  //       </Form>
  //     </CardContent>
  //   </Card>
  // );
};

export default Page;
