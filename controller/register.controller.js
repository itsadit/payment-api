import registerService from "../services/register.service.js";

const registerUser = async (req, res, next) => {
  try {
    const user = await registerService(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export default registerUser;
