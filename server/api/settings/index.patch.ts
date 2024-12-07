import { z } from "zod";

const settingSchema = z.array(z.object({
  name: z.string(),
  value: z.string(),
}));

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const body = await readValidatedBody(event, (body) =>
    settingSchema.parse(body),
  );

  const db = useDatabase();
  for (const setting of body) {
    const result = await db.sql<DbExecResult>`
      INSERT INTO settings (name, value) VALUES (${setting.name}, ${setting.value})
      ON CONFLICT (name) DO UPDATE SET value = ${setting.value}
    `;
    if (!result.success) {
      throw createError("Something went wrong during database operation");
    }
  }
});
