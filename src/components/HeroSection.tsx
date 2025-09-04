import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

// بيانات مناطق أسيوط
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

  const handleAddApartment = () => {
    navigate('/dashboard'); // أو صفحة إضافة شقة إذا كانت موجودة
  };

  return (
    <section
      className="relative min-h-[600px] flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay أسود مع شفافية أعلى */}
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
        <div className="space-y-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            اعثر على <span className="text-primary">سكنك المثالي</span> في أسيوط
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8">
            ابحث عن أفضل شقق الطلاب في أسيوط بسهولة وأمان.
          </p>
          <Card className="p-6 shadow-lg bg-white/90">
            <CardContent className="space-y-4 p-0">
              <div className="grid md:grid-cols-3 gap-4">
                {/* مربع البحث */}
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="ابحث عن شقق..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-12 h-12 text-right"
                  />
                </div>
                {/* اختيار المنطقة */}
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
                {/* اختيار السعر */}
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
              <div className="flex gap-3 mt-4">
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
          {/* أزرار CTA في المنتصف */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button size="lg" className="h-14 text-base px-8" onClick={handleSearch}>
              ابدأ البحث
            </Button>
            <Button variant="outline" size="lg" className="h-14 text-base px-8" onClick={handleAddApartment}>
              أضف شقتك
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;