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

const querySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  q: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const { promptsLimit, adminPagesSize } = useAppConfig();
  const db = useDatabase();

  const { page, q } = await getValidatedQuery(event, (query) =>
    querySchema.parse(query),
  );

  if (page) {
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
    const { rows } = await db.sql<DbResult<Prompt>>`
      SELECT prompts.id, prompts.text, users.username AS user
      FROM prompts, users ON prompts.user = users.id ORDER BY prompts.text
      LIMIT {${adminPagesSize}} OFFSET {${(page - 1) * adminPagesSize}}
    `;
    if (!rows.success) {
      throw createError("Something went wrong during database operation");
    }
    return rows.results;
  }

  let result: DbResult<Prompt> | null = null;
  if (q) {
    result = await db.sql`
      SELECT * FROM prompts_fts WHERE prompts_fts MATCH ${q} AND text != ${q}
      ORDER BY rank LIMIT ${promptsLimit}
    `;
  } else {
    result = await db.sql`
      SELECT * FROM prompts ORDER BY RANDOM() LIMIT ${promptsLimit}
    `;
  }
  const rows = result!.rows;
  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }
  return rows.results.map((result) => result.text);
});
