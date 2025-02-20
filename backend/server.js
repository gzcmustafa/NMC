{/*ENTRY POINT */}
import express from "express";
import cors from "cors";
import config from "./config/dotenv.js";
import authRoutes from "./routes/auth.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
}

app.use(cors(corsOptions));
app.use(express.json()); 
app.use("/api/auth", authRoutes);

app.listen(config.port, () => {
  console.log(`🚀🚀 🚀  Backend is runnin on port ${config.port} 🚀 🚀 🚀 `);
});
  