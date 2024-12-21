import express from "express";
import { createUser, loginUser } from "../controllers/users.js";
import { showHome, showLogin, showSignup, logoutUser } from "../controllers/index.js";
const router = express.Router();

/* GET home page. */
router.get('/', showHome);
router.get('/logout', logoutUser);

router
  .get("/signup", showSignup)
  .post("/signup", createUser);

router
  .get("/login", showLogin)
  .post("/login", loginUser);

export default router;