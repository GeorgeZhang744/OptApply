import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = Router();

const PROXY_TARGET = "http://localhost:3003";

router.post("/sync", (req, res, next) => {
  // req.url = "/calendar/sync";
  createProxyMiddleware({
    target: PROXY_TARGET,
    changeOrigin: true,
    pathRewrite: {
      "^/sync": "/calendar/sync",
    },
    logger: console,
  })(req, res, next);
});

router.get("/", (req, res, next) => {
  // req.url = "/calendar";
  createProxyMiddleware({
    target: PROXY_TARGET,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/calendar",
    },
    logger: console,
  })(req, res, next);
});

export default router;
