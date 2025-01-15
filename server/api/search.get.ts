import checkApiResponse from "../utils/checkApiResponse";
import convertDbProductToProduct from "../utils/convertDbProductToProduct";
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
        consider_feedback: true,
      }),
    },
  );
  await checkApiResponse(response);

  const json = (await response.json()) as ApiProduct[];

  const products: Product[] = [];
  for (const apiProduct of json) {
    const { rows } = await db.sql<DbResult<DbProduct>>`
      SELECT
        *,
        (
          SELECT json_group_object (name, value) FROM product_attributes
          WHERE product = products.id
        ) AS attributes,
        (
          SELECT json_group_array (name) FROM product_typical_use_cases
          WHERE product = products.id
        ) AS typical_use_cases
      FROM products WHERE collection = ${collection.id}
      AND foxbase_id = ${apiProduct.payload.id}
    `;
    if (!rows.success) {
      throw createError("Something went wrong during database operation");
    }
    if (!rows.results.length) {
      continue;
    }
    const product = convertDbProductToProduct(rows.results[0]);
    product.score = apiProduct.score;
    products.push(product);
  }
  return products;
});
