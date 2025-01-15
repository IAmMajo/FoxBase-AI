declare interface DbProduct {
  id: number;
  foxbase_id: number;
  name: string;
  category: string;
  description: string;
  attributes?: string;
  typical_use_cases?: string;
}
