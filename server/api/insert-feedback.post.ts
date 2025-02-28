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
import checkApiResponse from "../utils/checkApiResponse";
import getActiveCollection from "../utils/getActiveCollection";

const feedbackSchema = z.object({
  query: z.string().min(1),
  id: z.number().int().positive(),
  feedback: z.literal(1).or(z.literal(-1)),
});

export default defineEventHandler(async (event) => {
  const { apiUrl } = useAppConfig();
  const collection = await getActiveCollection();

  const body = await readValidatedBody(event, (body) =>
    feedbackSchema.parse(body),
  );

  const response = await fetch(
    `${apiUrl}/feedback/${collection.collection_key}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${event.context.cloudflare.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: body.query,
        id: String(body.id),
        feedback: body.feedback,
      }),
    },
  );
  await checkApiResponse(response);
});
