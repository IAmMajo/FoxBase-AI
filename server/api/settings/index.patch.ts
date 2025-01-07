import { z } from "zod";

const settingSchema = z.record(z.string());

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const body = await readValidatedBody(event, (body) =>
    settingSchema.parse(body),
  );

  const settings = Object.entries(body);
  const db = useDatabase();
  for (const [name, value] of settings) {
    const result = await db.sql<DbExecResult>`
      INSERT INTO settings (name, value) VALUES (${name}, ${value})
      ON CONFLICT (name) DO UPDATE SET value = ${value}
    `;
    if (!result.success) {
      throw createError("Something went wrong during database operation");
    }
  }
});
