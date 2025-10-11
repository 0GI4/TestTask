// prisma/seed.ts
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

async function main() {
  const ideas = [
    { title: "Тёмная тема", description: "Полноценная dark-theme интерфейса" },
    {
      title: "Мобильное приложение",
      description: "Нативные iOS/Android клиенты",
    },
    { title: "Открытый API", description: "Публичный REST/GraphQL API" },
    { title: "Экспорт в Excel", description: "Выгрузка отчётов в XLSX" },
    {
      title: "Виджеты на главной",
      description: "Кастомизируемые виджеты для дашборда",
    },
    {
      title: "SSO (SAML/OIDC)",
      description: "Единый вход и корпоративная авторизация",
    },
    { title: "Уведомления", description: "Пуши и e-mail о статусе идей" },
    {
      title: "Теги и фильтры идей",
      description: "Категоризация и быстрый поиск",
    },
    { title: "Голосовой поиск", description: "Управление и поиск по голосу" },
    {
      title: "Учебные туры (onboarding)",
      description: "Пошаговые подсказки внутри продукта",
    },
    {
      title: "Темы бренда",
      description: "Кастомные цветовые схемы для компаний",
    },
    {
      title: "Дашборд метрик",
      description: "Графики активности и вовлечённости",
    },
  ];

  for (const it of ideas) {
    await prisma.idea.upsert({
      where: { title: it.title }, // уникальность по title
      update: {}, // ничего не меняем при повторном запуске
      create: it,
    });
  }

  const list = await prisma.idea.findMany({
    orderBy: [{ createdAt: "asc" }],
    select: { id: true, title: true, votesCount: true },
  });
  console.table(list);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
