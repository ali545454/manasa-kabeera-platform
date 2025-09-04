import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Filter, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

// Assiut neighborhoods data
const assuitNeighborhoods = [
  'الوليدية',
  'منطقة الجامعة',
  'شارع المحطة',
  'المنطقة الأولى',
  'المنطقة الثانية',
  'المنطقة الثالثة',
  'المنطقة الرابعة',
  'الأربعين',
  'المشتول',
  'الصفا',
  'الحمراء',
  'صدفا',
  'الغنايم',
  'نزلة عبد اللاه',
  'بنى محمديات',
  'ساحل سليم',
  'المراغة',
  'القوصية',
  'أبنوب',
  'الفتح',
  'ديروط',
  'منفلوط',
  'أبوتيج'
];

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchTerm) searchParams.set('q', searchTerm);
    if (selectedNeighborhood) searchParams.set('neighborhood', selectedNeighborhood);
    if (priceRange) searchParams.set('price', priceRange);
    
    navigate(`/search?${searchParams.toString()}`);
  };

  const stats = [
    { label: 'شقة متاحة', value: '500+', icon: '🏠' },
    { label: 'طالب راضي', value: '2000+', icon: '😊' },
    { label: 'تقييم متوسط', value: '4.8', icon: '⭐' },
    { label: 'مالك موثوق', value: '200+', icon: '✅' }
  ];

  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center">
      <div className="absolute inset-0 opacity-50"></div>
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8 text-center lg:text-right">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                اعثر على
                <span className="text-primary block">سكنك المثالي</span>
                في أسيوط
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                منصة موثوقة تربط الطلاب بأفضل خيارات السكن في أسيوط. 
                ابحث، قارن، واحجز بكل أمان وسهولة.
              </p>
            </div>

            {/* Search Form */}
            <Card className="p-6 shadow-lg">
              <CardContent className="space-y-4 p-0">
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="ابحث عن شقق..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-12 h-12 text-right"
                    />
                  </div>

                  {/* Neighborhood Select */}
                  <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
                    <SelectTrigger className="h-12">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="اختر المنطقة" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع المناطق</SelectItem>
                      {assuitNeighborhoods.map((neighborhood) => (
                        <SelectItem key={neighborhood} value={neighborhood}>
                          {neighborhood}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Price Range */}
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="النطاق السعري" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأسعار</SelectItem>
                      <SelectItem value="0-1000">أقل من 1000 جنيه</SelectItem>
                      <SelectItem value="1000-2000">1000 - 2000 جنيه</SelectItem>
                      <SelectItem value="2000-3000">2000 - 3000 جنيه</SelectItem>
                      <SelectItem value="3000-5000">3000 - 5000 جنيه</SelectItem>
                      <SelectItem value="5000+">أكثر من 5000 جنيه</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleSearch} className="flex-1 h-12 text-base">
                    <Search className="h-5 w-5 ml-2" />
                    ابحث الآن
                  </Button>
                  <Button variant="outline" className="h-12">
                    <Filter className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="h-14 text-base px-8">
                ابدأ البحث
              </Button>
              <Button variant="outline" size="lg" className="h-14 text-base px-8">
                أضف شقتك
              </Button>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-2 p-0">
                    <div className="text-3xl">{stat.icon}</div>
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Trust Indicators */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <CardContent className="space-y-4 p-0">
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">4.8/5</span>
                </div>
                <p className="text-center text-muted-foreground">
                  "منصة ممتازة ساعدتني في إيجاد السكن المثالي بالقرب من الجامعة. خدمة موثوقة وآمنة."
                </p>
                <p className="text-center text-sm font-medium">- أحمد محمد، طالب</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;