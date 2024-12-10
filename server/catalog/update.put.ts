import { z } from "zod";

const uploadSchema = z.object({
  collectionName: z.string(),
  collectionCreator: z.string(),
  updateDescription: z.string(),
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

  const collection = rows.results[0].key;

  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }

  const response = await fetch(`${apiUrl}/collections/${collection}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${event.context.cloudflare.env.API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: rows.results[0].key,
      description: body.updateDescription,
      payload: {},
    }),
  });
  //during dev
  console.log(response);
});
