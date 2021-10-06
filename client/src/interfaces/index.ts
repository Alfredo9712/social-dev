export interface User {
  name?: string;
  email: string;
  password: string;
}

export interface Auth {
  token: string;
  user: {
    _id: string;
    email: string;
    name: string;
  };
}
