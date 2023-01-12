import User from "../models/User.js";
import bcrypt from "bcryptjs";

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const { file } = req;
  console.log(file);
  console.log(name, email, password);
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  // const hash = bcrypt.hashSync(password);
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const user = new User({
    name,
    email,
    password: hash,
    avatar: file.originalname,
  });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ message: user });
};

export default signup;
