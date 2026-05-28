import { prisma } from "../prisma";

export const UserService = {
  async getUser(id) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        accounts: true,
      }
    });
  },

  async addCredits(userId, credits) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        credits: {
          increment: credits
        }
      }
    });
  },

  async deductCredits(userId, credits) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true }
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.credits < credits) {
      throw new Error("Insufficient credits");
    }

    return prisma.user.update({
      where: { id: userId },
      data: {
        credits: {
          decrement: credits
        }
      }
    });
  }
};
