type User = {
  _id: string;
  username: string;
  email: string;
  role: "user" | "admin";
};

type LoginCredentials = {
  identifier: string;
  password: string;
};
type RegisterCredentials = Pick<User, "username" | "email"> & {
  password: string;
  confirmPassword: string;
};

type Note = {
  _id: string;
  title: string;
  content: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
};

export type { User, LoginCredentials, RegisterCredentials, Note };
