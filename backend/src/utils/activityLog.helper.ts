import { prisma } from "../lib/prisma.js";

export const logActivity = async (
  userId: string,
  action: string,
  ipAddress?: string,
  userAgent?: string,
) => {
  await prisma.activityLog.create({
    data: {
      userId,
      action,
      ipAddress,
      userAgent,
    },
  });
};
