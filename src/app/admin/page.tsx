"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    Plus,
    Edit,
    Trash2,
    Save,
    X,
    Image as ImageIcon,
    Video,
    Tag,
    Clock,
    Eye,
    EyeOff,
    Search,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Upload,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

// Типы
interface GalleryImage {
    id?: string;
    url: string;
    caption?: string;
    sortOrder?: number;
}

interface Lesson {
    id: string;
    title: string;
    description: string | null;
    content: string | null;
    category: "FOOTBALL" | "FITNESS" | "STRETCHING" | "GAMES";
    level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    duration: number | null;
    mainImage: string | null;
    videoUrl: string | null;
    tags: string[];
    isPublished: boolean;
    views: number;
    likes: number;
    createdAt: string;
    gallery: GalleryImage[];
    author?: {
        name: string | null;
        email: string;
    };
}

const categoryOptions = [
    { value: "FOOTBALL", label: "⚽ Футбол", color: "from-blue-500 to-cyan-500" },
    { value: "FITNESS", label: "💪 Фитнес", color: "from-green-500 to-emerald-500" },
    { value: "STRETCHING", label: "🧘 Растяжка", color: "from-purple-500 to-pink-500" },
    { value: "GAMES", label: "🎮 Игры", color: "from-orange-500 to-red-500" },
];

const levelOptions = [
    { value: "BEGINNER", label: "🟢 Начинающий", color: "from-green-500 to-emerald-500" },
    { value: "INTERMEDIATE", label: "🟡 Средний", color: "from-yellow-500 to-orange-500" },
    { value: "ADVANCED", label: "🔴 Продвинутый", color: "from-red-500 to-rose-500" },
];

