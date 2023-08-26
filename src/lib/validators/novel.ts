import { z } from "zod";

export const NovelValidator = z.object({
  title: z.string().min(3).max(50),
  authorId: z.string(),
  genres: z.array(z.string()),
  summary: z.string().optional(),
});
export const NovelFavoriteValidator = z.object({
  subchamberId: z.string(),
});

export type CreateNovelPayload = z.infer<typeof NovelValidator>;
export type SubscribeToNovelPayload = z.infer<typeof NovelFavoriteValidator>;
