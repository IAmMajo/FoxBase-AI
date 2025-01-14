export default async function changePassword(
  id: number,
  newPassword: string,
  password?: string,
) {
  if (password) {
    //checks if you give the correct original password as extra security measure, only happens for not admin
    const { rows } = await useDatabase().sql<DbResult<User>>`
  SELECT * FROM users WHERE id = ${id}
`;
    if (!rows.success) {
      throw createError({
        status: 500,
        statusMessage: "Something went wrong during database operation",
      });
    }
    if (
      !rows.results.length ||
      !(await verifyPassword(rows.results[0].password, password))
    ) {
      throw createError({
        status: 401,
        message: "Invalid username or password",
      });
    }
  }

  const result = await useDatabase().sql<DbExecResult>`
    UPDATE users 
    SET password = ${await hashPassword(newPassword)}
    WHERE id = ${id}
  `;
  if (!result.success) {
    throw createError({
      status: 500,
      statusMessage: "Something went wrong during database operation",
    });
  }
}
