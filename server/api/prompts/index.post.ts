import { z } from "zod";

const promptSchema = z.object({ text: z.string() });

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const body = await readValidatedBody(event, (body) =>
    promptSchema.parse(body),
  );
  const session = await getUserSession(event);
  const result = await useDatabase().sql<DbExecResult>`
    INSERT INTO prompts (text, user) VALUES (${body.text}, ${session.user.id})
  `;
  if (!result.success) {
    throw createError("Something went wrong during database operation");
  }
});
