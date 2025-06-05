import jwt from "jsonwebtoken";
import "dotenv/config";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
   
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token." });
  }
}
