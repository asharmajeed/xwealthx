import express from "express";
import {
  deleteUserById,
  getAllUsers,
  googleAuth,
  logoutUser,
  updateUserById,
} from "../controllers/userController.js";
import { authorizeAdmin, verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/google").post(googleAuth);
router.route("/logout").post(verifyJWT, logoutUser);

// ADMIN ROUTES
router.route("/all-users").get(verifyJWT, authorizeAdmin, getAllUsers);
router
  .route("/:id")
  .delete(verifyJWT, authorizeAdmin, deleteUserById)
  .put(verifyJWT, authorizeAdmin, updateUserById);

export default router;
