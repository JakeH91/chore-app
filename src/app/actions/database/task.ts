'use server';
import { getSession } from '@auth0/nextjs-auth0';
import { prisma } from '@lib/prisma';
import { CompletionDetails, Task } from '@prisma/client';
import { addDays } from '@app/utils';

export const createTask = async (formData: FormData) => {
  const session = await getSession();

  if (session && session.user) {
    const taskData = Object.fromEntries(formData);
    const isRepeating = taskData.repeating === 'true';
    const task: Omit<Task, 'id' | 'userId'> = {
      name: String(taskData.name),
      dueDate: isRepeating
        ? null
        : String(taskData.dueDate).length > 0
        ? new Date(String(taskData.dueDate))
        : null,
      repeating: isRepeating,
      frequency: isRepeating && taskData.frequency ? +taskData.frequency : null,
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
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
        userId: session.user.sub,
      },
    });

    return task;
  } else {
    throw new Error('Must be logged in to read task');
  }
};

const formatTasks = (
  tasks: (Task & { completionDetails?: CompletionDetails[] })[]
): (Task & { completionDetails?: CompletionDetails[] })[] => {
  return tasks
    .map((task) => {
      const completionDetails = task.completionDetails;
      const lastCompleted = completionDetails?.sort((detailsA, detailsB) => {
        if (new Date(detailsB.date) < new Date(detailsA.date)) return -1;
        else if (new Date(detailsB.date) > new Date(detailsA.date)) return 1;
        else return 0;
      })[0];
      const nextDueDate = lastCompleted?.date
        ? addDays(lastCompleted!.date, task.frequency)
        : addDays(new Date(), task.frequency);
      return {
        ...task,
        dueDate: task.dueDate ? task.dueDate : nextDueDate,
      };
    })
    .sort((taskA, taskB) => {
      if (new Date(taskA.dueDate) < new Date(taskB.dueDate)) return -1;
      else if (new Date(taskA.dueDate) > new Date(taskB.dueDate)) return 1;
      else return 0;
    });
};

export const readTasks = async () => {
  const session = await getSession();

  if (session && session.user) {
    const tasks = await prisma.task.findMany({
      where: {
        userId: session.user.sub,
      },
      include: {
        completionDetails: true,
      },
    });

    return formatTasks(tasks);
  } else {
    throw new Error('Must be logged in to read tasks');
  }
};

export const updateTask = async (taskId: number, formData: FormData) => {
  const session = await getSession();

  if (session && session.user) {
    const taskData = Object.fromEntries(formData);
    const isRepeating = taskData.repeating === 'true';
    const task: Omit<Task, 'id' | 'userId'> = {
      name: String(taskData.name),
      dueDate: isRepeating
        ? null
        : String(taskData.dueDate).length > 0
        ? new Date(String(taskData.dueDate))
        : null,
      repeating: isRepeating,
      frequency: isRepeating && taskData.frequency ? +taskData.frequency : null,
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

export const completeTask = async (taskId: number) => {
  const session = await getSession();

  if (session && session.user) {
    return await prisma.completionDetails.create({
      data: {
        date: new Date(),
        taskId,
        users: {
          connect: { id: session.user.sub },
        },
      },
    });
  } else {
    throw new Error('Must be logged in to complete task');
  }
};
