import z from "zod";

export const raiseDisputeSchema = z.object({
  disputeReason: z
    .string()
    .min(10, "Your reason must be at least ten characters"),
});

export type raiseDisputeDTO = z.infer<typeof raiseDisputeSchema>;
