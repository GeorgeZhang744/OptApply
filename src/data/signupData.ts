import { IUser } from "../config/user";

export const mockUsers: IUser[] = [
  {
    id: 1,
    email: "test@example.com",
    password: "password123", //password will be encrypted when actually stored in db
  },
  {
    id: 2,
    email: "admin@example.com",
    password: "adminpass",
  },
];