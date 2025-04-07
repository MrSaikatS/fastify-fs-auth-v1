import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

const serveFiles: FastifyPluginAsyncTypebox = async (
  fastify
): Promise<void> => {
  fastify.route({
    method: "GET",

    url: "/:fileId",

    schema: {
      params: Type.Object({
        fileId: Type.String(),
      }),
    },

    handler: async (request, reply) => {
      const { fileId } = request.params;

      console.log(fileId);

      reply.sendFile(fileId);
    },
  });
};

export default serveFiles;
