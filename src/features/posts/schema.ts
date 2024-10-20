import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  image: z.string().optional(),
});

export type CreatePostType = z.infer<typeof createPostSchema>;
