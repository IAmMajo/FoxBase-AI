export default defineEventHandler(async () => {
  const db = useDatabase();
  const { rows } = await db.sql<DbResult<Setting>>`SELECT * FROM settings`;
  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }
  return rows.results;
});
