import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "defaultsecret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
};
