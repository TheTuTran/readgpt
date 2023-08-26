import { z } from "zod";

export const GenreValidator = z.object({
  name: z.string(),
});

export type GenreRequest = z.infer<typeof GenreValidator>;
