import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, Users, Sparkles, Star, Trophy, Flame, Award, Zap, Shield, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

// Функция для получения данных на сервере
async function getPopularLessons() {
    try {
        const lessons = await prisma.lesson.findMany({
            where: {
                isPublished: true,
            },
            orderBy: [{ views: "desc" }, { createdAt: "desc" }],
            take: 3,
            select: {
                id: true,
                title: true,
                description: true,
                level: true,
                duration: true,
                mainImage: true,
                views: true,
                category: true,
                createdAt: true,
            },
        });
        return lessons;
    } catch (error) {
        console.error("Error fetching popular lessons:", error);
        return [];
    }
}

// Функция для получения статистики
async function getStats() {
    try {
        const [lessonsCount, studentsCount, yearsOfExperience] = await Promise.all([
            prisma.lesson.count({ where: { isPublished: true } }),
            prisma.user.count(),
            10, // Статическое значение, можно хранить в настройках
        ]);

        return {
            lessons: lessonsCount,
            students: studentsCount,
            years: yearsOfExperience,
        };
    } catch (error) {
        console.error("Error fetching stats:", error);
        return {
            lessons: 0,
            students: 0,
            years: 10,
        };
    }
}

export default async function Home() {
    // Получаем данные на сервере
    const [popularLessons, stats] = await Promise.all([getPopularLessons(), getStats()]);

    // Маппинг уровней для отображения
    const levelMap = {
        BEGINNER: { label: "Начинающий", color: "from-green-500 to-emerald-500" },
        INTERMEDIATE: { label: "Средний", color: "from-yellow-500 to-orange-500" },
        ADVANCED: { label: "Продвинутый", color: "from-red-500 to-rose-500" },
    };

    const categoryMap = {
        FOOTBALL: "⚽ Футбол",
        FITNESS: "💪 Фитнес",
        STRETCHING: "🧘 Растяжка",
        GAMES: "🎮 Игры",
    };

    return (
        <div className='min-h-screen bg-gradient-to-b from-background via-background to-secondary/5'>
            <Header />

            <main className='overflow-hidden'>
                <HeroSection />
                <AdvantagesSection />

                {/* Статистика */}
                <section className='relative py-24 px-10 sm:px-30 '>
                    <div className='absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5' />

                    <div className='container relative'>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
                            {[
                                { value: `${stats.years}+`, label: "Лет опыта", icon: Trophy },
                                { value: `${stats.students}+`, label: "Учеников", icon: Users },
                                { value: `${stats.lessons * 10}+`, label: "Тренировок", icon: Flame },
                                { value: `${stats.lessons}+`, label: "Уроков", icon: Award },
                            ].map((stat, idx) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={idx} className='text-center group'>
                                        <div className='relative inline-block'>
                                            <div className='absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-500' />
                                            <div className='relative w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300'>
                                                <Icon className='w-8 h-8 text-primary' />
                                            </div>
                                        </div>
                                        <div className='text-3xl font-bold mb-1 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                                            {stat.value}
                                        </div>
                                        <div className='text-sm text-muted-foreground'>{stat.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Популярные уроки */}
                <section className='py-24 bg-secondary/5 px-10 sm:px-30 '>
                    <div className='container'>
                        <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12'>
                            <div className='space-y-4'>
                                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20'>
                                    <Sparkles className='w-4 h-4 text-primary' />
                                    <span className='text-sm font-medium text-primary'>Популярные уроки</span>
                                </div>
                                <h2 className='text-4xl font-bold'>
                                    Самые{" "}
                                    <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>востребованные</span>{" "}
                                    тренировки
                                </h2>
                                <p className='text-lg text-muted-foreground max-w-2xl'>
                                    Выберите урок, который подходит именно вам. Начинающие и профессионалы найдут здесь что-то полезное.
                                </p>
                            </div>
                            <Button variant='outline' size='lg' className='group' asChild>
                                <Link href='/lessons' className='flex items-center justify-center gap-2'>
                                    Все уроки
                                    <ChevronRight className='ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform' />
                                </Link>
                            </Button>
                        </div>

                        <div className='grid md:grid-cols-3 gap-6'>
                            {popularLessons.length > 0
                                ? popularLessons.map((lesson) => (
                                      <Card
                                          key={lesson.id}
                                          className='group overflow-hidden border-0 bg-background/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2'
                                      >
                                          <div className='relative h-56 overflow-hidden'>
                                              <div className='absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10' />
                                              {lesson.mainImage ? (
                                                  <Image
                                                      src={lesson.mainImage}
                                                      alt={lesson.title}
                                                      fill
                                                      className='object-cover group-hover:scale-110 transition-transform duration-700'
                                                  />
                                              ) : (
                                                  <div className='w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center'>
                                                      <span className='text-4xl'>⚽</span>
                                                  </div>
                                              )}
                                              <div
                                                  className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-gradient-to-r ${levelMap[lesson.level].color} text-white text-sm font-medium`}
                                              >
                                                  {levelMap[lesson.level].label}
                                              </div>
                                          </div>
                                          <CardHeader>
                                              <div className='flex items-center gap-2 mb-2'>
                                                  <span className='text-sm text-muted-foreground'>{categoryMap[lesson.category]}</span>
                                              </div>
                                              <CardTitle className='text-2xl'>{lesson.title}</CardTitle>
                                              <CardDescription className='text-base line-clamp-2'>{lesson.description}</CardDescription>
                                          </CardHeader>
                                          <CardContent>
                                              <div className='flex items-center justify-between text-sm'>
                                                  <div className='flex items-center gap-2'>
                                                      <Clock className='w-4 h-4 text-muted-foreground' />
                                                      <span>{lesson.duration || "45"} мин</span>
                                                  </div>
                                                  <div className='flex items-center gap-2'>
                                                      <Users className='w-4 h-4 text-muted-foreground' />
                                                      <span>{lesson.views} просмотров</span>
                                                  </div>
                                              </div>
                                              <Button className='w-full mt-6 group' variant='secondary' asChild>
                                                  <Link href={`/lessons/${lesson.id}`} className='flex items-center justify-center gap-2'>
                                                      Начать урок
                                                      <ArrowRight className='ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform' />
                                                  </Link>
                                              </Button>
                                          </CardContent>
                                      </Card>
                                  ))
                                : // Плейсхолдеры если нет уроков
                                  [...Array(3)].map((_, idx) => (
                                      <Card key={idx} className='overflow-hidden border-0 bg-background/50 backdrop-blur-sm'>
                                          <div className='relative h-56 bg-muted animate-pulse' />
                                          <CardHeader>
                                              <div className='h-4 w-24 bg-muted rounded animate-pulse mb-2' />
                                              <div className='h-6 w-3/4 bg-muted rounded animate-pulse mb-2' />
                                              <div className='h-4 w-full bg-muted rounded animate-pulse' />
                                              <div className='h-4 w-2/3 bg-muted rounded animate-pulse mt-2' />
                                          </CardHeader>
                                      </Card>
                                  ))}
                        </div>
                    </div>
                </section>

                {/* Преимущества в цифрах */}
                <section className='py-24 px-10 sm:px-30 '>
                    <div className='container'>
                        <div className='grid lg:grid-cols-2 gap-12 items-center'>
                            <div className='space-y-8'>
                                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20'>
                                    <Zap className='w-4 h-4 text-primary' />
                                    <span className='text-sm font-medium text-primary'>Почему выбирают нас</span>
                                </div>

                                <h2 className='text-4xl font-bold'>
                                    Твой путь к{" "}
                                    <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>мастерству</span>{" "}
                                    начинается здесь
                                </h2>

                                <p className='text-lg text-muted-foreground'>
                                    Индивидуальный подход, современная методика и поддержка на каждом этапе помогут тебе достичь любых целей в
                                    футболе.
                                </p>

                                <div className='space-y-4'>
                                    {[
                                        "Индивидуальный план тренировок",
                                        "Видео-анализ техники",
                                        "Поддержка 24/7 в чате",
                                        "Доступ к закрытым вебинарам",
                                    ].map((feature, idx) => (
                                        <div key={idx} className='flex items-center gap-3'>
                                            <div className='w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center'>
                                                <Star className='w-4 h-4 text-primary fill-primary' />
                                            </div>
                                            <span className='text-lg'>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button size='lg' className='group' asChild>
                                    <Link href='/lessons' className='flex items-center justify-center gap-2'>
                                        Начать бесплатно
                                        <ArrowRight className='ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform' />
                                    </Link>
                                </Button>
                            </div>

                            <div className='relative'>
                                <div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl' />
                                <div className='relative grid grid-cols-2 gap-4'>
                                    {[
                                        { value: "98%", label: "Довольных учеников" },
                                        { value: "24/7", label: "Поддержка" },
                                        { value: "5+", label: "Уровней сложности" },
                                        { value: "100%", label: "Практики" },
                                    ].map((stat, idx) => (
                                        <Card key={idx} className='border-0 bg-background/50 backdrop-blur-sm text-center p-6'>
                                            <div className='text-3xl font-bold text-primary mb-2'>{stat.value}</div>
                                            <div className='text-sm text-muted-foreground'>{stat.label}</div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Отзывы */}
                <section className='py-24 bg-gradient-to-b from-secondary/5 to-background px-10 sm:px-30 '>
                    <div className='container'>
                        <div className='text-center max-w-3xl mx-auto mb-12'>
                            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6'>
                                <Heart className='w-4 h-4 text-primary' />
                                <span className='text-sm font-medium text-primary'>Отзывы учеников</span>
                            </div>
                            <h2 className='text-4xl font-bold mb-4'>
                                Что говорят{" "}
                                <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>наши ученики</span>
                            </h2>
                        </div>

                        <div className='grid md:grid-cols-3 gap-6'>
                            {[
                                {
                                    name: "Александр Петров",
                                    role: "Начинающий",
                                    text: "За 3 месяца научился тому, что не мог освоить за 2 года самостоятельных тренировок. Огромное спасибо!",
                                    rating: 5,
                                    avatar: "👨",
                                },
                                {
                                    name: "Дмитрий Соколов",
                                    role: "Любитель",
                                    text: "Отличные тренировки, понятные объяснения. Теперь играю в основе своей команды.",
                                    rating: 5,
                                    avatar: "👨‍🦰",
                                },
                                {
                                    name: "Михаил Волков",
                                    role: "Продвинутый",
                                    text: "Профессиональный подход, внимание к деталям. Результат виден после каждого занятия.",
                                    rating: 5,
                                    avatar: "👨‍🦱",
                                },
                            ].map((review, idx) => (
                                <Card
                                    key={idx}
                                    className='relative overflow-hidden border-0 bg-background/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500'
                                >
                                    <div className='absolute top-0 right-0 text-8xl opacity-5 select-none'>"</div>
                                    <CardHeader>
                                        <div className='flex items-center gap-4 mb-2'>
                                            <div className='w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl'>
                                                {review.avatar}
                                            </div>
                                            <div>
                                                <CardTitle className='text-lg'>{review.name}</CardTitle>
                                                <CardDescription>{review.role}</CardDescription>
                                            </div>
                                        </div>
                                        <div className='flex gap-1'>
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className='w-4 h-4 fill-yellow-500 text-yellow-500' />
                                            ))}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className='text-muted-foreground italic'>"{review.text}"</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className='relative py-32 px-10 sm:px-30 '>
                    <div className='absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-secondary' />
                    <div className='absolute inset-0 opacity-10'>
                        <div className='absolute top-0 left-0 w-full h-full' />
                    </div>

                    <div className='container relative'>
                        <div className='max-w-4xl mx-auto text-center'>
                            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8'>
                                <Flame className='w-4 h-4 text-white' />
                                <span className='text-sm font-medium text-white'>Начни прямо сейчас</span>
                            </div>

                            <h2 className='text-5xl md:text-6xl font-bold text-white mb-6'>
                                Готов начать свой{" "}
                                <span className='relative whitespace-nowrap'>
                                    путь?
                                    <span className='absolute -bottom-2 left-0 w-full h-1 bg-white/30 rounded-full' />
                                </span>
                            </h2>

                            <p className='text-xl text-white/90 mb-12 max-w-2xl mx-auto'>
                                Присоединяйся к тысячам учеников, которые уже улучшили свои навыки и достигли новых высот в футболе.
                            </p>

                            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                                <Button size='lg' variant='secondary' className='group text-lg px-8 py-6 h-auto' asChild>
                                    <Link href='/lessons' className='flex items-center justify-center gap-2'>
                                        Начать бесплатно
                                        <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
                                    </Link>
                                </Button>

                                <Button
                                    size='lg'
                                    variant='outline'
                                    className='group text-lg px-8 py-6 h-auto bg-transparent text-white border-white/30 hover:bg-white/10'
                                    asChild
                                >
                                    <Link href='/about' className='flex items-center justify-center gap-2'>
                                        Узнать больше
                                        <ChevronRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
                                    </Link>
                                </Button>
                            </div>

                            <div className='flex items-center justify-center gap-8 mt-12 text-white/60'>
                                <div className='flex items-center gap-2'>
                                    <Shield className='w-4 h-4' />
                                    <span className='text-sm'>Безопасно</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Zap className='w-4 h-4' />
                                    <span className='text-sm'>Эффективно</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Heart className='w-4 h-4' />
                                    <span className='text-sm'>С любовью</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className='border-t bg-gradient-to-b from-background to-secondary/5 px-10 sm:px-30 '>
                <div className='container py-12'>
                    <div className='grid md:grid-cols-4 gap-8 mb-8'>
                        <div className='space-y-4'>
                            <div className='flex items-center space-x-2'>
                                <span className='text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                                    Ерина Калерия
                                </span>
                            </div>
                            <p className='text-sm text-muted-foreground'>Профессиональный тренер по футболу с {stats.years}-летним опытом работы.</p>
                            <div className='flex gap-4'>
                                {["facebook", "instagram", "youtube", "telegram"].map((social) => (
                                    <Button key={social} variant='ghost' size='icon' className='rounded-full' asChild>
                                        <Link href='#'>
                                            <span className='sr-only'>{social}</span>
                                            <div className='w-5 h-5 bg-muted-foreground/30 rounded-full' />
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className='font-semibold mb-4'>Навигация</h4>
                            <ul className='space-y-2 text-sm text-muted-foreground'>
                                <li>
                                    <Link href='/' className='hover:text-primary transition-colors'>
                                        Главная
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/lessons' className='hover:text-primary transition-colors'>
                                        Уроки
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/about' className='hover:text-primary transition-colors'>
                                        Обо мне
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/contacts' className='hover:text-primary transition-colors'>
                                        Контакты
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className='font-semibold mb-4'>Уроки</h4>
                            <ul className='space-y-2 text-sm text-muted-foreground'>
                                <li>
                                    <Link href='/lessons?level=beginner' className='hover:text-primary transition-colors'>
                                        Для начинающих
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/lessons?level=intermediate' className='hover:text-primary transition-colors'>
                                        Средний уровень
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/lessons?level=advanced' className='hover:text-primary transition-colors'>
                                        Продвинутые
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/lessons?category=fitness' className='hover:text-primary transition-colors'>
                                        Фитнес
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className='font-semibold mb-4'>Контакты</h4>
                            <ul className='space-y-2 text-sm text-muted-foreground'>
                                <li>📧 kaleria@football.com</li>
                                <li>📱 +7 (999) 123-45-67</li>
                                <li>📍 Воронеж, Россия</li>
                            </ul>
                        </div>
                    </div>

                    <div className='pt-8 border-t text-center text-sm text-muted-foreground'>
                        <p>© 2024 Ерина Калерия - Профессиональный тренер по футболу. Все права защищены.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
