export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const { rows } = await useDatabase().sql<DbResult<Collection>>`
    SELECT * FROM collection_creator_relation
  `;
  return rows.results;
});
