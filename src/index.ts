import Fastify from "fastify";
import "dotenv/config";
import bookRoutes from "./routes/book";
import prismaPlugin from "./plugins/prisma";
import errorHandler from "./utils/error-handler";

const startServer = async () => {
  const app = Fastify({ logger: true });

  await app.register(prismaPlugin);
  await app
    .register(bookRoutes, { prefix: "/book" })
    .setErrorHandler(errorHandler);

  app.listen(
    {
      port: Number(process.env.API_PORT) || 3000,
      host: process.env.API_HOST || "0.0.0.0",
    },
    (err) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
    }
  );
};

startServer();
