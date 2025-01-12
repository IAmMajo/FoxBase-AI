import { z } from "zod";

const userSchema = z.object({id: z.number()});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const body = await readValidatedBody(event, (body) => userSchema.parse(body));
  const result = await useDatabase().sql<DbExecResult>`
    DELETE FROM users WHERE id = ${body.id}
  `;
  if (!result.success) {
    throw createError("Something went wrong during database operation");
  }
});