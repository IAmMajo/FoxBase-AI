import { z } from "zod";

const loginSchema = z.object({ username: z.string(), password: z.string() });

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    loginSchema.parse(body),
  );
  const { rows } = await useDatabase().sql<DbResult<User>>`
    SELECT * FROM users WHERE username = ${body.username}
  `;
  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }
  if (!rows.results.length) {
    throw createError({ status: 401, message: "Invalid username or password" });
  }
  if (!(await verifyPassword(rows.results[0].password, body.password))) {
    throw createError({ status: 401, message: "Invalid username or password" });
  }
  await setUserSession(event, {
    user: { id: rows.results[0].id, username: body.username },
  });
});
