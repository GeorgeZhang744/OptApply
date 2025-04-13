import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.post("/api/auth/signup", (req, res, next) => {
  req.url = "/auth/signup"; 
  console.log("[GATEWAY] Rewriting request to /auth/signup manually");
  
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
  })(req, res, next);
});


app.use(express.json());



app.get("/", (_req, res) => {
  res.send("Service is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
