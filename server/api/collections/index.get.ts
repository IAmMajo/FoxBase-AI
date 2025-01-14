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
  `;
  return rows.results;
});
