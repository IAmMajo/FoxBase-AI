export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const { rows } = await useDatabase().sql<DbResult<User>>`SELECT id, username AS name, role FROM users`;
  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }
  return rows.results;
});
