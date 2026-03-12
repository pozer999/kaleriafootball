import Link from "next/link";
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
    return (
        <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-10 sm:px-30 '>
            <div className='container flex h-16 items-center justify-between'>
                <div className='flex items-center gap-6'>
                    <Link href='/' className='flex items-center space-x-2'>
                        <span className='text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
                            Ерина Калерия
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu className='hidden md:flex'>
                        <NavigationMenuList>
                            <NavigationMenuItem className='mr-10'>
                                <Link href='/' passHref>
                                    Главная
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href='/lessons' passHref>
                                    Уроки
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className='flex items-center gap-4'>
                    <Button variant='ghost' size='icon' className='hidden md:flex'>
                        <User className='h-5 w-5' />
                    </Button>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger className='md:hidden'>
                            <div>
                                <Menu className='h-5 w-5' />
                            </div>
                        </SheetTrigger>
                        <SheetContent>
                            <div className='flex flex-col gap-4 mt-8 ml-10'>
                                <Link href='/' className='text-lg font-medium'>
                                    Главная
                                </Link>
                                <Link href='/lessons' className='text-lg font-medium'>
                                    Уроки
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
