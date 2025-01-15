import { z } from "zod";
import checkUserAuthority from "~/server/utils/checkUserAuthority";

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  role: z.string(),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  if (!(await checkUserAuthority(await getUserSession(event), ["admin"]))) {
    throw createError({
      status: 401,
      statusMessage: "You are not authorized for this action",
    });
  }

  const body = await readValidatedBody(event, (body) => userSchema.parse(body));
  const password = await hashPassword(body.password);
  const db = useDatabase();

  const r = await db.sql<DbResult<User>>`
   SELECT * FROM users WHERE username = ${body.username}
  `;

  if (r.rows.results[0]?.username) {
    throw createError({
      status: 500,
      statusMessage: "User with this name already exists",
    });
  }

  const result = await db.sql<DbExecResult>`
    INSERT INTO users (username, password, role) VALUES (${body.username}, ${password}, ${body.role})
    ON CONFLICT (username) DO NOTHING
  `;

  if (!result.success) {
    throw createError({
      status: 500,
      statusMessage: "Something went wrong during creation",
    });
  }

  const { rows } = await db.sql<DbResult<User>>`
  SELECT id, username AS name, role FROM users WHERE username = ${body.username}
`;
  if (!rows.success || !rows.results.length) {
    throw createError({
      status: 500,
      statusMessage:
        "Something went wrong while fetching the result. Input was successful",
    });
  }
  return rows.results[0];
});
