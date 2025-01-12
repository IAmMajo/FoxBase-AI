export default async () => {
  const { rows } = await useDatabase().sql<DbResult<Collection>>`
    SELECT * FROM collection_creator_relation WHERE id = (
      SELECT value FROM settings WHERE name = 'activeCollection'
    )
  `;
  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }
  return rows.results[0];
};
