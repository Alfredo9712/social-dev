import { model, Schema } from "mongoose";
import { User } from "../interfaces/user";

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model<User>("User", userSchema);
