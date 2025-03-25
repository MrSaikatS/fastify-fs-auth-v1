import fastifyEtag, { FastifyEtagOptions } from "@fastify/etag";
import fp from "fastify-plugin";

/**
 * This plugins adds some utilities to handle cors
 *
 * @see https://github.com/fastify/fastify-etag
 */

export default fp<FastifyEtagOptions>(async (fastify) => {
  fastify.register(fastifyEtag);
});
