import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { username, password, firstName } = req.body;
  await prisma.user.create({
    data: {
      username,
      password,
      firstName,
    },
  });
  res.send("User created");
});

router.get("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username,
      password,
    },
    select: {
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
  res.json(user);
});

async function updateUser(username: string, firstName: string) {
  const res = await prisma.user.update({
    where: { username },
    data: {
      firstName,
    },
  });
  console.log(res);
}

export default router;
