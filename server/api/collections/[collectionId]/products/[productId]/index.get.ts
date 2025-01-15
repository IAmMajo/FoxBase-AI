export default defineEventHandler(async (event) => {
  const { rows } = await useDatabase().sql<DbResult<DbProduct>>`
      SELECT
        *,
        (
          SELECT json_group_object (name, value) FROM product_attributes
          WHERE product = products.id
        ) AS attributes,
        (
          SELECT json_group_array (name) FROM product_typical_use_cases
          WHERE product = products.id
        ) AS typical_use_cases
      FROM products WHERE id = ${getRouterParam(event, "productId")}
    `;
  if (!rows.success) {
    throw createError("Something went wrong during database operation");
  }
  if (!rows.results.length) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }
  return convertDbProductToProduct(rows.results[0]);
});
