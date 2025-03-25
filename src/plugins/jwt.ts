import fastifyJwt, { FastifyJWTOptions } from "@fastify/jwt";
import fp from "fastify-plugin";
import env from "../utils/env";

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-jwt
 */

export default fp<FastifyJWTOptions>(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: env.APP_SECRET,
    cookie: {
      cookieName: "FAT",
      signed: true,
    },
  });
});
