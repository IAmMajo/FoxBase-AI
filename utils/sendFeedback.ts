export default (query: string, product: Product, feedback: number) => {
  fetch(`/api/insert-feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, id: product.id, feedback }),
  });
};
