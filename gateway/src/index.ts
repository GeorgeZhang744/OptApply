import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import calendarRoutes from "./routes/calendarRoutes";
import scrapperRoutes from "./routes/scrapperRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/scrapper", scrapperRoutes);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Service is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
