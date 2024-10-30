import { API_TOKEN, API_URL, COLLECTION, RESULTS_LIMIT } from '@/config'
import type { ApiProduct } from '@/interfaces/ApiProduct'
import type { Product } from '@/interfaces/Product'

export async function fetchResults(query: string): Promise<Product[]> {
  const response = await fetch(`${API_URL}/collections/${COLLECTION}/search`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      limit: RESULTS_LIMIT,
    }),
  })

  const json = (await response.json()) as ApiProduct[]

  return json.map<Product>(product => {
    const attributes: { [key: string]: string } = {}

    product.payload.Technical_Attributes.split(', ').forEach(attribute => {
      const [key, value] = attribute.split(': ')
      attributes[key] = value
      return attributes
    })

    return {
      id: Number(product.payload.id),
      name: product.payload.productName,
      category: product.payload.Product_Category,
      description: product.payload.Description,
      attributes,
      typicalUseCases: product.payload.Typical_Use_Cases.split(', '),
      score: product.score,
    }
  })
}
