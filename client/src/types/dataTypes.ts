type User = {
  _id: string;
  username: string;
  email: string;
  role: "user" | "admin";
};

type Note = {
  _id: string;
  title: string;
  content: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
};

export type {
    User,
    Note,
}