import { Request, Response } from "express";
import db from "../db";

//GET fetch calendar data with application deadlines
export const getCalendarDeadlines = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.body.userId;

  try {
    const result = await db.query(
      `
        SELECT deadline, ARRAY_AGG(id) AS application_ids
        FROM applications
        WHERE user_id = $1
        GROUP BY deadline
        ORDER BY deadline;
      `,
      [userId]
    );

    res.status(200).json({ status: "SUCCESS", data: result.rows });
  } catch (err) {
    console.error("Error fetching calendar deadlines:", err);
    res
      .status(500)
      .json({ status: "ERROR", message: "Failed to fetch calendar deadlines" });
  }
};

//POST sync calendar with latest application data
export const syncCalendarDeadlines = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { applications } = req.body;

  try {
    const applicationIds = applications.map((app) => app.id).flat();
    const deadlines = applications.map((app) => app.deadline);

    await db.query(
      `
        UPDATE applications
        SET deadline = new_data.deadline
        FROM (
        SELECT UNNEST($1::TEXT[]) AS id, UNNEST($2::DATE[]) AS deadline
        ) AS new_data
        WHERE applications.id = new_data.id;
    `,
      [applicationIds, deadlines]
    );

    res.status(200).json({ status: "SUCCESS" });
  } catch (err) {
    console.error("Error syncing calendar deadlines:", err);
    res
      .status(500)
      .json({ status: "ERROR", message: "Failed to sync calendar deadlines" });
  }
};
