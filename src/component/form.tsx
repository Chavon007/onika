import React, { useEffect, useRef } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";

const DRAFT_VERSION = 1;
interface FormProps<TFormValues extends FieldValues, Schema> {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (method: UseFormReturn<TFormValues>) => React.ReactNode;
  schema?: Schema;
  defaultValues?: Partial<TFormValues>;
  storageKey?: string;
}


function stripFiles(values: Record<string, unknown>) {
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(values)) {
    if (value instanceof File || value instanceof FileList) continue;
    if (Array.isArray(value) && value.some((v) => v instanceof File)) continue;
    clean[key] = value;
  }
  return clean;
}

function readDraft(storageKey: string) {
  try {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== DRAFT_VERSION) return null;
    return parsed.values as Record<string, unknown>;
  } catch {
    return null;
  }
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
  storageKey,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    resolver: schema ? (zodResolver(schema) as any) : undefined,
    defaultValues: defaultValues as any,
    mode: "onChange",
  });

  useEffect(() => {
    if (!storageKey) return;

    const draft = readDraft(storageKey);
    if (!draft) return;

    if (
      schema &&
      "partial" in schema &&
      typeof (schema as any).partial === "function"
    ) {
      const result = (schema as any).partial().safeParse(draft);
      if (result.success) {
        methods.reset({ ...defaultValues, ...result.data } as any);
      }
      // if invalid, silently ignore the corrupted draft rather than crash
    } else {
      methods.reset({ ...defaultValues, ...draft } as any);
    }
  }, [storageKey]);

  // Debounced persistence on change
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!storageKey) return;
    const subscription = methods.watch((values) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        try {
          const clean = stripFiles(values as Record<string, unknown>);
          sessionStorage.setItem(
            storageKey,
            JSON.stringify({ version: DRAFT_VERSION, values: clean }),
          );
        } catch {
          // storage unavailable/quota exceeded — fail silently, not critical
        }
      }, 400);
    });
    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [storageKey, methods]);

  const handleSubmit = methods.handleSubmit(
    async (data) => {
      await onSubmit(data);
      if (storageKey) sessionStorage.removeItem(storageKey);
    },
    () => {},
  );
  void methods.formState.errors;

  return (
    <form
      className={className}
      onSubmit={handleSubmit}
    >
      {children(methods)}
    </form>
  );
};
