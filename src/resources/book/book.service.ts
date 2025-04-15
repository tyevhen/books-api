import { Book } from "@prisma/client";
import {
  BookCreateInput,
  BookUpdateInput,
  createBookSchema,
  updateBookSchema,
} from "./book.schema";
import { FastifyInstance } from "fastify";
import { bookRepo } from "./book.repo";

export const bookService = (app: FastifyInstance) => {
  const repo = bookRepo(app);

  return {
    findAll: async (): Promise<Book[]> => {
      return repo.findAll();
    },

    findById: async (id: string): Promise<Book> => {
      const book = await repo.findById(id);
      if (!book) throw new Error("Book not found");
      return book;
    },

    create: async (data: BookCreateInput): Promise<Book> => {
      const validatedData = createBookSchema.parse(data);
      return repo.create(validatedData);
    },

    update: async (id: string, data: BookUpdateInput): Promise<Book> => {
      const validatedData = updateBookSchema.parse(data);
      const existingBook = await repo.findById(id);
      if (!existingBook) throw new Error("Book not found");
      return repo.update(id, validatedData);
    },

    delete: async (id: string): Promise<void> => {
      const existingBook = await repo.findById(id);
      if (!existingBook) throw new Error("Book not found");
      await repo.delete(id);
    },
  };
};
