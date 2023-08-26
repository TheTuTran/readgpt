import { z } from "zod";

export const ChapterValidator = z.object({
  title: z.string(),
  content: z.string(),
  novelId: z.string(),
});

export type ChapterRequest = z.infer<typeof ChapterValidator>;
