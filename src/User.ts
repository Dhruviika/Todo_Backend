import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function insertUser(
  username: string,
  password: string,
  firstName: string
) {
  const user = await prisma.user.create({
    data: {
      username,
      password,
      firstName,
    },
  });
  return user;
}

export async function getUser(username: string, password: string) {
  const user = prisma.user.findUnique({
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
  return user;
}

async function updateUser(username: string, firstName: string) {
  const res = await prisma.user.update({
    where: { username },
    data: {
      firstName,
    },
  });
  console.log(res);
}
