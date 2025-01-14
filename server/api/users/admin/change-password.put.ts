import { z } from "zod";
import changePassword from "~/server/utils/changePassword";
import checkUserAuthority from "~/server/utils/checkUserAuthority";

const userSchema = z.object({
  id: z.number(),
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

  changePassword(body.id, body.newPassword);
});
