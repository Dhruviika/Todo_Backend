import { PrismaClient } from "@prisma/client";
import { fetchUser } from "./middlewares/fetchUser";
import express from "express";
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const router = express.Router();
const prisma = new PrismaClient();

//get all users
router.get("/all", async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      username: true,
    },
  });
  res.json(users);
});

//create new user
router.post("/signup", async (req, res) => {
  let success = false;
  const { firstName, username, password } = req.body;

  const salt = await bcrypt.genSaltSync(10);
  const secPass = await bcrypt.hashSync(password, salt);

  const user = await prisma.user.create({
    data: {
      username,
      password: secPass,
      firstName,
    },
  });

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "kay123", { expiresIn: "1h" });

  res.json({ token: token, success: true });

  // res.send({ user: user, message: "User created" });
});

//user login
router.post("/login", async (req, res) => {
  let success = false;
  const { username, password } = req.body;

  if (typeof username !== "string" || typeof password !== "string") {
    return res.json({ message: "Invalid Credentials", success });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      password: true,
    },
  });

  if (!user) {
    return res.json({ message: "User Not Found.", success });
  }

  const passCompare = await bcrypt.compare(password, user.password);
  if (!passCompare) {
    return res.json({ message: "Invalid Credentials", success });
  }

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "kay123", { expiresIn: "1h" });

  res.json({ token: token, success: true });
});

//get user by id
router.get("/me", fetchUser, async (req, res) => {
  let success = false;
  const id = req.user?.id;
  // console.log(id);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      firstName: true,
      todos: {
        select: {
          id: true,
          description: true,
          completed: true,
        },
      },
    },
  });
  if (!user) {
    return res.json({ message: "User Not Found", success });
  }
  res.json({ user, success: true });
});

export default router;
