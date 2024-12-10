export default defineEventHandler(async () => {
  const { rows } = await useDatabase().sql<
    DbResult<Setting>
  >`SELECT name, value FROM settings`;
  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }

  const settings: { [key: string]: string } = {};
  rows.results.forEach((result) => settings[result.name] = result.value);
  return settings;
});
