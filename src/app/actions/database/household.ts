'use server';
import { getSession } from '@auth0/nextjs-auth0';
import { prisma } from '@lib/prisma';
import { redirect } from 'next/navigation';

export const createHousehold = async (formData: FormData) => {
  const session = await getSession();

  if (session && session.user) {
    const householdData = Object.fromEntries(formData);
    await prisma.household.create({
      data: {
        address: String(householdData.address),
        name: String(householdData.name),
        userId: session.user.sub,
        users: {
          connect: { id: session.user.sub },
        },
      },
    });
  } else {
    throw new Error('Must be logged in to create household');
  }

  redirect('/households');
};

export const readHouseholds = async () => {
  const session = await getSession();

  if (session && session.user) {
    const households = await prisma.household.findMany({
      where: {
        users: {
          some: {
            id: session.user.sub,
          },
        },
      },
    });

    return households;
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
