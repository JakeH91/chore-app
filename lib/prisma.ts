import { PrismaClient } from '@prisma/client';

//See reference:
//https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
