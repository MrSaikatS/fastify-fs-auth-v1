import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { extension } from "mime-types";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { v4 } from "uuid";

const upload: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.route({
    method: "POST",

    url: "/upload",

    schema: {},

    // onRequest: async (request, reply) => {
    //   const { FAT } = request.cookies;

    //   try {
    //     if (FAT === undefined) {
    //       await request.jwtVerify();
    //     } else {
    //       fastify.jwt.verify(FAT);
    //     }
    //   } catch (error) {
    //     reply.unauthorized("Unauthorized");
    //   }
    // },

    handler: async (request, reply) => {
      const fileData = await request.file();

      if (fileData === undefined) {
        return reply.badRequest("No file uploaded");
      }

      try {
        const fileId = v4();

        const fileExt = extension(fileData.mimetype);

        const sanitizedFileName = `${fileId}.${fileExt}`;

        await pipeline(
          fileData.file,
          createWriteStream(`./assets/${sanitizedFileName}`)
        );

        const { id, fileName } = await fastify.prisma.fileAsset.create({
          data: {
            id: fileId,
            fileName: sanitizedFileName,
          },
        });

        return reply.code(201).send({ id, fileName });
      } catch (error) {
        // Log any unexpected errors for debugging
        fastify.log.error(error);

        // Generic error response to prevent information leakage
        return reply.internalServerError("File Upload Failed");
      }
    },
  });
};

export default upload;
