import { Request, Response, NextFunction } from "express";

const AUTH_SERVICE_URL = "http://localhost:3000/api/auth/validate";

export const validateTokenMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ status: "ERROR", message: "Unauthorized: No token provided" });
    return;
  }

  try {
    const response = await fetch(AUTH_SERVICE_URL, {
      method: "POST",
      headers: { Authorization: authHeader },
    });

    const data = await response.json();

    if (data.status !== "SUCCESS") {
      res.status(403).json({ status: "ERROR", message: "Forbidden: Invalid token" });
      return;
    }

    next();

  } catch (error) {
    console.error("Token validation failed:", error);
    res.status(500).json({ status: "ERROR", message: "Failed to validate token" });
    return;
  }
};