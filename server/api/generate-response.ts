import checkApiResponse from "../utils/checkApiResponse";

export default defineEventHandler(async (event) => {
  const { apiUrl } = useAppConfig();
  const { apiToken, collection } = useRuntimeConfig();

  const query = getQuery(event);

  let ids = query.ids;
  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  const response = await fetch(`${apiUrl}/collections/${collection}/generate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query.q,
      document_ids: ids,
    }),
  });
  await checkApiResponse(response);

  return response.text();
});
