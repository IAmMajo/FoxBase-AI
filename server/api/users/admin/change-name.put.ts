import { z } from "zod";
import checkUserAuthority from "~/server/utils/checkUserAuthority";

const userSchema = z.object({
  id: z.number(),
  newName: z.string(),
});

export default defineEventHandler(async (event) => {
  console.log("a");

  await requireUserSession(event);
  console.log("b");

  if (!(await checkUserAuthority(await getUserSession(event), ["admin"]))) {
    throw createError({
      status: 401,
      statusMessage: "You are not authorized for this action",
    });
  }
  console.log("c");
  const body = await readValidatedBody(event, (body) => userSchema.parse(body));
  const db = useDatabase();
  const r = await db.sql<DbResult<User>>`
  SELECT * FROM users WHERE username = ${body.newName}
 `;
  console.log("d");
  if (r.rows.results[0]?.username) {
    throw createError({
      status: 500,
      statusMessage: "User with this name already exists",
    });
  }
  console.log("e");

  const result = await db.sql<DbExecResult>`
    UPDATE users 
    SET username = ${body.newName}
    WHERE id = ${body.id}
  `;
  if (!result.success) {
    throw createError({
      status: 500,
      statusMessage: "Something went wrong during database operation",
    });
  }
});
