import { IUser } from "../config/user";

export const mockUsers: IUser[] = [
  {
    id: "u1",
    email: "test@example.com",
    password: "password123", // ⚠️ Never store plain text passwords in real apps
  },
  {
    id: "u2",
    email: "admin@example.com",
    password: "adminpass",
  },
];