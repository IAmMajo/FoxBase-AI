import { z } from "zod";

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  role: z.string(),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const body = await readValidatedBody(event, (body) => userSchema.parse(body));
  const password = await hashPassword(body.password);
  const db = useDatabase();
  const result = await db.sql<DbExecResult>`
    INSERT INTO users (username, password, role) VALUES (${body.username}, ${password}, ${body.role})
    ON CONFLICT (username) DO UPDATE SET password = ${password}, role = ${body.role}
  `;
  if (!result.success) {
    throw createError("Something went wrong during creation");
  }

  const { rows } = await db.sql<DbResult<User>>`
  SELECT id, username AS name, role FROM users WHERE username = ${body.username}
`;
  if (!rows.success || !rows.results.length) {
    throw createError(
      "Something went wrong while fetching the result. Input was successful",
    );
  }
  return rows.results[0];
});
