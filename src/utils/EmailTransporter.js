import nodemailer from "nodemailer";
import { MY_EMAIL, MY_EMAIL_PASSWORD } from "../config/env.js";

export const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MY_EMAIL,
      pass: MY_EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};
