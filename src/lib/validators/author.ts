import { z } from "zod";

export const AuthorValidator = z.object({
  name: z.string(),
  biography: z.string().optional(),
});

export type AuthorRequest = z.infer<typeof AuthorValidator>;
