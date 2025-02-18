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

import { micromark } from "micromark";
import checkApiResponse from "../utils/checkApiResponse";
import getActiveCollection from "../utils/getActiveCollection";

export default defineEventHandler(async (event) => {
  const { apiUrl } = useAppConfig();
  const collection = await getActiveCollection();

  const query = getQuery(event);

  let ids = query.ids;
  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  const response = await fetch(
    `${apiUrl}/collections/${collection.collection_key}/generate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${event.context.cloudflare.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query.q,
        document_ids: ids,
      }),
    },
  );
  await checkApiResponse(response);

  const json = (await response.json()) as TextResponse;

  return { response: micromark(json.response) };
});
