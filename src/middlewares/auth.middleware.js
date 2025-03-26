import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import { errorResponse } from "../utils/responseHelper.js";
import jwt from "jsonwebtoken";
 
export const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return errorResponse(res, "Unauthorized request", 401, "user not found");
    }
    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, "Unauthorized request", 401, error.message);
  }
};
