import React from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";

interface FormProps<TFormValues extends FieldValues, Schema> {
  className: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (method: UseFormReturn<TFormValues>) => React.ReactNode;
  schema?: Schema;
  defaultValues?: Partial<TFormValues>;
}

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<any, any, any> = ZodType<any, any, any>,
>({
  className,
  onSubmit,
  children,
  schema,
  defaultValues,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    resolver: schema ? (zodResolver(schema) as any) : undefined,
    defaultValues: defaultValues as any,
    mode: "onChange",
  });

  return (
    <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
      {children(methods)}
    </form>
  );
};
