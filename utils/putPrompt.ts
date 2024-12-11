export default async (prompt: Prompt) => {
  const response = await fetch(`/api/prompts/${prompt.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: prompt.text }),
  });
  return response.json() as Promise<Prompt>;
};
