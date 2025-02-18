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

import { z } from "zod";
import checkUserAuthority from "~/server/utils/checkUserAuthority";

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  role: z.string(),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  if (!(await checkUserAuthority(await getUserSession(event), ["admin"]))) {
    throw createError({
      status: 401,
      statusMessage: "You are not authorized for this action",
    });
  }

  const body = await readValidatedBody(event, (body) => userSchema.parse(body));
  const password = await hashPassword(body.password);
  const db = useDatabase();

  const r = await db.sql<DbResult<User>>`
   SELECT * FROM users WHERE username = ${body.username}
  `;

  if (r.rows.results[0]?.username) {
    throw createError({
      status: 500,
      statusMessage: "User with this name already exists",
    });
  }

  const result = await db.sql<DbExecResult>`
    INSERT INTO users (username, password, role) VALUES (${body.username}, ${password}, ${body.role})
    ON CONFLICT (username) DO NOTHING
  `;

  if (!result.success) {
    throw createError({
      status: 500,
      statusMessage: "Something went wrong during creation",
    });
  }

  const { rows } = await db.sql<DbResult<User>>`
  SELECT id, username AS name, role FROM users WHERE username = ${body.username}
`;
  if (!rows.success || !rows.results.length) {
    throw createError({
      status: 500,
      statusMessage:
        "Something went wrong while fetching the result. Input was successful",
    });
  }
  return rows.results[0];
});
