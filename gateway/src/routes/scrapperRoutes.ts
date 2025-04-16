import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = Router();

const PROXY_TARGET = "http://localhost:3004";

router.post("/fill", (req, res, next) => {
  req.url = "/scrapper/fill";
  createProxyMiddleware({
    target: PROXY_TARGET,
    changeOrigin: true,
  })(req, res, next);
});

export default router;
