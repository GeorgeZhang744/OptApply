import { Router } from "express";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";

const router = Router();

const PROXY_TARGET = "http://127.0.0.1:3004";

router.post("/fill", (req, res, next) => {
  // req.url = "/scrapper/fill";
  createProxyMiddleware({
    target: PROXY_TARGET,
    changeOrigin: true,
    pathRewrite: {
      "/fill": "/scrapper/fill",
    },
    logger: console,
  })(req, res, next);
});

export default router;
