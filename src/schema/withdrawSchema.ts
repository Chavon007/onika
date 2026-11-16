import { z } from "zod";

export const withdrawalSchema = z.object({
  amount: z
    .number({ message: "Ënter an amount" })
    .int("Enter a whole amount in naira")
    .min(1000, "Minimum withdrawal amount is ₦1000")
    .max(50000, "Maximum withdrawal amount is ₦50000 "),
  bankAccountId: z.string().min(1, "Please select a bank account"),
});

export type withdrawalDTO = z.infer<typeof withdrawalSchema>;

export type WithdrawalPayload = {
  amount: number;
  bankAccountId: string;
};
