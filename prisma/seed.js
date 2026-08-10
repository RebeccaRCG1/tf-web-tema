// prisma/seed.js
// Popula o banco com dados fictícios coerentes com o domínio da galeria de desenhos.
// Ordem de criação respeita as chaves estrangeiras: Categoria e Admin antes de Desenho.

require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Categorias (pai de Desenho)
  const pingpong = await prisma.categoria.create({
    data: {
      nome: "Ping-Pong",
      descricao: "Desenhos de Ping Pong",
    },
  });

  const retrato = await prisma.categoria.create({
    data: {
      nome: "Retrato",
      descricao: "Desenhos com foco em rostos e expressões do Prof Arthur.",
    },
  });

  const basquete = await prisma.categoria.create({
    data: {
      nome: "Basquete",
      descricao: "Jogadores, Arthur no auge, Esporte",
    },
  });

  // 2. Admin (independente, sem FK)
  const senhaHash = await bcrypt.hash("senha123", 10);

  await prisma.admin.create({
    data: {
      nome: "Gustavo Barbosa",
      email: "sucogelado123@gmail.com", // falso :)
      senhaHash,
      fotoUrl: "https://example.com",
    },
  });

  // Desenhos (dependem de Categoria via categoriaId)
  await prisma.desenho.createMany({
    data: [
      {
        texto: "Jogador de ping-pong",
        fotoUrl: "https://example.com",
        categoriaId: pingpong.id,
      },
      {
        texto: null, // exemplo de desenho sem explicação escrita
        fotoUrl: "https://example.com",
        categoriaId: basquete.id,
      },
      {
        texto: "Estudo de expressão facial em grafite.",
        fotoUrl: "https://example.com",
        categoriaId: retrato.id,
      },
      {
        texto: "Retrato em aquarela de Arthur sorrindo.",
        fotoUrl: "https://example.com",
        categoriaId: retrato.id,
      },
      {
        texto: "M.Jordan tomando sorverte com Arthur.",
        fotoUrl: "https://example.com",
        categoriaId: basquete.id,
      },
    ],
  });

  console.log("Seed concluído com sucesso.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });