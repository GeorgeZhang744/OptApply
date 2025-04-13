import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { pool } from '../db';

export const handleSignup = async (req: Request, res: Response): Promise<any> => {
  
  console.log("[AUTH] signup handler hit");

  //gets user inputted information
  const { email, password } = req.body;
  console.log(req.body);
  console.log("yoyoyoyoyoyo im running");

  //checks if user already exists
  const isExistingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (isExistingUser.rows.length > 0) {
    //response with error status if email is already in use
    return res.status(400).json({ status: "FAILURE", message: "User already exists" });
  }

  //encrypts password
  console.log("[DEBUG] email:", email);
  console.log("[DEBUG] password:", password);
  const hashPw = await bcrypt.hash(password, 10);

  //inserts user into db (unique id is automatically created when a new user is inputted)
  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
    [email, hashPw]
  );

  //sends response when user is successfully created / stored in db
  return res.status(201).json({
    status: "SUCCESS",
    userId: result.rows[0].id
  });
};