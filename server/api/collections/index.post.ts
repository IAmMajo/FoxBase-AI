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

const uploadSchema = z.object({
  collectionName: z.string(),
  description: z.string(),
  key: z.string(),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

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

  const { apiUrl } = useAppConfig();
  const db = useDatabase();

  const { collectionName, description, key } = await readValidatedBody(
    event,
    (body) => uploadSchema.parse(body),
  );

  let collectionsResult: DbExecResult;
  try {
    collectionsResult = await db.sql<DbExecResult>`
      INSERT INTO collection_creator_relation
      (collection_name, collection_key, collection_description)
      VALUES (${collectionName}, ${key}, ${description})
    `;
  } catch (error) {
    if (
      !(
        error instanceof Error &&
        error.message.includes("UNIQUE constraint failed")
      )
    ) {
      throw error;
    }
    throw createError({
      status: 409,
      message: "A collection with this name or key already exists",
    });
  }
  if (!collectionsResult.success) {
    throw createError("Something went wrong during database operation");
  }
  const { rows: collectionsRows } = await db.sql<DbResult<Collection>>`
    SELECT * FROM collection_creator_relation
    WHERE collection_name = ${collectionName}
  `;
  if (!collectionsRows.success || !collectionsRows.results.length) {
    throw createError("Something went wrong during database operation");
  }
  const collection = collectionsRows.results[0];
  const id = collection.id;

  const response = await fetch(`${apiUrl}/collections/${key}/search`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${event.context.cloudflare.env.API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: "",
      limit: 100,
    }),
  });
  await checkApiResponse(response);

  const json = (await response.json()) as ApiProduct[];

  for (const product of json) {
    const productFoxbaseId = product.payload.id;
    const productsResult = await db.sql<DbExecResult>`
      INSERT INTO products (foxbase_id, name, category, description, collection)
      VALUES (
        ${productFoxbaseId},
        ${product.payload.productName},
        ${product.payload.Product_Category},
        ${product.payload.Description},
        ${id}
      )
    `;
    if (!productsResult.success) {
      throw createError("Something went wrong during database operation");
    }
    const { rows: productsRows } = await db.sql<DbResult<DbProduct>>`
      SELECT * FROM products
      WHERE collection = ${id} AND foxbase_id = ${productFoxbaseId}
    `;
    if (!productsRows.success || !productsRows.results.length) {
      throw createError("Something went wrong during database operation");
    }
    const productId = productsRows.results[0].id;

    const attributes: string[] = [];
    product.payload.Technical_Attributes.split(", ").forEach((attribute) => {
      if (attribute.includes(": ")) {
        attributes.push(attribute);
        return;
      }
      attributes[attributes.length - 1] += `, ${attribute}`;
    });
    for (const attribute of attributes) {
      const [key, value] = attribute.split(": ");
      const productAttributesResult = await db.sql<DbExecResult>`
        INSERT INTO product_attributes (name, value, product)
        VALUES (${key}, ${value}, ${productId})
      `;
      if (!productAttributesResult.success) {
        throw createError("Something went wrong during database operation");
      }
    }

    const typicalUseCases = product.payload.Typical_Use_Cases.split(", ");
    for (const typicalUseCase of typicalUseCases) {
      const productTypicalUseCasesResult = await db.sql<DbExecResult>`
        INSERT INTO product_typical_use_cases (name, product)
        VALUES (${typicalUseCase}, ${productId})
      `;
      if (!productTypicalUseCasesResult.success) {
        throw createError("Something went wrong during database operation");
      }
    }
  }

  const settingsResult = await db.sql<DbExecResult>`
      INSERT INTO settings (name, value)
      VALUES ('activeCollection', ${String(id)})
      ON CONFLICT (name) DO NOTHING
    `;
  if (!settingsResult.success) {
    throw createError("Something went wrong during database operation");
  }

  return collection;
});
