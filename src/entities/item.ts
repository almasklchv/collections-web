export interface Item {
  id?: string;
  userId?: string;
  collectionId: string;
  username: string;
  title: string;
  tags: string[];
  collectionName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFields: Record<string, any>;
}
