import User from "../models/user.js";
import bcrypt from "bcrypt";

const registerUser = async (userData = {}) => {
  const { name, email, phone, password } = userData;

  if (!name || !email || !phone || !password) {
    const error = new Error("All feilds are required");
    error.statusCode = 422;
    throw error;
  }

  const existingUser = await User.findOne({
    email: email.toLowerCase().trim(),
  });
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashPassword = await bcrypt.hash(password, 12);
  const user = new User({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    phone: phone.trim(),
    hashPassword,
  });

  await user.save();
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    createdAt: user.createdAt,
  };
};

export default registerUser;
