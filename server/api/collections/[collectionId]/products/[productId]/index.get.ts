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

export default defineEventHandler(async (event) => {
  const { rows } = await useDatabase().sql<DbResult<DbProduct>>`
      SELECT
        *,
        (
          SELECT json_group_object (name, value) FROM product_attributes
          WHERE product = products.id
        ) AS attributes,
        (
          SELECT json_group_array (name) FROM product_typical_use_cases
          WHERE product = products.id
        ) AS typical_use_cases
      FROM products WHERE id = ${getRouterParam(event, "productId")}
    `;
  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }
  if (!rows.results.length) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }
  return convertDbProductToProduct(rows.results[0]);
});
