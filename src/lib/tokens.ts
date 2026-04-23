import prisma from "./prisma";

export async function checkAndDeductTokens(
  userId: string,
  photoAmount: number = 0,
  videoAmount: number = 0
): Promise<boolean> {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { photoTokens: true, videoTokens: true },
    });

    if (!user || user.photoTokens < photoAmount || user.videoTokens < videoAmount) {
      return false;
    }

    await tx.user.update({
      where: { id: userId },
      data: {
        photoTokens: { decrement: photoAmount },
        videoTokens: { decrement: videoAmount },
      },
    });

    await tx.tokenTransaction.create({
      data: {
        userId,
        photoAmount: -photoAmount,
        videoAmount: -videoAmount,
        type: "USAGE",
        description: `${photoAmount} fotoğraf, ${videoAmount} video token kullanıldi`,
      },
    });

    return true;
  });
}

export async function addTokens(
  userId: string,
  photoAmount: number = 0,
  videoAmount: number = 0,
  type: string,
  description: string
): Promise<void> {
  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: {
        photoTokens: { increment: photoAmount },
        videoTokens: { increment: videoAmount },
      },
    });

    await tx.tokenTransaction.create({
      data: {
        userId,
        photoAmount,
        videoAmount,
        type,
        description,
      },
    });
  });
}

export async function getTokenBalance(userId: string): Promise<{ photoTokens: number; videoTokens: number }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { photoTokens: true, videoTokens: true },
  });
  return {
    photoTokens: user?.photoTokens ?? 0,
    videoTokens: user?.videoTokens ?? 0,
  };
}

export async function getTokenHistory(userId: string, page: number = 1, pageSize: number = 20) {
  const [transactions, total] = await Promise.all([
    prisma.tokenTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.tokenTransaction.count({ where: { userId } }),
  ]);

  return {
    transactions,
    total,
    pages: Math.ceil(total / pageSize),
    currentPage: page,
  };
}
