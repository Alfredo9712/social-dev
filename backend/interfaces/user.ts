interface Comment {
  text: string;
  date: string;
  commenter: string;
}
export interface Thought {
  text: string;
  date: string;
  comments: Comment[];
}
export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  thoughts: Thought[];
}
