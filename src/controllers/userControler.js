import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const { file } = req;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const id = crypto.randomBytes(16).toString("hex");

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hash,
    avatar: file.originalname,
    id,
  });

  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ message: user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return new Error(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Email/Passwprd" });
  }
  if (isPasswordCorrect) {
    const signData = {
      name: existingUser.name,
      id: existingUser.id,
      image: existingUser.avatar,
    };
    const token = jwt.sign(signData, process.env.JWT_SECRET_KEY || "", {
      expiresIn: "1hr",
    });
    return res.status(200).json({ token });
  }
  return res
    .status(401)
    .json({ message: "please, provide correct credentials..." });
};

export const authMe = async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization ? authorization.trim().split(" ") : [];
  const user = jwt.decode(token);
  return res.status(200).json(user);
};

// export const emailVerification = async (req, res) => {
//   const { hash } = req.body;

//   const emailVerification = await EmailVerification.findOne({ hash });

//   if (!emailVerification) {
//     return res.status(422).json({ message: "მონაცემები ვერ მოიძებნა" });
//   }

//   const email = await Email.findOne({ email: emailVerification.email });

//   if (!email) {
//     return res.status(422).json({ message: "მონაცემები ვერ მოიძებნა" });
//   }

//   await email.updateOne({ verify: true });
//   await User.findOneAndUpdate({ id: email.userId }, { confirmed: true });

//   await emailVerification.delete();

//   return res.json({ message: "email verified" });
// };
