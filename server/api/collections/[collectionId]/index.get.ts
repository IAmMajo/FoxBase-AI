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
