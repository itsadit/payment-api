import loginService from "../services/login.service.js";

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and Password are required" });
    }
    const loginResult = await loginService({ email, password });
    res
      .status(200)
      .json({ success: true, message: "Login Successful", data: loginResult });
  } catch (error) {
    next(error);
  }
};

export default loginUser;
