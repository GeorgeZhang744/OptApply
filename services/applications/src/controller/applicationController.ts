import {Request, Response} from "express";
import db from "../db";

//GET retrieve all applications of a user
export const getAllApplications = async (req: Request, res:Response): Promise<void> => {
  const {userId} = req.query;

  if (!userId){
    res.status(400).json({error: "missing userId"});
    return;
  } 

  try{
    const result = await db.query("SELECT * FROM applications WHERE user_id = $1", [userId]);
    res.json(result.rows);
  }catch (err){
    console.error("error fetching applications:", err);
    res.status(500).json({error:"failed to fetch applications"});
  }
 };

 //POST create new application
 export const createApplication = async (req: Request, res: Response) => {
  const {
    user_id,
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

  try{
    const result = await db.query(
      `INSERT INTO applications
      (user_id, company, position, status, application_url, deadline, work_location, min, max, fixed, job_description, skills, note)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [user_id, company, position, status, application_url, deadline, work_location, min, max, fixed, job_description, skills, note]
    );
    res.status(201).json(result.rows[0]);
  }catch (err){
    console.error("error creating application:", err);
    res.status(500).json({error: "failed to create application"});
  }
 };

 //PUT updates application
 export const updateApplication = async(req: Request, res:Response): Promise<void> => {
  const {id} = req.params;
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

  try{
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
      WHERE id = $13
      RETURNING *`,
      [company, position, status, application_url, deadline, work_location, min, max, fixed, job_description, skills, note, id]
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
  const {id} = req.params;

  try{
    const result = await db.query(
      `DELETE FROM applications
      WHERE id = $1
      RETURNING *`,
      [id]
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