import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = Router();

const PROXY_TARGET = "http://localhost:3001";

router.post("/signup", (req, res, next) => {
  req.url = "/auth/signup";
  createProxyMiddleware({
    target: PROXY_TARGET,
    changeOrigin: true,
  })(req, res, next);
});

router.post("/signin", (req, res, next) => {
  req.url = "/auth/signin";
  createProxyMiddleware({
    target: PROXY_TARGET,
    changeOrigin: true,
  })(req, res, next);
});


export default router;
