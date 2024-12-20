import express from "express";
import { createUser, loginUser, getUserProfile } from "../controllers/users.js";
const router = express.Router();

// router.get("/", getUserProfile);
router.get("/:email", getUserProfile);

export default router;
