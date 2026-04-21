import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const loginUser = async (loginData = {}) => {
  const { email, password } = loginData;
  if (!email || !password) {
    const error = new Error("Invalid login payload");
    error.statusCode = 500;
    throw error;
  }

  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 404;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashPassword);

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    token,
  };
};

export default loginUser;
