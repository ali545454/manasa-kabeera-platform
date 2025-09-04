import React, { useState } from 'react';
import { Search, MapPin, Filter, Star, Heart, Users, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Mock data for apartments
  const featuredApartments = [
    {
      id: 1,
      title: 'شقة فاخرة بجوار الجامعة',
      location: 'المعادي، القاهرة',
      price: 2500,
      rating: 4.8,
      reviews: 24,
      image: '/placeholder.svg',
      features: ['واي فاي', 'مكيف', 'أمان 24/7'],
      owner: 'أحمد محمد',
      distance: '5 دقائق من الجامعة الأمريكية'
    },
    {
      id: 2,
      title: 'استوديو مفروش حديث',
      location: 'مدينة نصر، القاهرة',
      price: 1800,
      rating: 4.6,
      reviews: 18,
      image: '/placeholder.svg',
      features: ['مفروش بالكامل', 'مطبخ مجهز', 'بلكونة'],
      owner: 'فاطمة أحمد',
      distance: '10 دقائق من جامعة القاهرة'
    },
    {
      id: 3,
      title: 'غرفة مشتركة للطلاب',
      location: 'الزمالك، القاهرة',
      price: 900,
      rating: 4.4,
      reviews: 32,
      image: '/placeholder.svg',
      features: ['غرفة مشتركة', 'إنترنت عالي السرعة', 'منطقة دراسة'],
      owner: 'مريم سعد',
      distance: '3 دقائق من الجامعة الأمريكية'
    }
  ];

  const cities = ['القاهرة', 'الجيزة', 'الإسكندرية', 'المنصورة', 'أسيوط', 'طنطا'];
  const stats = [
    { icon: Building, label: 'شقة متاحة', value: '1,200+' },
    { icon: Users, label: 'طالب سعيد', value: '3,500+' },
    { icon: Star, label: 'تقييم متوسط', value: '4.7' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-hover to-secondary min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            اعثر على سكنك المثالي
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            منصة آمنة وموثوقة لإيجاد السكن الطلابي المناسب لك
          </p>
          
          {/* Search Form */}
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن السكن..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 h-12 text-right border-0 shadow-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full h-12 pr-10 pl-4 border border-input rounded-md bg-background text-right appearance-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">اختر المدينة</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              <Button variant="outline" className="h-12 gap-2">
                <Filter className="h-5 w-5" />
                فلترة متقدمة
              </Button>
              
              <Button className="h-12 bg-primary hover:bg-primary-hover">
                ابحث الآن
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Apartments */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">الشقق المميزة</h2>
            <p className="text-xl text-muted-foreground">اكتشف أفضل الخيارات المتاحة حالياً</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredApartments.map((apartment) => (
              <Card key={apartment.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={apartment.image}
                    alt={apartment.title}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 left-4 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Badge className="absolute top-4 right-4 bg-primary text-white">
                    جديد
                  </Badge>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-right">{apartment.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4" />
                        {apartment.location}
                      </CardDescription>
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-primary">
                        {apartment.price} جنيه
                      </div>
                      <div className="text-sm text-muted-foreground">شهرياً</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{apartment.rating}</span>
                    <span className="text-muted-foreground">({apartment.reviews} تقييم)</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {apartment.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-4">
                    {apartment.distance}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1">عرض التفاصيل</Button>
                    <Button variant="outline">تواصل</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              عرض جميع الشقق
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">كيف يعمل الموقع؟</h2>
            <p className="text-xl text-muted-foreground">خطوات بسيطة للعثور على سكنك المثالي</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Search className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. ابحث واستكشف</h3>
              <p className="text-muted-foreground">استخدم أدوات البحث والفلترة للعثور على الخيارات المناسبة</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-secondary/10 rounded-full flex items-center justify-center">
                <Users className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. تواصل وتفاوض</h3>
              <p className="text-muted-foreground">تواصل مع أصحاب الشقق مباشرة من خلال نظام المراسلة الآمن</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-info/10 rounded-full flex items-center justify-center">
                <Building className="h-10 w-10 text-info" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. احجز بأمان</h3>
              <p className="text-muted-foreground">ادفع التأمين عبر الموقع واستلم مفاتيح سكنك الجديد</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;