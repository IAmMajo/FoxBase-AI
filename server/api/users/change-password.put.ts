import { z } from "zod";
import checkUserAuthority from "~/server/utils/checkUserAuthority";

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  newPassword: z.string(),
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
  //checks if you give the correct original password as extra security measure
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
  const result = await useDatabase().sql<DbExecResult>`
    UPDATE users 
    SET password = ${await hashPassword(body.newPassword)}
    WHERE username = ${body.username}
  `;
  if (!result.success) {
    throw createError("Something went wrong during database operation");
  }
});
