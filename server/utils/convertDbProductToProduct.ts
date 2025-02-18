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

export default (dbProduct: DbProduct) => {
  const product: Product = {
    id: dbProduct.id,
    foxbaseId: dbProduct.foxbase_id,
    name: dbProduct.name,
    category: dbProduct.category,
    description: dbProduct.description,
  };
  if (dbProduct.attributes) {
    const attributes = JSON.parse(dbProduct.attributes) as Record<
      string,
      string
    >;
    if (Object.keys(attributes).length) {
      product.attributes = attributes;
    }
  }
  if (dbProduct.typical_use_cases) {
    const typicalUseCases = JSON.parse(dbProduct.typical_use_cases) as string[];
    if (typicalUseCases.length) {
      product.typicalUseCases = typicalUseCases;
    }
  }
  return product;
};
