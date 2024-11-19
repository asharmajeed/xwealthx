import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: "Unauthorized: Token is invalid or expired" });
  }
};
