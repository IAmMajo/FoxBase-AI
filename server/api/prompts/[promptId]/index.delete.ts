export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  if (
      !(await checkUserAuthority(await getUserSession(event), [
        "curator",
        "admin"
      ]))
    ) {
      throw createError({
        status: 401,
        statusMessage: "You are not authorized for this action",
      });
    }
  const result = await useDatabase().sql<DbExecResult>`
    DELETE FROM prompts WHERE id = ${getRouterParam(event, "promptId")}
  `;
  if (!result.success) {
    throw createError("Something went wrong during database operation");
  }
});
