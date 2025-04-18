import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = Router();

const PROXY_TARGET = "http://localhost:3002";

router.get("/", (req, res, next) => {
  req.url = "/application";
  createProxyMiddleware({
    target: PROXY_TARGET,
    changeOrigin: true,
  })(req, res, next);
});

router.post("/", (req, res, next) => {
  req.url = "/application";
  createProxyMiddleware({
    target: PROXY_TARGET,
    changeOrigin: true,
  })(req, res, next);
});

router.put("/:application_id", (req, res, next) => {
  req.url = `/application/${req.params.application_id}`;
  createProxyMiddleware({
    target: PROXY_TARGET,
    changeOrigin: true,
  })(req, res, next);
});

router.delete("/:application_id", (req, res, next) => {
  req.url = `/application/${req.params.application_id}`;
  createProxyMiddleware({
    target: PROXY_TARGET,
    changeOrigin: true,
  })(req, res, next);
});

export default router;
