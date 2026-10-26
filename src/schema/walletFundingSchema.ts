import { z } from "zod";

export const walletFundingSchema = z.object({
  amount: z
    .number({ message: "Enter an amount" })
    .int("Enter a whole amount in naira")
    .min(100, "Minimum funding amount is ₦100")
    .max(5000000, "Maximum funding amount is ₦5,000,000 "),
});

export type walletFundingDTO = z.infer<typeof walletFundingSchema>;
