"use client";

import { useState } from "react";
import Header from "@/components/Header";
import LessonFilters from "@/components/LessonFilters";
import LessonsGrid from "@/components/LessonsGrid";
import { LessonFilters as Filters } from "../types";

export default function LessonsPage() {
    const [filters, setFilters] = useState<Filters>({
        search: "",
        category: "ALL",
        level: "ALL",
        sortBy: "newest",
    });

    return (
        <div className='min-h-screen bg-background px-10 sm:px-30 '>
            <Header />
            <main className='container py-8'>
                <div className='mb-8'>
                    <h1 className='text-4xl font-bold mb-2'>Уроки</h1>
                    <p className='text-muted-foreground'>Здесь вы найдете все уроки по футболу, фитнесу и развитию</p>
                </div>

                <div className='mb-8'>
                    <LessonFilters onFiltersChange={setFilters} />
                </div>

                <LessonsGrid filters={filters} />
            </main>

            <footer className='border-t py-8 mt-20'>
                <div className='container text-center text-muted-foreground'>
                    <p>© 2024 Ерина Калерия - Учитель физической культуры</p>
                </div>
            </footer>
        </div>
    );
}
