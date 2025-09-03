import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Heart, Bath, Bed, Wifi, Car, Shield, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { assuitNeighborhoods } from '@/data/neighborhoods';

// Mock apartment data
const mockApartments = [
  {
    id: 1,
    title: 'شقة فاخرة مفروشة بالكامل',
    description: 'شقة مجهزة بالكامل في موقع مميز قريب من الجامعة',
    price: 2500,
    neighborhood: 'منطقة الجامعة',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    features: ['واي فاي', 'مفروشة', 'تكييف', 'أمان 24/7'],
    images: ['/placeholder.svg'],
    rating: 4.8,
    reviewCount: 24,
    isVerified: true,
    ownerName: 'أحمد محمد',
    ownerPhone: '01234567890',
    availableFrom: '2024-02-01'
  },
  {
    id: 2,
    title: 'استوديو حديث بالمعادي',
    description: 'استوديو مصمم بذوق رفيع مع جميع المرافق',
    price: 1800,
    neighborhood: 'الوليدية',
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    features: ['واي فاي', 'مفروشة', 'مطبخ مجهز'],
    images: ['/placeholder.svg'],
    rating: 4.6,
    reviewCount: 18,
    isVerified: true,
    ownerName: 'فاطمة أحمد',
    ownerPhone: '01234567891',
    availableFrom: '2024-01-15'
  },
  {
    id: 3,
    title: 'شقة اقتصادية للطلاب',
    description: 'شقة نظيفة وبسيطة بسعر مناسب للطلاب',
    price: 1200,
    neighborhood: 'المنطقة الثالثة',
    bedrooms: 1,
    bathrooms: 1,
    area: 60,
    features: ['نظيفة', 'قريب من المواصلات'],
    images: ['/placeholder.svg'],
    rating: 4.2,
    reviewCount: 12,
    isVerified: false,
    ownerName: 'محمد علي',
    ownerPhone: '01234567892',
    availableFrom: '2024-02-15'
  }
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [apartments, setApartments] = useState(mockApartments);
  const [filteredApartments, setFilteredApartments] = useState(mockApartments);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(searchParams.get('neighborhood') || '');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [bedrooms, setBedrooms] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  // Filter apartments based on search criteria
  useEffect(() => {
    let filtered = apartments;

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(apt => 
        apt.title.includes(searchTerm) || 
        apt.description.includes(searchTerm) ||
        apt.neighborhood.includes(searchTerm)
      );
    }

    // Neighborhood filter
    if (selectedNeighborhood) {
      filtered = filtered.filter(apt => apt.neighborhood === selectedNeighborhood);
    }

    // Price range filter
    filtered = filtered.filter(apt => 
      apt.price >= priceRange[0] && apt.price <= priceRange[1]
    );

    // Bedrooms filter
    if (bedrooms) {
      filtered = filtered.filter(apt => apt.bedrooms.toString() === bedrooms);
    }

    // Verified only filter
    if (showVerifiedOnly) {
      filtered = filtered.filter(apt => apt.isVerified);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // newest - no sorting needed for mock data
        break;
    }

    setFilteredApartments(filtered);
  }, [searchTerm, selectedNeighborhood, priceRange, bedrooms, sortBy, showVerifiedOnly, apartments]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (selectedNeighborhood) params.set('neighborhood', selectedNeighborhood);
    setSearchParams(params);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">النطاق السعري</h3>
        <div className="space-y-3">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={5000}
            min={0}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{priceRange[0]} جنيه</span>
            <span>{priceRange[1]} جنيه</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">المنطقة</h3>
        <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
          <SelectTrigger>
            <SelectValue placeholder="اختر المنطقة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">جميع المناطق</SelectItem>
            {assuitNeighborhoods.map((neighborhood) => (
              <SelectItem key={neighborhood.id} value={neighborhood.name}>
                {neighborhood.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-3">عدد الغرف</h3>
        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger>
            <SelectValue placeholder="عدد الغرف" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">أي عدد</SelectItem>
            <SelectItem value="1">غرفة واحدة</SelectItem>
            <SelectItem value="2">غرفتان</SelectItem>
            <SelectItem value="3">ثلاث غرف</SelectItem>
            <SelectItem value="4">أربع غرف أو أكثر</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="verified"
          checked={showVerifiedOnly}
          onCheckedChange={(checked) => setShowVerifiedOnly(checked === true)}
        />
        <label htmlFor="verified" className="text-sm font-medium">
          شقق موثقة فقط
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">البحث عن شقق</h1>
          
          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="ابحث عن شقق..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-12 h-12 text-right"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} className="h-12">
              بحث
            </Button>
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              تم العثور على {filteredApartments.length} شقة
            </p>
            
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">الأحدث</SelectItem>
                  <SelectItem value="price-low">السعر: الأقل أولاً</SelectItem>
                  <SelectItem value="price-high">السعر: الأعلى أولاً</SelectItem>
                  <SelectItem value="rating">التقييم</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="h-4 w-4" />
                    فلتر
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>تصفية النتائج</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <Card className="p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-4">تصفية النتائج</h2>
              <FilterPanel />
            </Card>
          </div>

          {/* Apartments Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredApartments.map((apartment) => (
                <Card key={apartment.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={apartment.images[0]}
                      alt={apartment.title}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 left-2 bg-white/80 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    {apartment.isVerified && (
                      <Badge className="absolute top-2 right-2 bg-secondary">
                        <Shield className="h-3 w-3 ml-1" />
                        موثق
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-right">{apartment.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 text-right line-clamp-2">
                      {apartment.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{apartment.neighborhood}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{apartment.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{apartment.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{apartment.area}م²</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {apartment.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{apartment.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({apartment.reviewCount} تقييم)
                      </span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0">
                    <div className="flex justify-between items-center w-full">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {apartment.price} جنيه
                        </div>
                        <div className="text-xs text-muted-foreground">
                          شهرياً
                        </div>
                      </div>
                      <Button size="sm">
                        <Eye className="h-4 w-4 ml-1" />
                        عرض التفاصيل
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredApartments.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  لم يتم العثور على شقق تطابق معايير البحث
                </div>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedNeighborhood('');
                  setPriceRange([0, 5000]);
                  setBedrooms('');
                  setShowVerifiedOnly(false);
                }}>
                  مسح جميع الفلاتر
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchPage;