import { z } from "zod";
import checkUserAuthority from "~/server/utils/checkUserAuthority";

const userSchema = z.object({
  id: z.number(),
  newRole: z.string(),
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

  const result = await useDatabase().sql<DbExecResult>`
    UPDATE users 
    SET role = ${body.newRole}
    WHERE id = ${body.id}
  `;
  if (!result.success) {
    throw createError({
      status: 500,
      statusMessage: "Something went wrong during database operation",
    });
  }
});