export default function AdminPage() {
    const router = useRouter();
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [lessonToDelete, setLessonToDelete] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterPublished, setFilterPublished] = useState<"all" | "published" | "draft">("all");
    const [filterCategory, setFilterCategory] = useState<string | null>("all");

    const itemsPerPage = 10;

    // Форма для редактирования
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        description: "",
        content: "",
        category: "FOOTBALL" as Lesson["category"],
        level: "BEGINNER" as Lesson["level"],
        duration: "",
        mainImage: "",
        videoUrl: "",
        tags: "",
        isPublished: false,
        gallery: [] as GalleryImage[],
    });

    // Загрузка уроков
    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/lessons");
            const data = await res.json();
            setLessons(data);
        } catch (error) {
            console.error("Error fetching lessons:", error);
        } finally {
            setLoading(false);
        }
    };

    // Фильтрация уроков
    const filteredLessons = lessons.filter((lesson) => {
        const matchesSearch =
            lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || lesson.description?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesPublished = filterPublished === "all" ? true : filterPublished === "published" ? lesson.isPublished : !lesson.isPublished;

        const matchesCategory = filterCategory === "all" ? true : lesson.category === filterCategory;

        return matchesSearch && matchesPublished && matchesCategory;
    });

    // Пагинация
    const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);
    const paginatedLessons = filteredLessons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Открыть форму создания
    const handleCreate = () => {
        setSelectedLesson(null);
        setFormData({
            id: "",
            title: "",
            description: "",
            content: "",
            category: "FOOTBALL",
            level: "BEGINNER",
            duration: "",
            mainImage: "",
            videoUrl: "",
            tags: "",
            isPublished: false,
            gallery: [],
        });
        setIsDialogOpen(true);
    };

    // Открыть форму редактирования
    const handleEdit = (lesson: Lesson) => {
        setSelectedLesson(lesson);
        setFormData({
            id: lesson.id,
            title: lesson.title,
            description: lesson.description || "",
            content: lesson.content || "",
            category: lesson.category,
            level: lesson.level,
            duration: lesson.duration?.toString() || "",
            mainImage: lesson.mainImage || "",
            videoUrl: lesson.videoUrl || "",
            tags: lesson.tags.join(", "),
            isPublished: lesson.isPublished,
            gallery: lesson.gallery || [],
        });
        setIsDialogOpen(true);
    };

    // Сохранить урок
    const handleSave = async () => {
        try {
            setSaving(true);

            const payload = {
                ...formData,
                tags: formData.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter((t) => t),
                duration: formData.duration ? parseInt(formData.duration) : null,
            };

            const url = "/api/admin/lessons";
            const method = formData.id ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setIsDialogOpen(false);
                fetchLessons();
            }
        } catch (error) {
            console.error("Error saving lesson:", error);
        } finally {
            setSaving(false);
        }
    };

    // Удалить урок
    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/lessons?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setDeleteDialogOpen(false);
                setLessonToDelete(null);
                fetchLessons();
            }
        } catch (error) {
            console.error("Error deleting lesson:", error);
        }
    };

    // Добавить изображение в галерею
    const addGalleryImage = () => {
        setFormData({
            ...formData,
            gallery: [...formData.gallery, { url: "", caption: "" }],
        });
    };

    // Обновить изображение в галерее
    const updateGalleryImage = (index: number, field: keyof GalleryImage, value: string) => {
        const newGallery = [...formData.gallery];
        newGallery[index] = { ...newGallery[index], [field]: value };
        setFormData({ ...formData, gallery: newGallery });
    };

    // Удалить изображение из галереи
    const removeGalleryImage = (index: number) => {
        setFormData({
            ...formData,
            gallery: formData.gallery.filter((_, i) => i !== index),
        });
    };

    return (
        <div className='min-h-screen bg-gradient-to-b from-background to-secondary/5'>
            <Header />

            <main className='container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
                    <div>
                        <h1 className='text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>Админ-панель</h1>
                        <p className='text-muted-foreground mt-2'>Управление уроками: создание, редактирование и удаление</p>
                    </div>

                    <Button size='lg' onClick={handleCreate} className='group'>
                        <Plus className='mr-2 h-4 w-4 group-hover:rotate-90 transition-transform' />
                        Создать урок
                    </Button>
                </div>

                {/* Фильтры */}
                <Card className='mb-8 border-0 bg-background/50 backdrop-blur-sm'>
                    <CardContent className='p-6'>
                        <div className='grid md:grid-cols-4 gap-4'>
                            <div className='relative'>
                                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                <Input
                                    placeholder='Поиск уроков...'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className='pl-10'
                                />
                            </div>

                            <Select value={filterPublished} onValueChange={(v) => setFilterPublished(v as any)}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Статус' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='all'>Все уроки</SelectItem>
                                    <SelectItem value='published'>Опубликованные</SelectItem>
                                    <SelectItem value='draft'>Черновики</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={filterCategory} onValueChange={setFilterCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Категория' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='all'>Все категории</SelectItem>
                                    {categoryOptions.map((cat) => (
                                        <SelectItem key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button
                                variant='outline'
                                onClick={() => {
                                    setSearchTerm("");
                                    setFilterPublished("all");
                                    setFilterCategory("all");
                                }}
                            >
                                Сбросить фильтры
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Список уроков */}
                {loading ? (
                    <div className='flex justify-center items-center py-20'>
                        <Loader2 className='h-8 w-8 animate-spin text-primary' />
                    </div>
                ) : (
                    <>
                        <div className='grid gap-4'>
                            {paginatedLessons.map((lesson) => (
                                <Card key={lesson.id} className='border-0 bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all'>
                                    <CardContent className='p-6'>
                                        <div className='flex flex-col md:flex-row gap-4 items-start md:items-center'>
                                            {/* Превью */}
                                            <div className='w-full md:w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex-shrink-0'>
                                                {lesson.mainImage ? (
                                                    <Image
                                                        src={lesson.mainImage}
                                                        alt={lesson.title}
                                                        width={96}
                                                        height={96}
                                                        className='object-cover w-full h-full'
                                                    />
                                                ) : (
                                                    <div className='w-full h-full flex items-center justify-center'>
                                                        <ImageIcon className='h-8 w-8 text-muted-foreground/30' />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Информация */}
                                            <div className='flex-1 min-w-0'>
                                                <div className='flex items-center gap-2 mb-2'>
                                                    <Badge
                                                        className={`bg-gradient-to-r ${
                                                            categoryOptions.find((c) => c.value === lesson.category)?.color
                                                        } text-white`}
                                                    >
                                                        {categoryOptions.find((c) => c.value === lesson.category)?.label}
                                                    </Badge>
                                                    <Badge
                                                        className={`bg-gradient-to-r ${
                                                            levelOptions.find((l) => l.value === lesson.level)?.color
                                                        } text-white`}
                                                    >
                                                        {levelOptions.find((l) => l.value === lesson.level)?.label}
                                                    </Badge>
                                                    {lesson.isPublished ? (
                                                        <Badge variant='outline' className='border-green-500 text-green-500'>
                                                            <Eye className='h-3 w-3 mr-1' />
                                                            Опубликовано
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant='outline' className='border-yellow-500 text-yellow-500'>
                                                            <EyeOff className='h-3 w-3 mr-1' />
                                                            Черновик
                                                        </Badge>
                                                    )}
                                                </div>

                                                <h3 className='text-lg font-semibold truncate'>{lesson.title}</h3>
                                                <p className='text-sm text-muted-foreground line-clamp-1'>{lesson.description || "Нет описания"}</p>

                                                <div className='flex items-center gap-4 mt-2 text-xs text-muted-foreground'>
                                                    <span className='flex items-center gap-1'>
                                                        <Clock className='h-3 w-3' />
                                                        {lesson.duration || "45"} мин
                                                    </span>
                                                    <span className='flex items-center gap-1'>
                                                        <Eye className='h-3 w-3' />
                                                        {lesson.views} просмотров
                                                    </span>
                                                    <span>{new Date(lesson.createdAt).toLocaleDateString("ru-RU")}</span>
                                                </div>
                                            </div>

                                            {/* Действия */}
                                            <div className='flex gap-2 w-full md:w-auto'>
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    onClick={() => handleEdit(lesson)}
                                                    className='flex-1 md:flex-initial'
                                                >
                                                    <Edit className='h-4 w-4 md:mr-2' />
                                                    <span className='md:inline'>Редактировать</span>
                                                </Button>
                                                <Button
                                                    variant='destructive'
                                                    size='sm'
                                                    onClick={() => {
                                                        setLessonToDelete(lesson.id);
                                                        setDeleteDialogOpen(true);
                                                    }}
                                                    className='flex-1 md:flex-initial'
                                                >
                                                    <Trash2 className='h-4 w-4 md:mr-2' />
                                                    <span className='md:inline'>Удалить</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Пагинация */}
                        {totalPages > 1 && (
                            <div className='flex justify-center items-center gap-2 mt-8'>
                                <Button
                                    variant='outline'
                                    size='icon'
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className='h-4 w-4' />
                                </Button>

                                {[...Array(totalPages)].map((_, i) => (
                                    <Button
                                        key={i}
                                        variant={currentPage === i + 1 ? "default" : "outline"}
                                        size='icon'
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </Button>
                                ))}

                                <Button
                                    variant='outline'
                                    size='icon'
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight className='h-4 w-4' />
                                </Button>
                            </div>
                        )}
                    </>
                )}

                {/* Диалог создания/редактирования */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
                        <DialogHeader>
                            <DialogTitle className='text-2xl'>{selectedLesson ? "Редактировать урок" : "Создать новый урок"}</DialogTitle>
                            <DialogDescription>Заполните информацию об уроке. Все поля отмеченные * обязательны.</DialogDescription>
                        </DialogHeader>

                        <Tabs defaultValue='main' className='mt-4'>
                            <TabsList className='grid w-full grid-cols-4'>
                                <TabsTrigger value='main'>Основное</TabsTrigger>
                                <TabsTrigger value='media'>Медиа</TabsTrigger>
                                <TabsTrigger value='gallery'>Галерея</TabsTrigger>
                                <TabsTrigger value='settings'>Настройки</TabsTrigger>
                            </TabsList>

                            <TabsContent value='main' className='space-y-4 mt-4'>
                                <div className='space-y-2'>
                                    <Label htmlFor='title'>Название *</Label>
                                    <Input
                                        id='title'
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder='Введите название урока'
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor='description'>Описание</Label>
                                    <Textarea
                                        id='description'
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder='Краткое описание урока'
                                        rows={3}
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor='content'>Содержание</Label>
                                    <Textarea
                                        id='content'
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        placeholder='Полное содержание урока'
                                        rows={6}
                                    />
                                </div>

                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='space-y-2'>
                                        <Label>Категория *</Label>
                                        <Select value={formData.category} onValueChange={(v: any) => setFormData({ ...formData, category: v })}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categoryOptions.map((cat) => (
                                                    <SelectItem key={cat.value} value={cat.value}>
                                                        {cat.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className='space-y-2'>
                                        <Label>Уровень *</Label>
                                        <Select value={formData.level} onValueChange={(v: any) => setFormData({ ...formData, level: v })}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {levelOptions.map((level) => (
                                                    <SelectItem key={level.value} value={level.value}>
                                                        {level.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='space-y-2'>
                                        <Label htmlFor='duration'>Длительность (минут)</Label>
                                        <Input
                                            id='duration'
                                            type='number'
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            placeholder='45'
                                        />
                                    </div>

                                    <div className='space-y-2'>
                                        <Label htmlFor='tags'>Теги (через запятую)</Label>
                                        <Input
                                            id='tags'
                                            value={formData.tags}
                                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                            placeholder='футбол, техника, дриблинг'
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value='media' className='space-y-4 mt-4'>
                                <div className='space-y-2'>
                                    <Label htmlFor='mainImage'>Главное изображение (URL)</Label>
                                    <Input
                                        id='mainImage'
                                        value={formData.mainImage}
                                        onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                                        placeholder='https://example.com/image.jpg'
                                    />
                                    {formData.mainImage && (
                                        <div className='relative w-full h-48 rounded-lg overflow-hidden mt-2'>
                                            <Image src={formData.mainImage} alt='Preview' fill className='object-cover' />
                                        </div>
                                    )}
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor='videoUrl'>Видео (URL)</Label>
                                    <Input
                                        id='videoUrl'
                                        value={formData.videoUrl}
                                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                        placeholder='https://youtube.com/...'
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value='gallery' className='space-y-4 mt-4'>
                                <div className='flex justify-between items-center'>
                                    <Label>Галерея изображений</Label>
                                    <Button size='sm' onClick={addGalleryImage} variant='outline'>
                                        <Plus className='h-4 w-4 mr-2' />
                                        Добавить фото
                                    </Button>
                                </div>

                                <div className='space-y-4'>
                                    {formData.gallery.map((img, index) => (
                                        <Card key={index} className='border'>
                                            <CardContent className='p-4'>
                                                <div className='flex gap-4'>
                                                    {img.url && (
                                                        <div className='relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0'>
                                                            <Image src={img.url} alt={img.caption || "Gallery"} fill className='object-cover' />
                                                        </div>
                                                    )}
                                                    <div className='flex-1 space-y-2'>
                                                        <Input
                                                            placeholder='URL изображения'
                                                            value={img.url}
                                                            onChange={(e) => updateGalleryImage(index, "url", e.target.value)}
                                                        />
                                                        <Input
                                                            placeholder='Подпись (необязательно)'
                                                            value={img.caption || ""}
                                                            onChange={(e) => updateGalleryImage(index, "caption", e.target.value)}
                                                        />
                                                    </div>
                                                    <Button
                                                        variant='ghost'
                                                        size='icon'
                                                        onClick={() => removeGalleryImage(index)}
                                                        className='text-destructive'
                                                    >
                                                        <X className='h-4 w-4' />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}

                                    {formData.gallery.length === 0 && (
                                        <div className='text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg'>
                                            <ImageIcon className='h-8 w-8 mx-auto mb-2 opacity-50' />
                                            <p>Нет изображений в галерее</p>
                                            <p className='text-sm'>Нажмите "Добавить фото" чтобы начать</p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value='settings' className='space-y-4 mt-4'>
                                <div className='flex items-center justify-between'>
                                    <div className='space-y-0.5'>
                                        <Label htmlFor='published'>Опубликовать урок</Label>
                                        <p className='text-sm text-muted-foreground'>Черновики видны только в админ-панели</p>
                                    </div>
                                    <Switch
                                        id='published'
                                        checked={formData.isPublished}
                                        onCheckedChange={(checked: boolean) => setFormData({ ...formData, isPublished: checked })}
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>

                        <DialogFooter className='mt-6'>
                            <Button variant='outline' onClick={() => setIsDialogOpen(false)}>
                                Отмена
                            </Button>
                            <Button onClick={handleSave} disabled={saving || !formData.title}>
                                {saving && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                                {selectedLesson ? "Сохранить изменения" : "Создать урок"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Диалог подтверждения удаления */}
                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Удалить урок?</DialogTitle>
                            <DialogDescription>Это действие нельзя отменить. Урок будет навсегда удален из базы данных.</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant='outline' onClick={() => setDeleteDialogOpen(false)}>
                                Отмена
                            </Button>
                            <Button variant='destructive' onClick={() => lessonToDelete && handleDelete(lessonToDelete)}>
                                Удалить
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </main>
        </div>
    );
}
