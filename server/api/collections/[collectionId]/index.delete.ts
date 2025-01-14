export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  if (
    !(await checkUserAuthority(await getUserSession(event), [
      "curator",
      "admin",
    ]))
  ) {
    throw createError({
      status: 401,
      statusMessage: "You are not authorized for this action",
    });
  }
  const result = await useDatabase().sql<DbExecResult>`
    DELETE FROM collection_creator_relation
    WHERE id = ${getRouterParam(event, "collectionId")}
  `;
  if (!result.success) {
    throw createError("Something went wrong during database operation");
  }
});
