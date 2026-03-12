import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Brain, Heart, Users, Footprints, Shield, Sparkles } from "lucide-react";

const advantages = [
    {
        title: "Индивидуальный подход в каждой группе",
        description:
            "Я не использую шаблоны. Конечно, есть общая программа, но я вижу каждого игрока. Кому-то нужно подтянуть дриблинг, кому-то — левую ногу, а кому-то — уверенность в себе.",
        icon: Target,
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "Развитие «футбольного интеллекта»",
        description:
            "Мало просто уметь бить по мячу. Я учу думать на поле на шаг вперед. Мои тренировки построены так, чтобы игрок понимал, куда открыться, когда отдать пас, а когда пойти в обводку.",
        icon: Brain,
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "Функциональная готовность без «сухой» муштры",
        description:
            "Физика важна, но я не сторонник изматывающих кроссов. Все физические нагрузки интегрированы в работу с мячом. Мы развиваем выносливость через игровые упражнения.",
        icon: Heart,
        color: "from-red-500 to-orange-500",
    },
    {
        title: "Атмосфера здоровой конкуренции",
        description:
            "На моих тренировках нет места скуке. Я создаю среду, где игроки учатся конкурировать, но при этом уважать партнера. Мы постоянно играем в двусторонки, мини-турниры.",
        icon: Users,
        color: "from-green-500 to-emerald-500",
    },
    {
        title: "Работа над «слабой» ногой",
        description:
            "Я знаю, как много голов теряется из-за того, что футболист не работает с 'чужой' ногой. На каждой тренировке мы уделяем особое внимание технике и исправляем ошибки.",
        icon: Footprints,
        color: "from-yellow-500 to-amber-500",
    },
    {
        title: "Психологическая устойчивость и лидерство",
        description:
            "Футбол — это игра ошибок. Я учу не бояться их совершать. Мы моделируем стрессовые ситуации, чтобы игроки учились сохранять холодную голову в ключевой момент.",
        icon: Shield,
        color: "from-indigo-500 to-purple-500",
    },
];

export default function AdvantagesSection() {
    return (
        <section className='py-20 bg-secondary/20 px-10 sm:px-30 '>
            <div className='container'>
                <div className='text-center space-y-4 mb-12'>
                    <Badge variant='outline' className='px-4 py-1 text-sm'>
                        Преимущества
                    </Badge>
                    <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>В чем преимущества моих тренировок</h2>
                    <p className='text-muted-foreground max-w-[800px] mx-auto'>
                        Каждое занятие построено так, чтобы максимально раскрыть потенциал каждого ученика
                    </p>
                </div>

                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {advantages.map((advantage, index) => {
                        const Icon = advantage.icon;
                        return (
                            <Card key={index} className='group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1'>
                                <div
                                    className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br ${advantage.color}`}
                                />
                                <CardHeader>
                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${advantage.color} p-2.5 mb-4`}>
                                        <Icon className='w-full h-full text-white' />
                                    </div>
                                    <CardTitle className='text-xl'>{advantage.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className='text-base'>{advantage.description}</CardDescription>
                                </CardContent>
                                <div
                                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${advantage.color} scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}
                                />
                            </Card>
                        );
                    })}
                </div>

                <div className='mt-12 text-center'>
                    <Badge variant='secondary' className='px-6 py-2 text-base'>
                        <Sparkles className='w-4 h-4 mr-2' />
                        Готовлю не просто игроков, а лидеров как на поле, так и вне его
                    </Badge>
                </div>
            </div>
        </section>
    );
}
