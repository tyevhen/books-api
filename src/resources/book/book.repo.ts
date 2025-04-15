import { FastifyInstance } from "fastify";
import { BookCreateInput, BookUpdateInput } from "resources/book/book.schema";

export const bookRepo = (app: FastifyInstance) => {
  const prisma = app.prisma;

  return {
    findAll: () =>
      prisma.book.findMany({
        where: { deletedAt: null },
      }),
    findById: (id: string) =>
      prisma.book.findFirst({
        where: {
          id,
          deletedAt: null,
        },
      }),
    create: (data: BookCreateInput) => prisma.book.create({ data }),
    update: (id: string, data: BookUpdateInput) =>
      prisma.book.update({ where: { id }, data }),
    delete: (id: string) =>
      prisma.book.update({
        where: { id },
        data: { deletedAt: new Date() },
      }),
  };
};
