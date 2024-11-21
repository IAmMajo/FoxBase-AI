/*
 * Don't uncomment until auth is added. Not everyone should be able to insert
 * settings into the database.
 */

/*
 * import { z } from "zod";
 *
 * const settingSchema = z.object({
 *   name: z.string(),
 *   value: z.string(),
 * });
 */

export default defineEventHandler(async (/* event */) => {
  /*
   * const body = await readValidatedBody(event, (body) =>
   *   settingSchema.parse(body),
   * );
   * 
   * const db = useDatabase();
   * const result = await db.sql<DbExecResult>`
   *   INSERT INTO settings (name, value) VALUES (${body.name}, ${body.value})
   *   ON CONFLICT (name) DO UPDATE SET value = ${body.value}
   * `;
   * if (!result.success) {
   *   throw createError("Something went wrong during database operation");
   * }
   */
});
