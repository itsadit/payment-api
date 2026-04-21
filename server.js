import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import registerRoutes from "./routes/register.auth.js";
import loginRoutes from "./routes/login.auth.js";
import errorHandler from "./middlewares/error.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

await connectDB();

app.use("/api/auth", registerRoutes);
app.use("/api/auth", loginRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ message: "hey its working" });
});

app.listen(PORT, () => {
  console.log(`🚀 server is running on ${PORT}`);
});
