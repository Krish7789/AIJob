import express from "express";
import { testRoadmap, generateRoadmapHandler } from "./roadmap.controller.js";

const router = express.Router();

router.get("/test-roadmap", testRoadmap);
router.post("/generate-roadmap", generateRoadmapHandler);

export default router;
