'use server';
import { getSession } from '@auth0/nextjs-auth0';
import { prisma } from '@lib/prisma';

type Task = {
  name: string;
  dueDate?: Date;
  repeating: boolean;
  frequency?: number;
};

export const createTask = async (formData: FormData) => {
  const session = await getSession();

  if (session && session.user) {
    const taskData = Object.fromEntries(formData);
    const isRepeating = taskData.repeating === 'true';
    const task: Task = {
      name: String(taskData.name),
      dueDate: isRepeating
        ? undefined
        : String(taskData.dueDate).length > 0
        ? new Date(String(taskData.dueDate))
        : undefined,
      repeating: isRepeating,
      frequency:
        isRepeating && taskData.frequency ? +taskData.frequency : undefined,
    };

    return await prisma.task.create({
      data: {
        name: task.name,
        dueDate: task.dueDate,
        repeating: task.repeating,
        frequency: task.frequency,
        userId: session.user.sub,
      },
    });
  } else {
    throw new Error('Must be logged in to create task');
  }
};

export const readTask = async (taskId: number) => {
  const session = await getSession();

  if (session && session.user) {
    const tasks = await prisma.task.findUnique({
      where: {
        id: taskId,
        userId: session.user.sub,
      },
    });

    return tasks;
  } else {
    throw new Error('Must be logged in to read task');
  }
};

const organiseTasks = (tasks: Task[]) => {
  return tasks.map((task) => {
    return {
      ...task,
    };
  });
};

export const readTasks = async () => {
  const session = await getSession();

  if (session && session.user) {
    const tasks = await prisma.task.findMany({
      where: {
        userId: session.user.sub,
      },
    });

    return tasks;
  } else {
    throw new Error('Must be logged in to read tasks');
  }
};

export const updateTask = async (taskId: number, formData: FormData) => {
  const session = await getSession();

  if (session && session.user) {
    const taskData = Object.fromEntries(formData);
    const isRepeating = taskData.repeating === 'true';
    const task: Task = {
      name: String(taskData.name),
      dueDate: isRepeating
        ? undefined
        : String(taskData.dueDate).length > 0
        ? new Date(String(taskData.dueDate))
        : undefined,
      repeating: isRepeating,
      frequency:
        isRepeating && taskData.frequency ? +taskData.frequency : undefined,
    };

    return await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        name: task.name,
        dueDate: task.dueDate,
        repeating: task.repeating,
        frequency: task.frequency,
        userId: session.user.sub,
      },
    });
  } else {
    throw new Error('Must be logged in to update task');
  }
};
