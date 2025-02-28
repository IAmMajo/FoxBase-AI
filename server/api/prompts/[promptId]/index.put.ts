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

const routeParamsSchema = z.object({
  promptId: z.coerce.number().int().positive(),
});
const promptSchema = z.object({ text: z.string() });

export default defineEventHandler(async (event): Promise<Prompt> => {
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
  const { promptId } = await getValidatedRouterParams(event, (routeParams) =>
    routeParamsSchema.parse(routeParams),
  );
  const { text } = await readValidatedBody(event, (body) =>
    promptSchema.parse(body),
  );
  const { user } = await getUserSession(event);
  const result = await useDatabase().sql<DbExecResult>`
    UPDATE prompts SET text = ${text}, user = ${user.id} WHERE id = ${promptId}
  `;
  if (!result.success) {
    throw createError("Something went wrong during database operation");
  }
  return { id: promptId, text: text, user: user.username };
});
