import { z } from "zod";

export const TagValidator = z.object({
  label: z.string(),
});

export type TagRequest = z.infer<typeof TagValidator>;
