import checkApiResponse from "../utils/checkApiResponse";

export default defineEventHandler(async (event) => {
  const { apiUrl, resultsLimit } = useAppConfig();
  const { apiToken, collection } = useRuntimeConfig();

  const response = await fetch(`${apiUrl}/collections/${collection}/search`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: getQuery(event).q,
      limit: resultsLimit,
    }),
  });
  await checkApiResponse(response);

  const json = (await response.json()) as ApiProduct[];

  return JSON.stringify(
    json.map<Product>((product) => {
      const attributes: { [key: string]: string } = {};

      product.payload.Technical_Attributes.split(", ").forEach((attribute) => {
        const [key, value] = attribute.split(": ");
        attributes[key] = value;
        return attributes;
      });

      return {
        id: Number(product.payload.id),
        name: product.payload.productName,
        category: product.payload.Product_Category,
        description: product.payload.Description,
        attributes,
        typicalUseCases: product.payload.Typical_Use_Cases.split(", "),
        score: product.score,
      };
    }),
  );
});
