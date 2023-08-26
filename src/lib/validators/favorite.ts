import { z } from "zod";

export const FavoriteValidator = z.object({
  userId: z.string(),
  novelId: z.string(),
});

export type FavoriteRequest = z.infer<typeof FavoriteValidator>;
