import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { verify } from "argon2";

const login: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.route({
    method: "GET",
    url: "/login",

    schema: {
      body: Type.Object({
        email: Type.String({ format: "email" }),
        password: Type.String({ minLength: 6, maxLength: 25 }),
      }),
    },

    handler: async (request, reply) => {
      const { email, password } = request.body;

      const normalizedEmail = email.toLowerCase().trim();

      try {
        const existingUser = await fastify.prisma.userAccount.findUnique({
          where: {
            email: normalizedEmail,
          },

          select: {
            id: true,
            email: true,
            password: true,
            token: true,
          },
        });

        if (existingUser === null) {
          return reply.notFound(
            "Account not found, Please create an account first"
          );
        }

        const isPasswordCorrect = await verify(existingUser.password, password);

        if (!isPasswordCorrect) {
          return reply.unauthorized("Incorrect password");
        }
      } catch (error) {
        fastify.log.error(error);

        return reply.internalServerError("User Login Failed");
      }
    },
  });
};

export default login;
