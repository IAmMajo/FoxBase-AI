declare interface ApiProduct {
  id: string;
  version: number;
  score: number;
  payload: { [key: string]: string };
}
