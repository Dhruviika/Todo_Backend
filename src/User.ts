import { PrismaClient } from "@prisma/client";
import express from "express";

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
router.post("/", async (req, res) => {
  const { firstName, username, password } = req.body;

  const user = await prisma.user.create({
    data: {
      username,
      password,
      firstName,
    },
  });
  res.send({ user: user, message: "User created" });
});

//user login
router.get("/", async (req, res) => {
  const { username, password } = req.query;

  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).send("Invalid query parameters");
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
      password,
    },
    select: {
      id: true,
      firstName: true,
    },
  });

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.json(user);
});

//get user by id
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
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
    return res.status(404).send("User not found");
  }
  res.json(user);
});

export default router;
