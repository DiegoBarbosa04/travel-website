import { prisma } from "../lib/prisma.js";
import type { historyDTO } from "../schemas/history.schema.js";
import type { AuthUser } from "../types/auth.type.js";

export const addToHistoryService = ({
  user,
  searchQuery,
}: {
  user: AuthUser;
  searchQuery: historyDTO;
}) => {
  if (!user) {
    throw new Error("Usuário não autenticado");
  }
  prisma.searchHistory.create({
    data: {
      userId: user.id,
      adults: searchQuery.adults,
      departureDate: searchQuery.departureDate,
      destination: searchQuery.destination,
      origin: searchQuery.origin,
    },
  });
};

export const getHistoryService = (user: AuthUser) => {
  if (!user) {
    throw new Error("Usuário não autenticado");
  }
  const history = prisma.searchHistory.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
};
