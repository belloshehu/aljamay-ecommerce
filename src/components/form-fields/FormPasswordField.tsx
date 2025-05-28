'use client";';
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Control } from "react-hook-form";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormPasswordFieldProps {
  id: string;
  label?: string;
  description?: string;
  placeholder: string;
  accept?: string;
  errorMessage: string | undefined;
  disabled?: boolean;
  className?: string;
  value?: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  control: Control<any>;
  step?: number;
  name: string;
}

export default function FormPasswordField({
  placeholder,
  control,
  label,
  name,
  ...props
}: FormPasswordFieldProps) {
  const [visible, setVisible] = React.useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl className="flex justify-between relative">
            <div
              className={cn(
                "flex items-center justify-center border rounded-md focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 bg-background"
              )}
            >
              <Input
                placeholder={placeholder}
                type={visible ? "text" : "password"}
                {...field}
                {...props}
                className="focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-none"
              />
              <Button
                className="bg-none hover:bg-none focus-visible:ring-0 "
                size={"icon"}
                variant="ghost"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setVisible(!visible);
                }}
              >
                {!visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
