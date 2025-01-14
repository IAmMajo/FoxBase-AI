import { z } from "zod";
import changePassword from "~/server/utils/changePassword";

const userSchema = z.object({
  password: z.string(),
  newPassword: z.string(),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const body = await readValidatedBody(event, (body) => userSchema.parse(body));
  if (body.password.length == 0 || body.newPassword.length == 0) {
    throw createError({
      status: 401,
      message: "You have to give a password.",
    });
  }
  changePassword(
    (await getUserSession(event)).user.id,
    body.newPassword,
    body.password,
  );
});
