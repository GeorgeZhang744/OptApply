import express from "express";
import {getAllApplications,createApplication,updateApplication,deleteApplication,} from "../controller/applicationController";

const router = express.Router();

//GET
router.get("/", getAllApplications);

//POST
router.post("/", createApplication);

//PUT
router.put("/:id", updateApplication);

//DELETE
router.delete("/:id",deleteApplication);

export default router;