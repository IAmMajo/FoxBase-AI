export default async (query: string) => {
  const response = await fetch(`/api/prompts?q=${query}`);
  return (await response.json()) as string[];
};
