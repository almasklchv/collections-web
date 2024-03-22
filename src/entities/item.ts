export interface Item {
  id?: string;
  userId?: string;
  collectionId: string;
  username: string;
  title: string;
  tags: string[];
  collectionName: string;
}
