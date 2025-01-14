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

  const products: Product[] = [];
  for (const apiProduct of json) {
    const { rows: productsRows } = await db.sql<DbResult<Product>>`
      SELECT * FROM products WHERE collection = ${collection.id}
      AND foxbase_id = ${apiProduct.payload.id}
    `;
    if (!productsRows.success) {
      throw createError("Something went wrong during database operation");
    }
    if (!productsRows.results.length) {
      continue;
    }
    const product = productsRows.results[0];

    const attributes: Record<string, string> = {};
    const { rows: productAttributesRows } = await db.sql<
      DbResult<ProductAttribute>
    >`SELECT * FROM product_attributes WHERE product = ${product.id}`;
    if (!productAttributesRows.success) {
      throw createError("Something went wrong during database operation");
    }
    productAttributesRows.results.forEach((attribute) => {
      attributes[attribute.name] = attribute.value;
    });
    product.attributes = attributes;

    const { rows: productTypicalUseCasesRows } = await db.sql<
      DbResult<ProductTypicalUseCase>
    >`SELECT * FROM product_typical_use_cases WHERE product = ${product.id}`;
    if (!productTypicalUseCasesRows.success) {
      throw createError("Something went wrong during database operation");
    }
    product.typical_use_cases = productTypicalUseCasesRows.results.map(
      (typicalUseCase) => typicalUseCase.name,
    );

    product.score = apiProduct.score;

    products.push(product);
  }
  return products;
});
