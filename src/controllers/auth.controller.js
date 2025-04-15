import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import {
  CLIENT_URL,
  JWT_EXPIRED_IN,
  JWT_SECRET,
  MY_EMAIL,
  MY_EMAIL_PASSWORD,
} from "../config/env.js";
import { successResponse } from "../utils/responseHelper.js";
import { EmailPasswordResetTemplate } from "../utils/EmailTemplate.js";
import { createTransporter } from "../utils/EmailTransporter.js";

export const register = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = new Error("Name, email, and password are required");
      error.statusCode = 400;
      throw error;
    }
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
      "User register successfully!",
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

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
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

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      const error = new Error("Email is required");
      error.statusCode = 400;
      throw error;
    }
    const user = await User.findOne({ email });

    if (!user) {
      logger.info(`Password reset requested for non-existent email: ${email}`);
      return successResponse(
        res,
        {},
        "If the email exists, a reset link has been sent",
        200
      );
    }

    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRED_IN,
    });

    const resetUrl = `${CLIENT_URL}/reset-password/${resetToken}`;

    const transporter = createTransporter();
    const mailOptions = {
      from: MY_EMAIL,
      to: email,
      subject: "Password Reset Request from Deepdocs",
      html: EmailPasswordResetTemplate(resetUrl),
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Password reset email sent to: ${email}`);

    return successResponse(
      res,
      {},
      "Password reset link sent to your email",
      200
    );
  } catch (error) {
    logger.error(`Error in forgotPassword: ${error.message}`);
    next(error);
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password successfully reset" });
  } catch (err) {
    // res.status(500).json({ message: "Invalid or expired token" });
    next(err);
  }
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      const error = new Error("Current password is incorrect");
      error.statusCode = 401;
      throw error;
    }

    if (await bcrypt.compare(newPassword, user.password)) {
      const error = new Error(
        "New password must be different from current password"
      );
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password successfully changed" });
  } catch (err) {
    logger.error(`Error in changePassword: ${err.message}`);
    next(err);
  }
};
