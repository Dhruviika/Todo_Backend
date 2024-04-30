import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const userId = parseInt(req.query.userId as string);
  const description = req.query.description as string;
  await prisma.todo.create({
    data: {
      userId,
      description,
    },
  });
  res.send("Todo created");
});

router.get("/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const todos = await prisma.todo.findMany({
    where: {
      userId,
    },
  });
  res.json(todos);
});

export default router;
