"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { LessonFilters as Filters, Category, Level } from "../app/types";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface LessonFiltersProps {
    onFiltersChange: (filters: Filters) => void;
}

export default function LessonFilters({ onFiltersChange }: LessonFiltersProps) {
    const [filters, setFilters] = useState<Filters>({
        search: "",
        category: "ALL",
        level: "ALL",
        sortBy: "newest",
    });

    const [searchInput, setSearchInput] = useState("");

    const handleSearch = (value: string) => {
        setSearchInput(value);
        const newFilters = { ...filters, search: value };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const handleCategoryChange = (value: string | null) => {
        // Обрабатываем случай, когда value может быть null
        if (value === null) return;

        const newFilters = {
            ...filters,
            category: value as Filters["category"],
        };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const handleLevelChange = (value: string | null) => {
        // Обрабатываем случай, когда value может быть null
        if (value === null) return;

        const newFilters = {
            ...filters,
            level: value as Filters["level"],
        };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const handleSortChange = (value: string | null) => {
        // Обрабатываем случай, когда value может быть null
        if (value === null) return;

        const newFilters = {
            ...filters,
            sortBy: value as "newest" | "oldest" | "popular",
        };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const clearFilters = () => {
        const newFilters: Filters = {
            search: "",
            category: "ALL",
            level: "ALL",
            sortBy: "newest",
        };
        setFilters(newFilters);
        setSearchInput("");
        onFiltersChange(newFilters);
    };

    const hasFilters = filters.search || filters.category !== "ALL" || filters.level !== "ALL";

    return (
        <div className='space-y-4'>
            {/* Desktop Filters */}
            <div className='hidden md:flex items-center gap-4 flex-wrap'>
                <div className='relative flex-1 min-w-[300px]'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                    <Input placeholder='Поиск уроков...' value={searchInput} onChange={(e) => handleSearch(e.target.value)} className='pl-10' />
                </div>

                <Select value={filters.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Категория' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='ALL'>Все категории</SelectItem>
                        <SelectItem value='FOOTBALL'>⚽ Футбол</SelectItem>
                        <SelectItem value='FITNESS'>💪 Фитнес</SelectItem>
                        <SelectItem value='STRETCHING'>🧘 Растяжка</SelectItem>
                        <SelectItem value='GAMES'>🎮 Игры</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={filters.level} onValueChange={handleLevelChange}>
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Уровень' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='ALL'>Любой уровень</SelectItem>
                        <SelectItem value='BEGINNER'>🟢 Начинающий</SelectItem>
                        <SelectItem value='INTERMEDIATE'>🟡 Средний</SelectItem>
                        <SelectItem value='ADVANCED'>🔴 Продвинутый</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={filters.sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Сортировка' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='newest'>🆕 Сначала новые</SelectItem>
                        <SelectItem value='oldest'>📅 Сначала старые</SelectItem>
                        <SelectItem value='popular'>🔥 Популярные</SelectItem>
                    </SelectContent>
                </Select>

                {hasFilters && (
                    <Button variant='ghost' size='icon' onClick={clearFilters} title='Сбросить фильтры'>
                        <X className='h-4 w-4' />
                    </Button>
                )}
            </div>

            {/* Mobile Filters */}
            <div className='md:hidden'>
                <Sheet>
                    <SheetTrigger>
                        <Button variant='outline' className='w-full'>
                            <SlidersHorizontal className='mr-2 h-4 w-4' />
                            Фильтры и поиск
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='bottom' className='h-[80vh]'>
                        <SheetHeader>
                            <SheetTitle>Фильтры</SheetTitle>
                        </SheetHeader>
                        <div className='mt-4 space-y-4'>
                            <div className='relative'>
                                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                <Input
                                    placeholder='Поиск уроков...'
                                    value={searchInput}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className='pl-10'
                                />
                            </div>

                            <Select value={filters.category} onValueChange={handleCategoryChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Категория' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='ALL'>Все категории</SelectItem>
                                    <SelectItem value='FOOTBALL'>⚽ Футбол</SelectItem>
                                    <SelectItem value='FITNESS'>💪 Фитнес</SelectItem>
                                    <SelectItem value='STRETCHING'>🧘 Растяжка</SelectItem>
                                    <SelectItem value='GAMES'>🎮 Игры</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={filters.level} onValueChange={handleLevelChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Уровень' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='ALL'>Любой уровень</SelectItem>
                                    <SelectItem value='BEGINNER'>🟢 Начинающий</SelectItem>
                                    <SelectItem value='INTERMEDIATE'>🟡 Средний</SelectItem>
                                    <SelectItem value='ADVANCED'>🔴 Продвинутый</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={filters.sortBy} onValueChange={handleSortChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Сортировка' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='newest'>🆕 Сначала новые</SelectItem>
                                    <SelectItem value='oldest'>📅 Сначала старые</SelectItem>
                                    <SelectItem value='popular'>🔥 Популярные</SelectItem>
                                </SelectContent>
                            </Select>

                            {hasFilters && (
                                <Button variant='outline' className='w-full' onClick={clearFilters}>
                                    <X className='mr-2 h-4 w-4' />
                                    Сбросить все фильтры
                                </Button>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}
