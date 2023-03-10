import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Verify from "../models/Verification.js";
import { sendEmailConfirmation } from "../mail/index.js";

export const signup = async (req, res) => {
  const { name, email, password, backLink } = req.body;
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
    verify: false,
  });

  const verificationHash = crypto.randomBytes(48).toString("hex");
  await Verify.create({ hash: verificationHash, email });
  await sendEmailConfirmation(email, verificationHash, name, backLink);
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
    existingUser = await User.findOne({ email: email, verify: true });
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
      expiresIn: "3hr",
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

export const emailVerification = async (req, res) => {
  const { hash } = req.body;

  const emailVerification = await Verify.findOne({ hash });
  if (!emailVerification) {
    return res.status(422).json({ message: "?????????????????????????????? ????????? ???????????????????????? 1" });
  }
  const user = await User.findOne({ email: emailVerification.email });
  if (!user) {
    return res.status(422).json({ message: "?????????????????????????????? ????????? ???????????????????????? 2" });
  }
  await user.updateOne({ verify: true });
  await emailVerification.delete();
  return res.json({ message: "email verified" });
};
