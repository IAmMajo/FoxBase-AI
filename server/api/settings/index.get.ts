export default defineEventHandler(async () => {
  const { rows } = await useDatabase().sql<
    DbResult<Setting>
  >`SELECT * FROM settings`;
  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }

  const settings: Record<string, string> = {};
  rows.results.forEach((result) => (settings[result.name] = result.value));
  return settings;
});
