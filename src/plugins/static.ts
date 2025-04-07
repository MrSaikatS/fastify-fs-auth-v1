import fastifyStatic, { FastifyStaticOptions } from "@fastify/static";
import fp from "fastify-plugin";
import path from "node:path";

/**
 * Plugin for serving static files as fast as possible.
 *
 * @see https://github.com/fastify/fastify-static
 */

export default fp<FastifyStaticOptions>(async (fastify) => {
  fastify.register(fastifyStatic, {
    root: path.join(`${__dirname}/../../assets`),
    prefix: "/assets/",
  });
});
