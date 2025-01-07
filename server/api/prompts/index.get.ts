import { z } from "zod";

const querySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  q: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const { promptsLimit, adminPagesSize } = useAppConfig();
  const db = useDatabase();

  const { page, q } = await getValidatedQuery(event, (query) =>
    querySchema.parse(query),
  );

  if (page) {
    await requireUserSession(event);
    const { rows } = await db.sql<DbResult<Prompt>>`
      SELECT prompts.id, prompts.text, users.username AS user
      FROM prompts, users ON prompts.user = users.id ORDER BY prompts.text
      LIMIT {${adminPagesSize}} OFFSET {${(page - 1) * adminPagesSize}}
    `;
    if (!rows.success) {
      throw createError("Something went wrong during database operation");
    }
    return rows.results;
  }

  let result: DbResult<Prompt> | null = null;
  if (q) {
    result = await db.sql`
      SELECT * FROM prompts_fts WHERE prompts_fts MATCH ${q} AND text != ${q}
      ORDER BY rank LIMIT ${promptsLimit}
    `;
  } else {
    result = await db.sql`
      SELECT * FROM prompts ORDER BY RANDOM() LIMIT ${promptsLimit}
    `;
  }
  const rows = result!.rows;
  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }
  return rows.results.map((result) => result.text);
});
