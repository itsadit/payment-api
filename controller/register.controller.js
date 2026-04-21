import registerService from "../services/register.service.js";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await registerService({ name, email, phone, password });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export default registerUser;
