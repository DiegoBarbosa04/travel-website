import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import bcrypt from "bcrypt";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const users = [
  {
    firstName: "Ana",
    lastName: "Souza",
    email: "ana.souza@example.com",
  },
  {
    firstName: "Carlos",
    lastName: "Menezes",
    email: "carlos.menezes@example.com",
  },
  {
    firstName: "Beatriz",
    lastName: "Almeida",
    email: "beatriz.almeida@example.com",
  },
  {
    firstName: "Eduardo",
    lastName: "Pereira",
    email: "eduardo.pereira@example.com",
  },
  {
    firstName: "Mariana",
    lastName: "Costa",
    email: "mariana.costa@example.com",
  },
  {
    firstName: "Rafael",
    lastName: "Silva",
    email: "rafael.silva@example.com",
  },
];

const reviews = [
  {
    email: "ana.souza@example.com",
    text: "Experiência incrível! Atendimento rápido e destino maravilhoso.",
    rating: 5,
  },
  {
    email: "carlos.menezes@example.com",
    text: "Ótimo custo-benefício e suporte atencioso durante toda a reserva.",
    rating: 4,
  },
  {
    email: "beatriz.almeida@example.com",
    text: "Viagem perfeita com excelente orientação em cada etapa.",
    rating: 5,
  },
  {
    email: "eduardo.pereira@example.com",
    text: "O passeio superou as expectativas e o serviço foi muito gentil.",
    rating: 4,
  },
  {
    email: "mariana.costa@example.com",
    text: "Destino lindo e organização impecável do início ao fim.",
    rating: 5,
  },
  {
    email: "rafael.silva@example.com",
    text: "Boa experiência no geral, mas a reserva poderia ser mais ágil.",
    rating: 3,
  },
  {
    email: "ana.souza@example.com",
    text: "Já é a segunda vez que viajo com eles, sempre excelente.",
    rating: 5,
  },
  {
    email: "carlos.menezes@example.com",
    text: "Preços justos e atendimento cordial. Recomendo!",
    rating: 4,
  },
];

async function main() {
  const password = await bcrypt.hash("senha123", 10);

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        ...user,
        password,
      },
    });
  }

  const createdUsers = await prisma.user.findMany({
    where: { email: { in: users.map((user) => user.email) } },
    select: { id: true, email: true },
  });

  const userIdByEmail = new Map(
    createdUsers.map((user) => [user.email, user.id]),
  );

  await prisma.review.deleteMany({
    where: { userId: { in: createdUsers.map((user) => user.id) } },
  });

  for (const review of reviews) {
    const userId = userIdByEmail.get(review.email);
    if (!userId) continue;

    await prisma.review.create({
      data: {
        text: review.text,
        rating: review.rating,
        userId,
      },
    });
  }

  console.log("Seed concluído com sucesso");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });