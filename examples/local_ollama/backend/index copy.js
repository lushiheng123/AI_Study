// backend/index.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import prisma from "./lib/prisma.js";

dotenv.config();

const app = express();

// 配置 CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 挂载 auth 路由
app.use("/api/auth", authRoutes);

// 实现 /api/protected 路由
// backend/index.js
app.get("/api/protected", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("No token found in cookies");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Token decoded successfully:", decoded);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, username: true },
    });

    if (!user) {
      console.log("User not found for ID:", decoded.id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User verified:", user);
    res.json({
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(403).json({ message: "Invalid token" });
  }
});

app.listen(5051, () => console.log("Server is running on 5051"));
