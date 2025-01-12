import checkUserAuthority from "~/server/utils/checkUserAuthority";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  if (
    !(await checkUserAuthority(await getUserSession(event), [
      "curator",
      "admin",
      "observer",
    ]))
  ) {
    throw createError({
      status: 401,
      statusMessage: "You are not authorized for this action",
    });
  }

  const { rows } = await useDatabase().sql<
    DbResult<User>
  >`SELECT id, username AS name, role FROM users`;
  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }
  return rows.results;
});
