'use server';
import { prisma } from '@lib/prisma';

export const createDatabaseUser = async (user: {
  userId: string;
  name: string;
  email: string;
}) => {
  await prisma.user.create({
    data: {
      id: user.userId,
      name: user.name,
      email: user.email,
    },
  });
};

export const readDatabaseUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};
