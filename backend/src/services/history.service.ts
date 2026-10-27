import { prisma } from "../lib/prisma.js";
import type { historyDTO } from "../schemas/history.schema.js";

export const HISTORY_LIMIT = 10;

export const addToHistoryService = async ({
  userId,
  searchQuery,
}: {
  userId: string;
  searchQuery: historyDTO;
}) => {
  const departureDate = new Date(searchQuery.departureDate);

  return prisma.$transaction(async (tx) => {
    // Repetir uma busca só a move para o topo, sem duplicar a entrada.
    const existing = await tx.searchHistory.findFirst({
      where: {
        userId,
        origin: searchQuery.origin,
        destination: searchQuery.destination,
        departureDate,
        adults: searchQuery.adults,
      },
    });

    const entry = existing
      ? await tx.searchHistory.update({
          where: { id: existing.id },
          data: {
            createdAt: new Date(),
            originName: searchQuery.originName ?? existing.originName,
            destinationName:
              searchQuery.destinationName ?? existing.destinationName,
          },
        })
      : await tx.searchHistory.create({
          data: {
            userId,
            origin: searchQuery.origin,
            destination: searchQuery.destination,
            originName: searchQuery.originName ?? null,
            destinationName: searchQuery.destinationName ?? null,
            departureDate,
            adults: searchQuery.adults,
          },
        });

    // Mantém só as HISTORY_LIMIT mais recentes, descartando as mais antigas.
    const overflow = await tx.searchHistory.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip: HISTORY_LIMIT,
      select: { id: true },
    });

    if (overflow.length > 0) {
      await tx.searchHistory.deleteMany({
        where: { id: { in: overflow.map(({ id }) => id) } },
      });
    }

    return entry;
  });
};

export const getHistoryService = (userId: string) => {
  return prisma.searchHistory.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: HISTORY_LIMIT,
  });
};
