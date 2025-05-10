import {Request, Response} from "express";
import db from "../db";
import { validateToken } from "../utils/validateToken";

//GET retrieve all applications of a user
export const getAllApplications = async (req: Request, res:Response): Promise<void> => {
  try{
    const {userId} = await validateToken(req);

    const result = await db.query("SELECT * FROM applications WHERE user_id = $1", [userId]);
    res.json(result.rows);
  }catch (err){
    console.error("error fetching applications:", err);
    res.status(500).json({error:"failed to fetch applications"});
  }
 };

 //POST create new application
 export const createApplication = async (req: Request, res: Response) => {
  try{
    const {userId} = await validateToken(req);

    const {
    company,
    position,
    status,
    application_url,
    deadline,
    work_location,
    min,
    max,
    fixed,
    job_description,
    skills,
    note,
  } = req.body;

    console.log("Creating application for user:", userId);
    const result = await db.query(
      `INSERT INTO applications
      (user_id, company, position, status, application_url, deadline, work_location, min, max, fixed, job_description, skills, note)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [userId, company, position, status, application_url, deadline, work_location, min, max, fixed, job_description, skills, note]
    );
    res.status(201).json(result.rows[0]);
  }catch (err:any){
    res.status(500).json({ error: err.message || "failed to create application" });
  }
 };

 //PUT updates application
 export const updateApplication = async(req: Request, res:Response): Promise<void> => {
  try{
    const {userId} = await validateToken(req);
    const {application_id} = req.params;
    const {
    company,
    position,
    status,
    application_url,
    deadline,
    work_location,
    min,
    max,
    fixed,
    job_description,
    skills,
    note,
  } = req.body;

    
    const result = await db.query(
      `UPDATE applications SET
        company = $1,
        position = $2,
        status = $3,
        application_url = $4,
        deadline = $5,
        work_location = $6,
        min = $7,
        max = $8,
        fixed = $9,
        job_description = $10,
        skills = $11,
        note = $12
      WHERE id = $13 AND user_id = $14
      RETURNING *`,
      [company, position, status, application_url, deadline, work_location, min, max, fixed, job_description, skills, note, application_id, userId]
    );

    if(result.rowCount === 0){
      res.status(404).json({error: "job application not found"});
      return;
    }

    res.json(result.rows[0]);
  }catch (err){
    console.error("error updating application: ", err);
    res.status(500).json({error: "failed to update application"});
  }
 };

 //DELETE deletes application
 export const deleteApplication = async (req:Request, res:Response): Promise<void> => {
  try{
    const {userId} = await validateToken(req);
    const {application_id} = req.params;

    const result = await db.query(
      `DELETE FROM applications
      WHERE id = $1 AND user_id = $2
      RETURNING *`,
      [application_id, userId]
    );

    if(result.rowCount === 0){
      res.status(404).json({error: "application not found"});
      return;
    }

    res.json({message:"application deleted", application: result.rows[0]});
  }catch (err){
    console.error("error deleting application: ", err);
    res.status(500).json({error: "failed to delete application"});
  }
 };