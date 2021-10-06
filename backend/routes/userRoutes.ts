import express, { Response, Request } from "express";
import { User } from "../interfaces/user";
import { UserModel } from "../schemas/userSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authMiddleWare } from "../middleware/middlware";
import { RequestWithUser } from "../interfaces/requestWithUser";

const SECRET = process.env.SECRET as string;
const router = express.Router();
const saltRounds = 10;

//* @desc      Register a user
//* @route     GET /api/users/register
//* @access    Public
router.post("/users/register", async (req: Request, res: Response) => {
  const { email, name, password }: User = req.body;
  try {
    const user = await UserModel.findOne({ email }).exec();
    if (user) res.status(406).json({ msg: "User already exists" });
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    const newUser = new UserModel({
      email,
      name,
      password: hashedPassword,
    });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    res.status(404).json({ msg: error });
    process.exit(1);
  }
});

//* @desc      Login a user
//* @route     GET /api/users/login
//* @access    Public
router.post("/users/login", async (req: Request, res: Response) => {
  const { email, password }: User = req.body;
  try {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) return res.sendStatus(401).send("Invalid");
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.sendStatus(401);
    const token = await jwt.sign({ _id: user._id }, SECRET, {
      expiresIn: "1h",
    });
    res.setHeader("x-auth-token", token);

    res.send({ token: token, user });
  } catch (error) {
    res.status(401).send({ msg: "Invalid Credentials" });
    process.exit(1);
  }
});

//* @desc      Get all users
//* @route     GET /api/users
//* @access    Private
//? Inorder to get the req.user you must include the interface that includes the user
router.get(
  "/users",
  authMiddleWare,
  async (req: RequestWithUser, res: Response) => {
    try {
      const users = await UserModel.find({});
      res.send(users);
    } catch (error) {
      res.status(400).json({ msg: error });
      process.exit(1);
    }
  }
);

//* @desc      Get current users
//* @route     GET /api/users/current
//* @access    Private
router.get(
  "/users/current",
  authMiddleWare,
  async (req: RequestWithUser, res: Response) => {
    const _id = req.user._id;
    try {
      const user = await UserModel.findById(_id, { password: 0 });
      res.send(user);
    } catch (error) {
      res.status(400).json({ msg: error });
      process.exit(1);
    }
  }
);
export default router;
