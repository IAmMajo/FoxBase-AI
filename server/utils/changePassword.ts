/*
 * Copyright 2025 Alina Marie Hartmann, Max Josef Overlack, Nils Paaßen,
 * Nico Puelacher, Hanna Steffen, Lena Weuste
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
