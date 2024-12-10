export default defineEventHandler(async () => {
  const db = useDatabase();
  const { rows } = await db.sql<
    DbResult<Setting>
  >`SELECT name, value FROM settings`;
  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }
  const settings: { [key: string]: string } = {};
  for (const row of rows.results) {
    settings[row.name] = row.value;
  }
  return settings;
});
