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

const settingSchema = z.record(z.string());

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const body = await readValidatedBody(event, (body) =>
    settingSchema.parse(body),
  );

  if (
    !(await checkUserAuthority(await getUserSession(event), [
      "curator",
      "admin",
    ]))
  ) {
    throw createError({
      status: 401,
      statusMessage: "You are not authorized for this action",
    });
  }

  const settings = Object.entries(body);
  const db = useDatabase();
  for (const [name, value] of settings) {
    const result = await db.sql<DbExecResult>`
      INSERT INTO settings (name, value) VALUES (${name}, ${value})
      ON CONFLICT (name) DO UPDATE SET value = ${value}
    `;
    if (!result.success) {
      throw createError("Something went wrong during database operation");
    }
  }
});
