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

export default defineEventHandler((event) => {
  const sessionPassword: string | undefined =
    event.context.cloudflare.env.SESSION_PASSWORD;
  if (!sessionPassword) {
    throw createError(
      "Server configuration incomplete: SESSION_PASSWORD variable is not " +
        "set. Did you forget to copy .dev.vars.example to .dev.vars?",
    );
  }
  useRuntimeConfig(event).session.password = sessionPassword;
  if (!event.context.cloudflare.env.API_TOKEN) {
    throw createError(
      "Server configuration incomplete: API_TOKEN variable is not set. Did " +
        "you forget to add an API token to .dev.vars?",
    );
  }
});
