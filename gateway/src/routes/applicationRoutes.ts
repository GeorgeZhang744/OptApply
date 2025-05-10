import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = Router();

const PROXY_TARGET = "http://localhost:3002";

router.use(
  "/",
  createProxyMiddleware({
    target: PROXY_TARGET,
    changeOrigin: true,
    pathRewrite: {
      "^/api/applications": "", // strips the prefix
    },
    logger: console,
  })
);

export default router;
