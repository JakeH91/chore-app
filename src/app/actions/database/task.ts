'use server';
import { getSession } from '@auth0/nextjs-auth0';
import { prisma } from '@lib/prisma';
import { CompletionDetails, Household, Task } from '@prisma/client';
import { addDays } from '@app/utils';
import { redirect } from 'next/navigation';

export const createTask = async (formData: FormData) => {
  const session = await getSession();
  let createdTask: Task;
  let isRepeating: boolean;

  if (session && session.user) {
    const taskData = Object.fromEntries(formData);
    isRepeating = taskData.repeating === 'true';
    const task: Omit<Task, 'id' | 'userId'> = {
      name: taskData.name ? String(taskData.name) : null,
      dueDate: isRepeating
        ? null
        : taskData.dueDate && String(taskData.dueDate).length > 0
        ? new Date(String(taskData.dueDate))
        : null,
      repeating: isRepeating,
      householdId: String(taskData.access) === 'self' ? null : +taskData.access,
      parentId: taskData.parentId ? +taskData.parentId : null,
      frequency: isRepeating && taskData.frequency ? +taskData.frequency : null,
    };

    createdTask = await prisma.task.create({
      data: {
        name: task.name,
        dueDate: task.dueDate,
        repeating: task.repeating,
        frequency: task.frequency,
        householdId: task.householdId,
        parentId: task.parentId,
        userId: session.user.sub,
      },
    });
  } else {
    throw new Error('Must be logged in to create task');
  }

  redirect(`${isRepeating ? '/chores/' : '/projects/'}${createdTask.id}`);
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
        dueDate: task.dueDate
          ? task.dueDate
          : task.repeating
          ? nextDueDate
          : null,
      };
    })
    .sort((taskA, taskB) => {
      if (!taskA.dueDate) return -1;
      if (!taskB.dueDate) return -1;
      if (new Date(taskA.dueDate) < new Date(taskB.dueDate)) return -1;
      else if (new Date(taskA.dueDate) > new Date(taskB.dueDate)) return 1;
      else return 0;
    });
};

export const readTasks = async (households?: Household[]) => {
  const session = await getSession();

  if (session && session.user) {
    const householdIds = households?.map((household) => household.id);
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { userId: session.user.sub },
          { householdId: { in: householdIds } },
        ],
        NOT: {
          AND: [
            { frequency: null },
            {
              NOT: {
                completionDetails: {
                  none: {},
                },
              },
            },
          ],
        },
      },
      include: {
        completionDetails: true,
        parentTask: true,
      },
    });

    return formatTasks(tasks);
  } else {
    throw new Error('Must be logged in to read tasks');
  }
};

export const readChores = async (households?: Household[]) => {
  const session = await getSession();

  if (session && session.user) {
    const householdIds = households?.map((household) => household.id);
    const tasks = await prisma.task.findMany({
      where: {
        repeating: true,
        OR: [
          { userId: session.user.sub },
          { householdId: { in: householdIds } },
        ],
      },
      include: {
        completionDetails: true,
      },
    });

    return formatTasks(tasks);
  } else {
    throw new Error('Must be logged in to read chores');
  }
};

export const readProjects = async (households?: Household[]) => {
  const session = await getSession();

  if (session && session.user) {
    const householdIds = households?.map((household) => household.id);
    const tasks = await prisma.task.findMany({
      where: {
        repeating: false,
        parentId: null,
        OR: [
          { userId: session.user.sub },
          { householdId: { in: householdIds } },
        ],
        completionDetails: {
          none: {},
        },
      },
      include: {
        completionDetails: true,
        subtasks: {
          where: {
            completionDetails: {
              none: {},
            },
          },
        },
      },
    });

    return formatTasks(tasks);
  } else {
    throw new Error('Must be logged in to read projects');
  }
};

export type FormTask = {
  id: string;
  name: string | null;
  dueDate: string | null;
  repeating: string;
  parentId: string | null;
  access: string;
  frequency: string | null;
  householdId: string | null;
};

export const updateTask = async (
  task: Partial<Task> & { access?: string | number | null }
) => {
  const session = await getSession();

  if (session && session.user) {
    const isRepeating = Boolean(task.repeating);
    const formattedTask: Omit<Task, 'userId'> = {
      id: task.id!,
      name: task.name ? String(task.name) : null,
      dueDate: isRepeating
        ? null
        : task.dueDate && String(task.dueDate).length > 0
        ? new Date(String(task.dueDate))
        : null,
      repeating: isRepeating,
      householdId: task.access
        ? String(task.access) === 'self'
          ? null
          : +task.access
        : null,
      parentId: task.parentId ? +task.parentId : null,
      frequency: isRepeating && task.frequency ? +task.frequency : null,
    };
    return await prisma.task.update({
      where: {
        id: formattedTask.id,
      },
      data: {
        name: formattedTask.name,
        dueDate: formattedTask.dueDate,
        repeating: formattedTask.repeating,
        frequency: formattedTask.frequency,
        householdId: formattedTask.householdId,
        parentId: formattedTask.parentId,
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
