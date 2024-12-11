import { z } from "zod";

const promptSchema = z.object({ text: z.string() });

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const db = useDatabase();
  const { text } = await readValidatedBody(event, (body) =>
    promptSchema.parse(body),
  );
  const session = await getUserSession(event);
  const result = await db.sql<DbExecResult>`
    INSERT INTO prompts (text, user) VALUES (${text}, ${session.user.id})
  `;
  if (!result.success) {
    throw createError("Something went wrong during database operation");
  }
  const { rows } = await db.sql<DbResult<Prompt>>`
    SELECT * FROM prompts WHERE text = ${text}
  `;
  if (!rows.success || !rows.results.length) {
    throw createError("Something went wrong during database operation");
  }
  return rows.results[0];
});
