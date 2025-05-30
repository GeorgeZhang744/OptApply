import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Service is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
