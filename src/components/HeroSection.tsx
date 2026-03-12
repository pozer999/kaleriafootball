import { Button } from '@/components/ui/button'
import { ArrowRight, Trophy, Heart, Users } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-20 lg:py-32">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      
      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Ерина Калерия
              </h1>
              <p className="text-xl text-muted-foreground">
                Учитель физической культуры
              </p>
              <p className="text-lg text-primary font-medium">
                ⚽ Спорт - моя жизнь
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-[600px]">
              Я - учитель физической культуры, рада приветствовать вас на своем сайте. 
              Здесь вы сможете найти полезную информацию по футболу.
            </p>
            
            <p className="text-muted-foreground">
              Родители и учащиеся смогут найти ответы на часто задаваемые вопросы 
              о требованиях и оценивании на уроках футбола, а также советы по футболу 
              и укреплению здоровья. 💪
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg">
                <Link href="/lessons">
                  Смотреть уроки
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Обо мне
              </Button>
            </div>

            <div className="flex gap-8 pt-8">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-sm">10+ лет опыта</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm">500+ учеников</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                <span className="text-sm">Любовь к спорту</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
              <div className="relative h-full w-full rounded-xl bg-background/50 backdrop-blur-sm p-8 flex items-center justify-center">
                <span className="text-8xl">⚽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}