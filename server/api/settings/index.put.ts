import { z } from "zod";

const settingSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    settingSchema.parse(body),
  );
  const db = useDatabase();
  const result = await db.sql<DbExecResult>`
    INSERT INTO settings (name, value) VALUES (${body.name}, ${body.value})
    ON CONFLICT (name) DO UPDATE SET value = ${body.value}
  `;
  return result.success;
});
