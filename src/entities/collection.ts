import { CollectionType } from "./collection-type";

export interface Collection {
  id?: string;
  userId?: string;
  title: string;
  description: string;
  theme: CollectionType;
  imageUrl: string | null;
}
