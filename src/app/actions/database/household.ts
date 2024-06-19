'use server';
import { getSession } from '@auth0/nextjs-auth0';
import { prisma } from '@lib/prisma';

export const createHousehold = async (formData: FormData) => {
  const session = await getSession();

  if (session && session.user) {
    const householdData = Object.fromEntries(formData);
    return await prisma.household.create({
      data: {
        address: String(householdData.address),
        userId: session.user.sub,
        users: {
          connect: { id: session.user.sub },
        },
      },
    });
  } else {
    throw new Error('Must be logged in to create household');
  }
};

export const readHouseholds = async () => {
  const session = await getSession();

  if (session && session.user) {
    const household = await prisma.household.findMany({
      where: {
        users: {
          some: {
            id: session.user.sub,
          },
        },
      },
    });

    return household;
  } else {
    throw new Error('Must be logged in to read households');
  }
};

export const joinHousehold = async (formData: FormData) => {
  const session = await getSession();

  if (session && session.user) {
    const taskData = Object.fromEntries(formData);
    const joiningCode = String(taskData.joiningCode);
    const household = await prisma.household.update({
      where: {
        joiningCode,
      },
      data: {
        users: {
          connect: { id: session.user.sub },
        },
      },
    });

    return household;
  } else {
    throw new Error('Must be logged in to join household');
  }
};
