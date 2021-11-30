import { model, Schema } from "mongoose";
import { User } from "../interfaces/user";

const userSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  thoughts: [
    {
      text: { type: String },
      date: { type: Date },
      comments: [
        {
          text: { type: String },
          date: { type: Date },
          commenter: { type: String },
        },
      ],
    },
  ],
});

export const UserModel = model<User>("User", userSchema);
