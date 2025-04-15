import { MY_EMAIL, MY_EMAIL_PASSWORD } from "../config/env";

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
