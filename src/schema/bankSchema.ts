import { z } from "zod";

export const bankAccountSchema = z.object({
  bankCode: z
    .string()
    .min(3, "Bank code must be up to 3 digit")
    .max(6, "Bank Code can't be mre than 6 digit"),
  accountNumber: z
    .string()
    .regex(/^\d{10}$/, "Account number must be exactly 10 digits"),
});

export type bankAccountDTO = z.infer<typeof bankAccountSchema>;
