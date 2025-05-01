import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const handleValidate = async (req: Request, res: Response): Promise<any> => {
  const authHeader = req.headers.authorization;
  console.log("Headers received:", req.headers);
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ status: "FAILURE", message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return res.status(200).json({ status: "SUCCESS", user: decoded });
  } catch (err) {
    console.error("JWT validation error:", err);
    return res.status(401).json({ status: "FAILURE", message: "Invalid token" });
  }
};