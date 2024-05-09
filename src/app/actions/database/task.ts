'use server';
import { prisma } from '@lib/prisma';

type Task = {
  name: string;
  dueDate?: Date;
  repeating: boolean;
  frequency?: number;
};

export const createTask = async (userId: string, formData: FormData) => {
  const taskData = Object.fromEntries(formData);
  const isRepeating = Boolean(taskData.repeating);
  const task: Task = {
    name: String(taskData.name),
    dueDate: isRepeating
      ? undefined
      : String(taskData.dueDate).length > 0
      ? new Date(String(taskData.dueDate))
      : undefined,
    repeating: isRepeating,
    frequency: isRepeating ? +taskData.frequency : undefined,
  };

  await prisma.task.create({
    data: {
      name: task.name,
      dueDate: task.dueDate,
      repeating: task.repeating,
      frequency: task.frequency,
      userId,
    },
  });
};
