import Auth from "../models/Authmodal.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
const JWT_SECRET = "lallulalkepakode23";

export const signup = async (req, res, next) => {
  const { email, password } = req.body;
  // const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new Auth({ email, password });
  try {
    let user = await Auth.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await Auth.create({
      password: secPass,
      email: req.body.email,
    });

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET);
    const success = true;
    console.log(authtoken);

    res.json({ success, authtoken });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("An error occurred");
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Try valid email and password" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Try with valid credentials" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET);
    const success = true;
    res.json({ success, authtoken });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("An error occurred");
  }
};

