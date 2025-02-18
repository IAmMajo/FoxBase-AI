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

import checkApiResponse from "../utils/checkApiResponse";
import convertDbProductToProduct from "../utils/convertDbProductToProduct";
import getActiveCollection from "../utils/getActiveCollection";

export default defineEventHandler(async (event) => {
  const { apiUrl, resultsLimit } = useAppConfig();
  const db = useDatabase();
  const collection = await getActiveCollection();

  const response = await fetch(
    `${apiUrl}/collections/${collection.collection_key}/search`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${event.context.cloudflare.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: getQuery(event).q,
        limit: resultsLimit,
        consider_feedback: true,
      }),
    },
  );
  await checkApiResponse(response);

  const json = (await response.json()) as ApiProduct[];

  const products: Product[] = [];
  for (const apiProduct of json) {
    const { rows } = await db.sql<DbResult<DbProduct>>`
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
      FROM products WHERE collection = ${collection.id}
      AND foxbase_id = ${apiProduct.payload.id}
    `;
    if (!rows.success) {
      throw createError("Something went wrong during database operation");
    }
    if (!rows.results.length) {
      continue;
    }
    const product = convertDbProductToProduct(rows.results[0]);
    product.score = apiProduct.score;
    products.push(product);
  }
  return products;
});
