import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = Router();

const PROXY_TARGET = "http://localhost:3003";

router.get("/", (req, res, next) => {
  req.url = "/calendar";
  createProxyMiddleware({
    target: PROXY_TARGET,
    changeOrigin: true,
  })(req, res, next);
});

router.post("/sync", (req, res, next) => {
  req.url = "/calendar/sync";
  createProxyMiddleware({
    target: PROXY_TARGET,
    changeOrigin: true,
  })(req, res, next);
});

export default router;
