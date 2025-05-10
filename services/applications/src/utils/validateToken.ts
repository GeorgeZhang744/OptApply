import axios from "axios";
import {Request} from "express";

//validates jwt token by forwarding it to auth service via gateway
export const validateToken = async (req:Request): Promise<{userId:string}> =>{
  const authHeader = req.headers.authorization;

  if(!authHeader){
    throw new Error("missing authorization header");
  }

  try{
    const response = await axios.post(
      "http://localhost:3000/api/auth/validate",
      {},
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    return response.data.user;
  }catch (err: any){
    console.error("token validation failed: ", err.message);
    throw new Error("invalid or expired token");
  }
};