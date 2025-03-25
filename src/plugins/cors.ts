import fastifyCors, { FastifyCorsOptions } from "@fastify/cors";
import fp from "fastify-plugin";

/**
 * This plugins adds some utilities to handle cors
 *
 * @see https://github.com/fastify/fastify-cors
 */

export default fp<FastifyCorsOptions>(async (fastify) => {
  fastify.register(fastifyCors, {
    origin: true,
    credentials: true,
  });
});
