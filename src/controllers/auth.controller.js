import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRED_IN, JWT_SECRET } from "../config/env.js";
import { successResponse } from "../utils/responseHelper.js";

export const register = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User Already exists!");
      error.statusCode = 409;
      throw error;
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      [{ name, email, password: hashPassword }],
      { session }
    );

    const token = jwt.sign(
      {
        userId: newUser[0]._id,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRED_IN,
      }
    );
    await session.commitTransaction();
    session.endSession();

    return successResponse(
      res,
      { token, user: newUser[0] },
      "User Created Successfully",
      201
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    if (!user) {
      const error = new Error("User not Found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRED_IN,
    });

    return successResponse(res, { token, user }, "Login Successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return successResponse(res, {}, "Logout Successfully", 200);
  } catch (error) {
    next(error);
  }
};
