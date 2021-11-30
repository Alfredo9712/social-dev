import { User } from "../../../backend/interfaces/user";
export interface Auth {
  token: string;
  user: User;
}
