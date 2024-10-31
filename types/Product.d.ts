declare interface Product {
  id: number
  name: string
  category: string
  description: string
  attributes: { [key: string]: string }
  typicalUseCases: string[]
  score: number
}
