import express from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";

const router = express.Router();

const users = [
  { id: 1, email: "test@example.com", password: bcrypt.hashSync("password123", 10) },
];


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Incorrect e-mail or password!" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect e-mail or password!" });
  }


  const token = generateToken(user);
  res.json({ token });
});

export default router;
