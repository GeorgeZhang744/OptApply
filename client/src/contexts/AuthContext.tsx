import { createContext } from "react";

type AuthContextType = {
  jwtToken: string | null;
  setJwtToken: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
