import { z } from "zod";

const routeParamsSchema = z.object({
  promptId: z.coerce.number().int().positive(),
});
const promptSchema = z.object({ text: z.string() });

export default defineEventHandler(async (event): Promise<Prompt> => {
  await requireUserSession(event);
  const { promptId } = await getValidatedRouterParams(event, (routeParams) =>
    routeParamsSchema.parse(routeParams),
  );
  const { text } = await readValidatedBody(event, (body) =>
    promptSchema.parse(body),
  );
  const { user } = await getUserSession(event);
  const result = await useDatabase().sql<DbExecResult>`
    UPDATE prompts SET text = ${text}, user = ${user.id} WHERE id = ${promptId}
  `;
  if (!result.success) {
    throw createError("Something went wrong during database operation");
  }
  return { id: promptId, text: text, user: user.username };
});
