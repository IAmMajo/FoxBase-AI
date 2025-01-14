declare interface Product {
  id: number;
  foxbase_id: number;
  name: string;
  category: string;
  description: string;
  attributes: Record<string, string>?;
  typical_use_cases: string[]?;
  score: number?;
}
