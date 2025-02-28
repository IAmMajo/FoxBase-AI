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

export default async (query: string, products: Product[]): Promise<string> => {
  const params = new URLSearchParams();
  params.set("q", query);
  products.forEach((product) => {
    params.append("ids", product.foxbaseId.toString());
  });
  const response = await fetch(`/api/generate-response?${params}`);
  const json = (await response.json()) as TextResponse;
  return json.response;
};
