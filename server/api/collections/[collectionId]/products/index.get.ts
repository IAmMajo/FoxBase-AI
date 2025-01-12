import { z } from "zod";

const querySchema = z.object({
  page: z.coerce.number().int().positive(),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const { adminPagesSize } = useAppConfig();
  const db = useDatabase();
  const { page } = await getValidatedQuery(event, (query) =>
    querySchema.parse(query),
  );
  const { rows } = await db.sql<DbResult<Product>>`
    SELECT * FROM products
    WHERE collection = ${getRouterParam(event, "collectionId")}
    ORDER BY name
    LIMIT {${adminPagesSize}} OFFSET {${(page - 1) * adminPagesSize}}
  `;
  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }
  return rows.results;
});
