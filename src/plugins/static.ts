import fastifyStatic, { FastifyStaticOptions } from "@fastify/static";
import fp from "fastify-plugin";
import path from "node:path";

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */

export default fp<FastifyStaticOptions>(async (fastify) => {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "assets"),
    prefix: "/assets/",
    serve: true,
  });
});
