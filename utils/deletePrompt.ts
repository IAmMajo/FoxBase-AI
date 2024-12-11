export default async (id: number) => {
  const response = await fetch(`/api/prompts/${id}`, { method: "DELETE" });
  return response.ok;
};
