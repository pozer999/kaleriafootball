import "dotenv/config";

import { Category, Level } from "@/app/types";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { prisma } from "@/lib/prisma";

async function main() {
    // Создаем тестового пользователя
    const user = await prisma.user.upsert({
        where: { email: "kaleria@football.com" },
        update: {},
        create: {
            email: "kaleria@football.com",
            name: "Ерина Калерия",
            role: "ADMIN",
        },
    });

    // Создаем тестовые уроки
    const lessons = [
        {
            title: "Основы дриблинга для начинающих",
            description: "Научись контролировать мяч и обыгрывать соперников с помощью простых упражнений",
            content: "В этом уроке мы разберем базовые элементы дриблинга...",
            category: "FOOTBALL" as Category,
            level: "BEGINNER" as Level,
            duration: 45,
            mainImage: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000",
            tags: ["дриблинг", "техника", "для начинающих"],
            isPublished: true,
            authorId: user.id,
        },
        {
            title: "Как правильно бить по мячу",
            description: "Изучаем технику удара: щечкой, подъемом, шведкой",
            content: "Правильная техника удара - основа футбола...",
            category: "FOOTBALL" as Category,
            level: "BEGINNER" as Level,
            duration: 30,
            mainImage: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1000",
            tags: ["удар", "техника", "обучение"],
            isPublished: true,
            authorId: user.id,
        },
        {
            title: "Тактика игры в защите",
            description: "Как правильно выбирать позицию и перехватывать мяч",
            content: "Защита - это искусство...",
            category: "FOOTBALL" as Category,
            level: "INTERMEDIATE" as Level,
            duration: 60,
            mainImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1000",
            tags: ["тактика", "защита", "позиционирование"],
            isPublished: true,
            authorId: user.id,
        },
    ];

    for (const lesson of lessons) {
        await prisma.lesson.create({
            data: lesson,
        });
    }

    console.log("Database seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
