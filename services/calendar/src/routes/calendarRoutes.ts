import express from "express";
import { getCalendarDeadlines, syncCalendarDeadlines } from "../controller/calendarController";
import { validateTokenMiddleware } from "../controller/validate";

const router = express.Router();

//GET
router.get("/sync", validateTokenMiddleware, syncCalendarDeadlines);

//POST
router.post("/", validateTokenMiddleware, getCalendarDeadlines);

export default router;