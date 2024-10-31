export async function fetchResults(query: string): Promise<Product[]> {
  const { apiUrl, apiToken, collection, resultsLimit } = useAppConfig();

  const response = await fetch(`${apiUrl}/collections/${collection}/search`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({
      query,
      limit: resultsLimit,
    }),
  });

  const json = (await response.json()) as ApiProduct[];

  return json.map<Product>((product) => {
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
  });
}
