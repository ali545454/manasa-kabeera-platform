import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, Heart, MessageCircle, Settings, LogOut, Building, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn] = useState(false); // This would come from auth context
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const navigationItems = [
    { href: '/', label: 'الرئيسية', icon: Home },
    { href: '/search', label: 'البحث', icon: Search },
    { href: '/contact', label: 'تواصل معنا', icon: MessageCircle },
  ];

  const userMenuItems = [
    { href: '/profile', label: 'الملف الشخصي', icon: User },
    { href: '/favorites', label: 'المفضلة', icon: Heart },
    { href: '/messages', label: 'الرسائل', icon: MessageCircle },
    { href: '/dashboard', label: 'لوحة التحكم', icon: Building },
    { href: '/settings', label: 'الإعدادات', icon: Settings },
  ];

  const NavigationContent = () => (
    <nav className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <Building className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary">سكن الطلاب</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <NavigationContent />
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-sm mx-8">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ابحث عن شقق..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 text-right"
            />
          </form>
        </div>

        {/* Auth Buttons / User Menu */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost">تسجيل الدخول</Button>
              </Link>
              <Link to="/signup">
                <Button>إنشاء حساب</Button>
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>أم</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1 text-right">
                    <p className="text-sm font-medium leading-none">أحمد محمد</p>
                    <p className="text-xs leading-none text-muted-foreground">ahmed@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userMenuItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link to={item.href} className="flex items-center gap-2 w-full">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="h-4 w-4 ml-2" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 mt-6">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="ابحث عن شقق..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 text-right"
                  />
                </form>

                {/* Mobile Navigation */}
                <NavigationContent />

                {/* Mobile Auth */}
                {!isLoggedIn ? (
                  <div className="flex flex-col gap-2">
                    <Link to="/login">
                      <Button variant="ghost" className="w-full justify-start">
                        تسجيل الدخول
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="w-full">إنشاء حساب</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {userMenuItems.map((item) => (
                      <Link key={item.href} to={item.href}>
                        <Button variant="ghost" className="w-full justify-start gap-2">
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Button>
                      </Link>
                    ))}
                    <Button variant="ghost" className="w-full justify-start gap-2 text-destructive">
                      <LogOut className="h-4 w-4" />
                      تسجيل الخروج
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;