import { User } from "./user";

export interface Comment {
  id: string;
  itemId: string;
  text: string;
  user: User;
  userId: string;
}


