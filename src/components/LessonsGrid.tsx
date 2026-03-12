"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Eye, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Lesson, LessonFilters } from "../app/types";

interface LessonsGridProps {
    filters: LessonFilters;
}

const categoryLabels = {
    FOOTBALL: "⚽ Футбол",
    FITNESS: "💪 Фитнес",
    STRETCHING: "🧘 Растяжка",
    GAMES: "🎮 Игры",
};

const levelColors = {
    BEGINNER: "bg-green-500",
    INTERMEDIATE: "bg-yellow-500",
    ADVANCED: "bg-red-500",
};

const levelLabels = {
    BEGINNER: "Начинающий",
    INTERMEDIATE: "Средний",
    ADVANCED: "Продвинутый",
};

export default function LessonsGrid({ filters }: LessonsGridProps) {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLessons = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (filters.search) params.append("search", filters.search);
                if (filters.category && filters.category !== "ALL") params.append("category", filters.category);
                if (filters.level && filters.level !== "ALL") params.append("level", filters.level);
                if (filters.sortBy) params.append("sortBy", filters.sortBy);

                const response = await fetch(`/api/lessons?${params.toString()}`);
                const data = await response.json();
                setLessons(data);
            } catch (error) {
                console.error("Error fetching lessons:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, [filters]);

    if (loading) {
        return (
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {[...Array(6)].map((_, i) => (
                    <Card key={i} className='overflow-hidden'>
                        <Skeleton className='h-48 w-full' />
                        <CardHeader>
                            <Skeleton className='h-6 w-3/4' />
                            <Skeleton className='h-4 w-1/2' />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className='h-4 w-full' />
                            <Skeleton className='h-4 w-2/3 mt-2' />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (lessons.length === 0) {
        return (
            <div className='text-center py-12'>
                <p className='text-xl text-muted-foreground'>Уроки не найдены</p>
                <p className='text-muted-foreground'>Попробуйте изменить параметры поиска</p>
            </div>
        );
    }

    return (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {lessons.map((lesson) => (
                <Card key={lesson.id} className='group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1'>
                    <div className='relative h-48 overflow-hidden'>
                        {lesson.mainImage ? (
                            <Image
                                src={lesson.mainImage}
                                alt={lesson.title}
                                fill
                                className='object-cover group-hover:scale-105 transition-transform duration-300'
                            />
                        ) : (
                            <div className='w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center'>
                                <span className='text-4xl'>⚽</span>
                            </div>
                        )}
                        <Badge className={`absolute top-4 right-4 ${levelColors[lesson.level]}`}>{levelLabels[lesson.level]}</Badge>
                    </div>

                    <CardHeader>
                        <div className='flex items-center gap-2 mb-2'>
                            <Badge variant='outline'>{categoryLabels[lesson.category]}</Badge>
                        </div>
                        <CardTitle className='line-clamp-2'>{lesson.title}</CardTitle>
                        <CardDescription className='line-clamp-2'>{lesson.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                            <div className='flex items-center gap-1'>
                                <Calendar className='h-4 w-4' />
                                {new Date(lesson.createdAt).toLocaleDateString("ru-RU")}
                            </div>
                            <div className='flex items-center gap-1'>
                                <Eye className='h-4 w-4' />
                                {lesson.views}
                            </div>
                            {lesson.duration && (
                                <div className='flex items-center gap-1'>
                                    <Clock className='h-4 w-4' />
                                    {lesson.duration} мин
                                </div>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button className='w-full group'>
                            <Link href={`/lessons/${lesson.id}`}>
                                Смотреть урок
                                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
