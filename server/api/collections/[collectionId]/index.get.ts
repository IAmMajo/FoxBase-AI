export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const { rows } = await useDatabase().sql<DbResult<Collection>>`
    SELECT * FROM collection_creator_relation
    WHERE id = ${getRouterParam(event, "collectionId")}
  `;
  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }
  if (!rows.results.length) {
    throw createError({
      statusCode: 404,
      statusMessage: "Collection not found",
    });
  }
  return rows.results[0];
});
