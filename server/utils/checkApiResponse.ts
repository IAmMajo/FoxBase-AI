export default async (response: Response) => {
  if (response.ok) {
    return;
  }
  throw createError({
    message: "Something went wrong during Semantic Search API request",
    data: {
      status: response.status,
      body: await response.text(),
    }
  });
};
