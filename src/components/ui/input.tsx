"use client";

import * as React from "react";

import { NumericFormat, NumericFormatProps, PatternFormat, PatternFormatProps } from "react-number-format";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const PatternInput = React.forwardRef<typeof PatternFormat, PatternFormatProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <PatternFormat
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        getInputRef={ref}
        {...props}
      />
    );
  }
);
PatternInput.displayName = "PatternInput";

const NumericInput = React.forwardRef<typeof PatternFormat, NumericFormatProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <NumericFormat
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        getInputRef={ref}
        {...props}
      />
    );
  }
);

NumericInput.displayName = "NumericInput";

export { Input, PatternInput, NumericInput };
