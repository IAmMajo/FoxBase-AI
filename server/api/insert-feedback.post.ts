import { z } from "zod";
import checkApiResponse from "../utils/checkApiResponse";
import getActiveCollection from "../utils/getActiveCollection";

const feedbackSchema = z.object({
  query: z.string().min(1),
  id: z.number().int().positive(),
  feedback: z.literal(1).or(z.literal(-1)),
});

export default defineEventHandler(async (event) => {
  const { apiUrl } = useAppConfig();
  const collection = await getActiveCollection();

  const body = await readValidatedBody(event, (body) =>
    feedbackSchema.parse(body),
  );

  const response = await fetch(
    `${apiUrl}/feedback/${collection.collection_key}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${event.context.cloudflare.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: body.query,
        id: String(body.id),
        feedback: body.feedback,
      }),
    },
  );
  await checkApiResponse(response);
});
