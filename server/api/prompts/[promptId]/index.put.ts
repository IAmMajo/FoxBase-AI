import { z } from "zod";

const promptSchema = z.object({ text: z.string() });

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const body = await readValidatedBody(event, (body) =>
    promptSchema.parse(body),
  );
  const session = await getUserSession(event);
  const result = await useDatabase().sql<DbExecResult>`
    UPDATE prompts SET text = ${body.text}, user = ${session.user.id}
    WHERE id = ${getRouterParam(event, "promptId")}
  `;
  if (!result.success) {
    throw createError("Something went wrong during database operation");
  }
});
