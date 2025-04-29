import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

export const {
  PORT,
  SERVER_URL,
  CLIENT_URL,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRED_IN,
  MY_EMAIL,
  MY_EMAIL_PASSWORD,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env;
