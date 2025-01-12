import { UserSession } from "#auth-utils";

export default async function checkUserAuthority(
  session: UserSession,
  neededRole: string[],
) {
  const { rows } = await useDatabase().sql<
    DbResult<{
      role: string;
    }>
  >`SELECT role FROM users WHERE id = ${session.user.id}`;
  if (rows.error) {
    throw rows.error;
  }

  var auth = false;
  neededRole.forEach((element) => {
    if (element == rows.results[0].role) {
      auth = true;
    }
  });
  return auth;
}
