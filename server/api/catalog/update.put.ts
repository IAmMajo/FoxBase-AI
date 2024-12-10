import { z } from "zod";

const uploadSchema = z.object({
  collectionName: z.string(),
  updateDescription: z.string(),
  collectionContent: z.string(),
});

export default defineEventHandler(async (event) => { 
  await requireUserSession(event);

  const { apiUrl } = useAppConfig();

  const body = await readValidatedBody(event, (body) =>
    uploadSchema.parse(body),
  );
  const { rows } = await useDatabase().sql<DbResult<Collection>>`
   SELECT collection_key 
   FROM collection_creator_relation 
   WHERE collection_name = ${body.collectionName}
  `;
  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }
  const collection = rows.results[0].key;

  const response = await fetch(`${apiUrl}/collections/${collection}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${event.context.cloudflare.env.API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: rows.results[0].key,
      description: body.updateDescription,
      payload: body.collectionContent,
    }),
  });
  if (!response.ok) {
    throw createError({
      status: response.status,
      statusMessage: response.statusText,
    });
  }
});
