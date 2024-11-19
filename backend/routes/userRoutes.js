import express from "express";
import { googleAuth, logoutUser } from "../controllers/userController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/google").post(googleAuth);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
