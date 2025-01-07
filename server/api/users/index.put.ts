import { z } from "zod";

const userSchema = z.object({ username: z.string(), password: z.string() });

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const body = await readValidatedBody(event, (body) => userSchema.parse(body));
  const password = await hashPassword(body.password);
  const result = await useDatabase().sql<DbExecResult>`
    INSERT INTO users (username, password) VALUES (${body.username}, ${password})
    ON CONFLICT (username) DO UPDATE SET password = ${password}
  `;
  if (!result.success) {
    throw createError("Something went wrong during database operation");
  }
});
