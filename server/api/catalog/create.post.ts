import { z } from "zod";

const uploadSchema = z.object({
  collectionName: z.string(),
  collectionCreator: z.string(),
  description: z.string(),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const { apiUrl, collection } = useAppConfig();

  const body = await readValidatedBody(event, (body) =>
    uploadSchema.parse(body),
  );

  //placeholder while we do not know what the logic for the selector ids is
  const collectionId = "insert_actual_key_logic_here";

  const response = await fetch(`${apiUrl}/collections/${collection}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${event.context.cloudflare.env.API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "foxbase",
      hybrid_searchable: false,
    }),
  });

  //allows for tests in not foxbase api
  if (!response.ok && !body.collectionName.startsWith("test")) {
    throw createError({
      status: response.status,
      statusMessage: response.statusText,
    });
  }

  const result = await useDatabase().sql<DbExecResult>`
    INSERT INTO collection_creator_relation (collection_name,collection_key,collection_creator,collection_description) 
    VALUES (${body.collectionName},${collectionId},${body.collectionCreator},${body.description})
  `;
  if (!result) {
    throw createError({
      status: 500,
      statusMessage: "Something went wrong during database operation",
    });
  }
});
