import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/forget-password", forgotPassword);
authRouter.post("/reset-Password/:resetToken", resetPassword);
authRouter.post("/change-password", changePassword);

export default authRouter;
