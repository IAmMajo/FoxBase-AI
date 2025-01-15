export default (dbProduct: DbProduct) => {
  const product: Product = {
    id: dbProduct.id,
    foxbaseId: dbProduct.foxbase_id,
    name: dbProduct.name,
    category: dbProduct.category,
    description: dbProduct.description,
  };
  if (dbProduct.attributes) {
    const attributes = JSON.parse(dbProduct.attributes) as Record<
      string,
      string
    >;
    if (Object.keys(attributes).length) {
      product.attributes = attributes;
    }
  }
  if (dbProduct.typical_use_cases) {
    const typicalUseCases = JSON.parse(dbProduct.typical_use_cases) as string[];
    if (typicalUseCases.length) {
      product.typicalUseCases = typicalUseCases;
    }
  }
  return product;
};
