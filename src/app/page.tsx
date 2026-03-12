import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import AdvantagesSection from '@/components/AdvantagesSection'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, GraduationCap, Heart, Target, Users } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AdvantagesSection />
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/60 p-12 text-center">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Готов начать тренировки?
                </h2>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                  Присоединяйся к моим урокам и открой для себя мир футбола!
                </p>
                <Button size="lg" variant="secondary">
                  <Link href="/lessons">
                    Смотреть все уроки
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-muted-foreground">
          <p>© 2024 Ерина Калерия - Учитель физической культуры</p>
        </div>
      </footer>
    </div>
  )
}