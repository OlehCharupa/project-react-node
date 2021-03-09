import express from "express";
import {
  registerUser,
  loginUser,
  authentUser,
  logoutUser,
} from "./../controllers/userController.js";
let router = express.Router();
// import middleware
//

// POST routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/authent/:verificationToken", authentUser);
router.post("/logout", logoutUser);
export default router;
