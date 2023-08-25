import { z } from "zod";

export const SubchamberValidator = z.object({
  name: z.string().min(3).max(21),
});

export const SubchamberSubscriptionValidator = z.object({
  subchamberId: z.string(),
});

export type CreateSubchamberPayload = z.infer<typeof SubchamberValidator>;
export type SubscribeToSubchamberPayload = z.infer<
  typeof SubchamberSubscriptionValidator
>;
