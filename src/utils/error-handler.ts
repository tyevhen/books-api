import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

const errorHandler = (
  error: Error,
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      statusCode: 400,
      error: "Bad Request",
      message: "Validation error",
      issues: error.errors,
    });
  }

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return reply.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: "A book with this title and author already exists.",
      });
    }
  }

  if (error.name === "NotFoundError") {
    return reply.status(404).send({
      statusCode: 404,
      error: "Not Found",
      message: error.message,
    });
  }

  return reply.status(500).send({
    statusCode: 500,
    error: "Internal Server Error",
    message: "An unexpected error occurred",
  });
};

export default errorHandler;
