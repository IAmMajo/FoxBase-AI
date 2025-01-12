import checkApiResponse from "../utils/checkApiResponse";
import getActiveCollection from "../utils/getActiveCollection";

export default defineEventHandler(async (event) => {
  const { apiUrl, resultsLimit } = useAppConfig();
  const db = useDatabase();
  const collection = await getActiveCollection();

  const response = await fetch(
    `${apiUrl}/collections/${collection.collection_key}/search`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${event.context.cloudflare.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: getQuery(event).q,
        limit: resultsLimit,
      }),
    },
  );
  await checkApiResponse(response);

  const json = (await response.json()) as ApiProduct[];

  const products = [];
  for (const product of json) {
    const { rows } = await db.sql<DbResult<Product>>`
      SELECT * FROM products
      WHERE collection = ${collection.id}
      AND foxbase_id = ${product.id}
    `;
  }

  return json.map<Product>((product) => {
    const attributes: Record<string, string> = {};

    product.payload.Technical_Attributes.split(", ").forEach((attribute) => {
      const [key, value] = attribute.split(": ");
      attributes[key] = value;
    });

    return {
      foxbase_id: Number(product.payload.id),
      name: product.payload.productName,
      category: product.payload.Product_Category,
      description: product.payload.Description,
      attributes,
      typicalUseCases: product.payload.Typical_Use_Cases.split(", "),
      score: product.score,
    };
  });
});
