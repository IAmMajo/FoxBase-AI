export default async (query: string, products: Product[]): Promise<string> => {
  const params = new URLSearchParams();
  params.set("q", query);
  products.forEach((product) => {
    params.append("ids", product.id.toString());
  });
  const response = await fetch(`/api/generate-response?${params}`);
  const json = (await response.json()) as { response: string };
  return json.response;
};
