declare interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  attributes: Record<string, string>;
  typicalUseCases: string[];
  score: number;
}
