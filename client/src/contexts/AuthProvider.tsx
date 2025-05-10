import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [jwtToken, setJwtToken] = useState<string>(() => {
    // Load token from localStorage (if it exists)
    return localStorage.getItem("jwtToken") || "";
  });

  useEffect(() => {
    // Persist token to localStorage whenever it changes
    if (jwtToken) {
      localStorage.setItem("jwtToken", jwtToken);
    } else {
      localStorage.removeItem("jwtToken");
    }
  }, [jwtToken]);

  return (
    <AuthContext.Provider value={{ jwtToken, setJwtToken }}>
      {children}
    </AuthContext.Provider>
  );
};
