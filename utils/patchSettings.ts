export default async (settings: Setting[]): Promise<boolean> => {
  const response = await fetch(`/api/settings`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  });
  return response.ok;
};
