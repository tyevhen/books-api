import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  author: z.string().min(3, "Author must be at least 3 characters long"),
});

export const updateBookSchema = createBookSchema.partial();
export const paramsSchema = z.object({
  id: z.string().uuid("Invalid book ID"),
});

export type BookCreateInput = z.infer<typeof createBookSchema>;
export type BookUpdateInput = z.infer<typeof updateBookSchema>;
