import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { pool } from "../db";
import jwt, {SignOptions} from "jsonwebtoken";

export const handleSignin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    //email not found
    if (result.rows.length === 0) {
        return res.status(401).json({ status: "FAILURE", message: "Invalid email or password" });
    }

    const user = result.rows[0];
    //checks to see if passwords match
    const passwordMatch = await bcrypt.compare(password, user.password);

    //wrong inputted password
    if (!passwordMatch) {
        return res.status(401).json({ status: "FAILURE", message: "Invalid email or password" });
    }

    //generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h"}
    );

    //email and matching password successfully found
    return res.status(200).json({
        status: "SUCCESS",
        token: token,
        userId: user.id,
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ status: "FAILURE", message: "Server error" });
  }
};