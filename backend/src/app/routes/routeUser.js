import express from "express";
import {
  registerUser,
  loginUser,
  authentUser,
  logoutUser,
  authentUserMail,
} from "./../controllers/userController.js";
import authenticateJWT from "./../../helpers/jwt.js";

let router = express.Router();
// import middleware
//

// POST routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/authent", authenticateJWT, authentUser);
router.get("/authent/:verificationToken", authentUserMail);
router.post("/logout", logoutUser);
export default router;
