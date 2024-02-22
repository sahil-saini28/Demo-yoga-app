import express from "express";
// import Auth from '../models/Authmodal';
import { signup, signin } from "../controllers/Authcontroller.js";

const router = express.Router();
import jwt from "jsonwebtoken";
const JWT_SECRET = "lallulalkepakode23";

router.post("/singup", signup);

router.post("/signin", signin);

export default router;
