import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();
const prisma = new PrismaClient();

//create todo
router.post("/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const description = req.body.description;
  await prisma.todo.create({
    data: {
      userId,
      description,
    },
  });
  res.send("Todo created");
});

//get all todos of user
router.get("/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const todos = await prisma.todo.findMany({
    where: {
      userId,
    },
  });
  res.json(todos);
});

//update todo
router.put("/:todoId", async (req, res) => {
  const todoId = parseInt(req.params.todoId);
  const userId = parseInt(req.body.userId);
  const { description } = req.body;
  const completed = Boolean(req.body.completed);

  if (description) {
    await prisma.todo.update({
      where: {
        id: todoId,
        userId: userId,
      },
      data: {
        description,
      },
    });
  }

  if (completed !== undefined) {
    await prisma.todo.update({
      where: {
        id: todoId,
        userId: userId,
      },
      data: {
        completed: completed,
      },
    });
  }

  res.send("Todo updated");
});

//delete todo
router.delete("/:todoId", async (req, res) => {
  const todoId = parseInt(req.params.todoId);
  const userId = parseInt(req.body.userId);
  await prisma.todo.delete({
    where: {
      id: todoId,
      userId: userId,
    },
  });
  res.send("Todo deleted");
});

export default router;
