export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const result = await useDatabase().sql<DbExecResult>`
    DELETE FROM prompts WHERE id = ${getRouterParam(event, "promptId")}
  `;
  if (!result.success) {
    throw createError("Something went wrong during database operation");
  }
});
