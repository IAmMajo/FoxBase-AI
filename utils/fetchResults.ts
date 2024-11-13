export default async (query: string): Promise<Product[]> => {
  const response = await fetch(`/api/search?q=${query}`);
  return (await response.json()) as Product[];
};
