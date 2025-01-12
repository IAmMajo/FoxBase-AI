export default async (text: string) => {
  const response = await fetch(`/api/prompts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response;
};
