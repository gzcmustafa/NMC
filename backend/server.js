import express from "express";
import cors from "cors";
import config from "./config/dotenv.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(express.json()); 
app.use("/api/auth", authRoutes);

app.listen(config.port, () => {
  console.log(`🚀🚀 🚀  Backend is runnin on port ${config.port} 🚀 🚀 🚀 `);
});
