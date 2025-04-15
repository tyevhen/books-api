import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { bookService } from "./book.service";
import { BookCreateInput, BookUpdateInput } from "./book.schema";

export const bookController = (app: FastifyInstance) => {
  const service = bookService(app);

  return {
    getAll: async (_request: FastifyRequest, reply: FastifyReply) => {
      const books = await service.findAll();
      reply.send(books);
    },

    getOne: async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };
      const book = await service.findById(id);
      reply.send(book);
    },

    create: async (
      request: FastifyRequest<{ Body: BookCreateInput }>,
      reply: FastifyReply
    ) => {
      const created = await service.create(request.body);
      reply.status(201).send(created);
    },

    update: async (
      request: FastifyRequest<{ Body: BookUpdateInput }>,
      reply: FastifyReply
    ) => {
      const { id } = request.params as { id: string };
      const updated = await service.update(id, request.body);
      reply.send(updated);
    },

    delete: async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };
      await service.delete(id);
      reply.status(204).send();
    },
  };
};
