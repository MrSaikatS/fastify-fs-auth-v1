import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

const register: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.route({
    method: "POST",

    url: "/register",

    schema: {
      body: Type.Object({
        firstName: Type.String({ minLength: 1, maxLength: 25 }),
        email: Type.String({ format: "email" }),
        password: Type.String({ minLength: 6, maxLength: 25 }),
      }),
    },

    handler: async (request, reply) => {
      const { firstName, email, password } = request.body;

      const normalizedEmail = email.toLowerCase().trim();

      console.log({ firstName, normalizedEmail, password });

      reply.send({ root: true });
    },
  });
};

export default register;
