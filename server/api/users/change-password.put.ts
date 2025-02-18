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
import changePassword from "~/server/utils/changePassword";

const userSchema = z.object({
  password: z.string(),
  newPassword: z.string(),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const body = await readValidatedBody(event, (body) => userSchema.parse(body));
  if (body.password.length == 0 || body.newPassword.length == 0) {
    throw createError({
      status: 401,
      message: "You have to give a password.",
    });
  }
  changePassword(
    (await getUserSession(event)).user.id,
    body.newPassword,
    body.password,
  );
});
