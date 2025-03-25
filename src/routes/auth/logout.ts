import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const logout: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.route({
    method: "POST",
    url: "/logout",

    handler: async (request, reply) => {
      reply.send({ logout: true });
    },
  });
};

export default logout;
