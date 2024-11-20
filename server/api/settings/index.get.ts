export default defineEventHandler(async () => {
  const db = useDatabase();
  const { rows } = await db.sql<DbResult<Setting>>`SELECT * FROM settings`;
  if (!rows.success) {
  }
  return result.rows;
});
