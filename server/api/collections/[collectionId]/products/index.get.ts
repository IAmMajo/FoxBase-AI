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
import convertDbProductToProduct from "~/server/utils/convertDbProductToProduct";

const querySchema = z.object({
  page: z.coerce.number().int().positive(),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  if (
    !(await checkUserAuthority(await getUserSession(event), [
      "observer",
      "curator",
      "admin",
    ]))
  ) {
    throw createError({
      status: 401,
      statusMessage: "You are not authorized for this action",
    });
  }
  const { adminPagesSize } = useAppConfig();
  const { page } = await getValidatedQuery(event, (query) =>
    querySchema.parse(query),
  );
  const { rows } = await useDatabase().sql<DbResult<DbProduct>>`
    SELECT * FROM products
    WHERE collection = ${getRouterParam(event, "collectionId")}
    ORDER BY name
    LIMIT {${adminPagesSize}} OFFSET {${(page - 1) * adminPagesSize}}
  `;
  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }
  return rows.results.map(convertDbProductToProduct);
});
