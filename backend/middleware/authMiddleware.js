import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const verifyJWT = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: "Unauthorized: Token is invalid or expired" });
  }
};

export const authorizeAdmin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not Authorized as an Admin" });
  }
};
