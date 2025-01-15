import { z } from "zod";
import convertDbProductToProduct from "~/server/utils/convertDbProductToProduct";

const querySchema = z.object({
  page: z.coerce.number().int().positive(),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  if (
    !(await checkUserAuthority(await getUserSession(event), [
      "observer",
      "curator",
      "admin",
    ]))
  ) {
    throw createError({
      status: 401,
      statusMessage: "You are not authorized for this action",
    });
  }
  const { adminPagesSize } = useAppConfig();
  const { page } = await getValidatedQuery(event, (query) =>
    querySchema.parse(query),
  );
  const { rows } = await useDatabase().sql<DbResult<DbProduct>>`
    SELECT * FROM products
    WHERE collection = ${getRouterParam(event, "collectionId")}
    ORDER BY name
    LIMIT {${adminPagesSize}} OFFSET {${(page - 1) * adminPagesSize}}
  `;
  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }
  return rows.results.map(convertDbProductToProduct);
});
