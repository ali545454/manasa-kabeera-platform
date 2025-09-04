import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Home, Search, Plus, LogIn, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const pages = [
  { name: 'الرئيسية', path: '/', icon: <Home className="h-4 w-4 mr-1" /> },
  { name: 'بحث', path: '/search', icon: <Search className="h-4 w-4 mr-1" /> },
  { name: 'لوحة التحكم', path: '/dashboard', icon: <Settings className="h-4 w-4 mr-1" /> },
  { name: 'إضافة شقة', path: '/add-apartment', icon: <Plus className="h-4 w-4 mr-1" /> },
  { name: 'تعديل شقة', path: '/edit-apartment/1', icon: <Settings className="h-4 w-4 mr-1" /> },
  { name: 'حسابي', path: '/profile', icon: <User className="h-4 w-4 mr-1" /> },
  { name: 'تسجيل الدخول', path: '/login', icon: <LogIn className="h-4 w-4 mr-1" /> },
];

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn] = useState(false); // منطق تسجيل الدخول حسب السياق
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="flex items-center p-4 bg-white shadow overflow-hidden h-[90px]">
      <Link to="/" className="flex items-center">
        <img
          src="/YallaSakn.png"
          alt="yallaskn.png"
          className="w-full h-[250px] object-contain "
        />
      </Link>
      <div className="container flex h-16 items-center justify-between">
        {/* تم حذف اللوجو النصي واستبداله بالصورة */}

        {/* Search Bar - يظهر في الوسط في md وما فوق */}
        <div className="flex-1 flex justify-center">
          <form
            onSubmit={handleSearch}
            className="hidden md:flex relative w-full max-w-md"
          >
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="ابحث عن شقق..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 text-right w-full h-10 rounded-md border focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </form>
        </div>

        {/* القائمة المنسدلة في الشمال للشاشات md وما فوق */}
        <nav className="flex items-center gap-2 ml-auto">
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="xl:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {pages
                  .filter((page) => page.name !== 'تسجيل الدخول' && page.name !== 'إنشاء حساب')
                  .map((page) => (
                    <DropdownMenuItem key={page.path} asChild>
                      <Link
                        to={page.path}
                        className="flex items-center gap-2 w-full"
                      >
                        {page.icon}
                        {page.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* إظهار الروابط بشكل أفقي في xl فقط */}
          <div className="hidden xl:flex items-center gap-2">
            {pages
              .filter((page) => page.name !== 'تسجيل الدخول' && page.name !== 'إنشاء حساب')
              .map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="flex items-center px-3 py-2 rounded-md hover:bg-primary/80 transition"
                >
                  {page.icon}
                  <span>{page.name}</span>
                </Link>
              ))}
          </div>
        </nav>

        {/* User/Profile Icon & Desktop Auth */}
        <div className="flex items-center gap-4 ml-4">
          {isLoggedIn ? (
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
                {pages
                  .filter((page) => page.name !== 'تسجيل الدخول' && page.name !== 'إنشاء حساب')
                  .map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link to={item.path} className="flex items-center gap-2 w-full">
                        {item.icon}
                        {item.name}
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
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost">تسجيل الدخول</Button>
              </Link>
              <Link to="/signup">
                <Button>إنشاء حساب</Button>
              </Link>
            </div>
          )}
        </div>

        {/* قائمة جانبية للموبايل فقط */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col gap-6 mt-6">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="ابحث عن شقق..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 text-right w-full h-10 rounded-md border focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </form>

              {/* Mobile Navigation */}
              <nav className="flex flex-col">
                {pages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="flex items-center px-4 py-3 hover:bg-primary/10 transition"
                  >
                    {page.icon}
                    <span>{page.name}</span>
                  </Link>
                ))}
              </nav>

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
                  {pages
                    .filter((page) => page.name !== 'تسجيل الدخول' && page.name !== 'إنشاء حساب')
                    .map((item) => (
                      <Link key={item.path} to={item.path}>
                        <Button variant="ghost" className="w-full justify-start gap-2">
                          {item.icon}
                          {item.name}
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
    </header>
  );
};

export default Header;