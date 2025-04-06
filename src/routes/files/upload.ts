import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
// import { createWriteStream } from "node:fs";
// import { pipeline } from "node:stream/promises";
import { fileTypeFromFile } from "file-type";

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
        return reply.code(400).send({ error: "No file uploaded" });
      }

      const fileExt = await fileTypeFromFile(fileData.filename);

      //   await pipeline(fileData.file, createWriteStream("abcd", {}));

      console.log(fileExt);

      reply.send({ root: true });
    },
  });
};

export default upload;
