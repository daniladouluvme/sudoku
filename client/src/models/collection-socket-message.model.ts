export interface CollectionSocketMessage<T> {
  type: "CREATE" | "UPDATE" | "DELETE";
  collection: string;
  data: T;
}
