import { micromark } from "micromark";
import checkApiResponse from "../utils/checkApiResponse";

export default defineEventHandler(async (event) => {
  const { apiUrl, collection } = useAppConfig();

  const query = getQuery(event);

  let ids = query.ids;
  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  const response = await fetch(`${apiUrl}/collections/${collection}/generate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${event.context.cloudflare.env.API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query.q,
      document_ids: ids,
    }),
  });
  await checkApiResponse(response);

  const json = (await response.json()) as TextResponse;

  return { response: micromark(json.response) };
});
