'use server';
import { prisma } from '@lib/prisma';

type Task = {
  name: string;
  dueDate: Date;
  repeating: boolean;
  frequency: number;
  userId: string;
};

export const createTask = async (task: Task) => {
  await prisma.task.create({
    data: {
      name: task.name,
      dueDate: task.dueDate,
      repeating: task.repeating,
      frequency: task.frequency,
      userId: task.userId,
    },
  });
};
