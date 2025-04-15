import { FastifyPluginAsync } from "fastify";
import {
  createBookSchema,
  updateBookSchema,
  paramsSchema,
} from "../resources/book/book.schema";
import { bookController } from "../resources/book/book.controller";
import { zodToJsonSchema } from "zod-to-json-schema";

const bookRoutes: FastifyPluginAsync = async (fastify) => {
  const controller = bookController(fastify);

  fastify.get("/", controller.getAll);

  fastify.get("/:id", {
    schema: { params: zodToJsonSchema(paramsSchema) },
    handler: controller.getOne,
  });

  fastify.post("/", {
    schema: { body: zodToJsonSchema(createBookSchema) },
    handler: controller.create,
  });

  fastify.put("/:id", {
    schema: {
      params: zodToJsonSchema(paramsSchema),
      body: zodToJsonSchema(updateBookSchema),
    },
    handler: controller.update,
  });

  fastify.delete("/:id", {
    schema: { params: zodToJsonSchema(paramsSchema) },
    handler: controller.delete,
  });
};

export default bookRoutes;
