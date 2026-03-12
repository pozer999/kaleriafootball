"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Trophy, Heart, Users, Sparkles, Star, Award, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
    return (
        <section className='relative min-h-[90vh] flex items-center overflow-hidden px-10 sm:px-30 '>
            {/* Сложный градиентный фон */}
            <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5' />

            {/* Анимированные геометрические фигуры */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse' />
                <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]' />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-full blur-3xl' />
            </div>

            {/* Плавающие элементы */}
            <div className='absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-2xl rotate-12 animate-float' />
            <div className='absolute bottom-20 right-10 w-32 h-32 bg-secondary/5 rounded-full animate-float [animation-delay:2s]' />

            <div className='container relative pt-20 pb-16 lg:pt-24 lg:pb-20'>
                <div className='grid lg:grid-cols-2 gap-12 lg:gap-8 items-center'>
                    {/* Левая колонка - контент */}
                    <div className='space-y-8'>
                        {/* Бейдж с анимацией */}
                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm animate-fade-in-up'>
                            <Sparkles className='w-4 h-4 text-primary animate-pulse' />
                            <span className='text-sm font-medium text-primary'>Профессиональный тренер по футболу</span>
                        </div>

                        {/* Заголовок с градиентом */}
                        <div className='space-y-4 animate-fade-in-up [animation-delay:200ms]'>
                            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight'>
                                <span className='bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent'>
                                    Ерина Калерия
                                </span>
                            </h1>
                            <div className='flex items-center gap-3'>
                                <div className='w-12 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full' />
                                <p className='text-xl text-muted-foreground font-medium'>Учитель физической культуры</p>
                            </div>
                        </div>

                        {/* Описание с анимацией */}
                        <div className='space-y-4 text-lg animate-fade-in-up [animation-delay:400ms]'>
                            <p className='text-muted-foreground leading-relaxed'>
                                Я помогаю детям и взрослым открыть для себя удивительный мир футбола. Моя методика combines индивидуальный подход с
                                современными технологиями обучения.
                            </p>

                            <div className='flex items-center gap-2 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10'>
                                <Star className='w-5 h-5 text-primary fill-primary flex-shrink-0' />
                                <p className='text-sm text-muted-foreground'>
                                    <span className='font-semibold text-foreground'>500+ учеников</span> уже улучшили свои навыки и достигли новых
                                    высот
                                </p>
                            </div>
                        </div>

                        {/* Кнопки действий */}
                        <div className='flex flex-wrap gap-4 animate-fade-in-up [animation-delay:600ms]'>
                            <Button size='lg' className='group relative overflow-hidden'>
                                <Link href='/lessons'>
                                    <span className='relative z-10 flex items-center'>
                                        Начать обучение
                                        <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                                    </span>
                                    <div className='absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity' />
                                </Link>
                            </Button>

                            <Button size='lg' variant='outline' className='group'>
                                <Link href='/about'>
                                    Узнать больше
                                    <ChevronRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                                </Link>
                            </Button>
                        </div>

                        {/* Статистика */}
                        <div className='grid grid-cols-3 gap-6 pt-8 animate-fade-in-up [animation-delay:800ms]'>
                            {[
                                { icon: Trophy, value: "10+", label: "Лет опыта", color: "from-yellow-500 to-orange-500" },
                                { icon: Users, value: "500+", label: "Учеников", color: "from-blue-500 to-cyan-500" },
                                { icon: Heart, value: "100%", label: "Любовь к спорту", color: "from-red-500 to-pink-500" },
                            ].map((stat, idx) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={idx} className='group cursor-default'>
                                        <div className='relative'>
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`}
                                            />
                                            <div className='relative space-y-2'>
                                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} p-2`}>
                                                    <Icon className='w-full h-full text-white' />
                                                </div>
                                                <div className='text-2xl font-bold'>{stat.value}</div>
                                                <div className='text-xs text-muted-foreground'>{stat.label}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Правая колонка - визуал */}
                    <div className='relative animate-fade-in-up [animation-delay:400ms]'>
                        {/* Основной контейнер с градиентом */}
                        <div className='relative aspect-square'>
                            {/* Кольца анимации */}
                            <div className='absolute inset-0 rounded-full border-2 border-primary/20 animate-ping' />
                            <div className='absolute inset-4 rounded-full border-2 border-secondary/20 animate-ping [animation-delay:500ms]' />
                            <div className='absolute inset-8 rounded-full border-2 border-primary/10 animate-ping [animation-delay:1000ms]' />

                            {/* Основное изображение/иконка */}
                            <div className='absolute inset-12 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-secondary/20 backdrop-blur-sm overflow-hidden group hover:scale-105 transition-transform duration-500'>
                                <div className='absolute inset-0 bg-grid-pattern opacity-20' />
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <div className='relative'>
                                        <span className='text-9xl animate-bounce'>⚽</span>

                                        {/* Плавающие элементы вокруг мяча */}
                                        <div className='absolute -top-8 -right-8 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-pulse' />
                                        <div className='absolute -bottom-8 -left-8 w-20 h-20 bg-secondary/10 rounded-full blur-xl animate-pulse [animation-delay:1s]' />

                                        {/* Микро-анимации */}
                                        <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 space-y-2 text-center'>
                                            <Badge variant='secondary' className='animate-bounce shadow-lg'>
                                                ⚡ Дриблинг
                                            </Badge>
                                        </div>
                                        <div className='absolute bottom-0 right-0 translate-x-8 translate-y-8'>
                                            <Badge variant='secondary' className='animate-bounce [animation-delay:500ms] shadow-lg'>
                                                🎯 Точность
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Декоративные элементы */}
                            <div className='absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl rotate-12 opacity-20 blur-2xl' />
                            <div className='absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-secondary to-primary rounded-full opacity-20 blur-2xl' />
                        </div>

                        {/* Карточки с преимуществами */}
                        <div className='absolute -bottom-8 -left-8 max-w-[200px] bg-background/80 backdrop-blur-md rounded-xl p-4 border shadow-2xl animate-float'>
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center'>
                                    <Award className='w-5 h-5 text-green-500' />
                                </div>
                                <div>
                                    <div className='text-sm font-semibold'>Лучший тренер</div>
                                    <div className='text-xs text-muted-foreground'>2023-2024</div>
                                </div>
                            </div>
                        </div>

                        <div className='absolute -top-8 -right-8 max-w-[200px] bg-background/80 backdrop-blur-md rounded-xl p-4 border shadow-2xl animate-float [animation-delay:1s]'>
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                                    <Users className='w-5 h-5 text-primary' />
                                </div>
                                <div>
                                    <div className='text-sm font-semibold'>500+ учеников</div>
                                    <div className='text-xs text-muted-foreground'>Довольных результатом</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Добавляем ключевые кадры анимации */}
            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }
            `}</style>
        </section>
    );
}
