import express from "express";
import cors from "cors";
import applicationRoutes from "./routes/applicationRoutes";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

/*app.get("/", (_req, res) => {
  res.send("Service is running!");
});*/

app.use("/",applicationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
