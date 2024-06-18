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

export const readHousehold = async (id: number) => {
  const household = await prisma.household.findUnique({
    where: {
      id,
    },
  });

  return household;
};
