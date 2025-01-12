export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const result = await useDatabase().sql<DbExecResult>`
    DELETE FROM collection_creator_relation
    WHERE id = ${getRouterParam(event, "collectionId")}
  `;
  if (!result.success) {
    throw createError("Something went wrong during database operation");
  }
});
