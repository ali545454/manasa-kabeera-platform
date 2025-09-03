import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowRight, Star, Heart, Share2, MapPin, Bed, Bath, Ruler, Wifi, Car, 
  Shield, Phone, MessageCircle, Calendar, Clock, User, Check, AlertCircle,
  ImageIcon, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mock apartment data
const apartmentData = {
  id: 1,
  title: 'شقة فاخرة مفروشة بالكامل',
  description: 'شقة مجهزة بالكامل في موقع مميز قريب من الجامعة. تتميز بالتشطيب الحديث والمرافق المتكاملة. مناسبة للطلاب والعائلات الصغيرة.',
  fullDescription: `شقة استثنائية تقع في قلب منطقة الجامعة، على بعد دقائق قليلة من جامعة أسيوط. تم تصميم الشقة بعناية فائقة لتوفر الراحة والهدوء اللازمين للدراسة والمعيشة.

تتكون الشقة من غرفتين نوم واسعتين، صالة مجهزة بالكامل، مطبخ حديث، وحمام عصري. جميع الغرف مكيفة ومجهزة بالأثاث الحديث عالي الجودة.

الموقع مثالي للطلاب حيث يوفر سهولة الوصول للجامعة والخدمات الأساسية مثل المحلات التجارية والمطاعم والمواصلات العامة.`,
  price: 2500,
  neighborhood: 'منطقة الجامعة',
  address: 'شارع الجامعة، منطقة الجامعة، أسيوط',
  bedrooms: 2,
  bathrooms: 1,
  area: 85,
  floor: 3,
  totalFloors: 5,
  furnished: true,
  features: [
    { name: 'واي فاي مجاني', icon: Wifi },
    { name: 'مفروشة بالكامل', icon: Check },
    { name: 'تكييف', icon: Check },
    { name: 'أمان 24/7', icon: Shield },
    { name: 'موقف سيارات', icon: Car },
    { name: 'قريب من الجامعة', icon: Check },
    { name: 'هادئة', icon: Check },
    { name: 'مطبخ مجهز', icon: Check }
  ],
  images: [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg'
  ],
  rating: 4.8,
  reviewCount: 24,
  isVerified: true,
  owner: {
    name: 'أحمد محمد سليم',
    phone: '01234567890',
    email: 'ahmed.mohamed@email.com',
    avatar: '/placeholder.svg',
    joinDate: '2022-03-15',
    propertiesCount: 8,
    rating: 4.9,
    responseTime: 'خلال ساعة'
  },
  availableFrom: '2024-02-01',
  minimumStay: '3 أشهر',
  deposit: 2500,
  utilities: 'متضمنة',
  rules: [
    'ممنوع التدخين',
    'هدوء بعد 10 مساءً',
    'زيارات محدودة',
    'لا توجد حيوانات أليفة'
  ],
  nearbyPlaces: [
    { name: 'جامعة أسيوط', distance: '0.5 كم', type: 'university' },
    { name: 'محطة مترو الجامعة', distance: '0.3 كم', type: 'transport' },
    { name: 'مركز تسوق الجامعة', distance: '0.8 كم', type: 'shopping' },
    { name: 'مستشفى الجامعة', distance: '1.2 كم', type: 'hospital' },
    { name: 'كافيه الطلاب', distance: '0.2 كم', type: 'cafe' }
  ]
};

const reviews = [
  {
    id: 1,
    user: 'محمد أحمد',
    avatar: '/placeholder.svg',
    rating: 5,
    date: '2024-01-15',
    comment: 'شقة ممتازة جداً، نظيفة ومجهزة بالكامل. المالك متعاون جداً والموقع قريب من الجامعة.',
    helpful: 12
  },
  {
    id: 2,
    user: 'فاطمة علي',
    avatar: '/placeholder.svg',
    rating: 4,
    date: '2024-01-10',
    comment: 'شقة جميلة ومريحة، الأثاث حديث والمنطقة هادئة. أنصح بها للطلاب.',
    helpful: 8
  },
  {
    id: 3,
    user: 'عبد الرحمن محمود',
    avatar: '/placeholder.svg',
    rating: 5,
    date: '2024-01-05',
    comment: 'أفضل شقة أقمت بها، نظيفة جداً والمالك أمين وصادق. أنصح بها بشدة.',
    helpful: 15
  }
];

const ApartmentDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState('');
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === apartmentData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? apartmentData.images.length - 1 : prev - 1
    );
  };

  const handleSendMessage = () => {
    console.log('Sending message:', message);
    setMessage('');
    setIsMessageDialogOpen(false);
    // Here you would implement the actual message sending logic
  };

  const handleBooking = () => {
    console.log('Booking apartment');
    setIsBookingDialogOpen(false);
    // Here you would implement the actual booking logic
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">الرئيسية</Link>
          <ChevronLeft className="h-4 w-4" />
          <Link to="/search" className="hover:text-primary">البحث</Link>
          <ChevronLeft className="h-4 w-4" />
          <span>{apartmentData.title}</span>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={apartmentData.images[currentImageIndex]}
                  alt={apartmentData.title}
                  className="w-full h-80 object-cover cursor-pointer"
                  onClick={() => setIsImageModalOpen(true)}
                />
                
                {/* Image Navigation */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {apartmentData.images.length}
                </div>

                {/* View All Images Button */}
                <Button
                  variant="secondary"
                  className="absolute bottom-4 left-4"
                  onClick={() => setIsImageModalOpen(true)}
                >
                  <ImageIcon className="h-4 w-4 ml-2" />
                  عرض جميع الصور
                </Button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4">
                <div className="flex gap-2 overflow-x-auto">
                  {apartmentData.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`صورة ${index + 1}`}
                      className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition-all ${
                        index === currentImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Apartment Info */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{apartmentData.title}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{apartmentData.address}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{apartmentData.rating}</span>
                    <span className="text-muted-foreground">({apartmentData.reviewCount} تقييم)</span>
                  </div>
                  {apartmentData.isVerified && (
                    <Badge className="bg-secondary">
                      <Shield className="h-3 w-3 ml-1" />
                      موثق
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <Bed className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-medium">{apartmentData.bedrooms}</div>
                    <div className="text-sm text-muted-foreground">غرفة نوم</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <Bath className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-medium">{apartmentData.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">حمام</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <Ruler className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-medium">{apartmentData.area}</div>
                    <div className="text-sm text-muted-foreground">متر مربع</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="h-6 w-6 mx-auto mb-2 text-primary text-lg">🏢</div>
                    <div className="font-medium">{apartmentData.floor}/{apartmentData.totalFloors}</div>
                    <div className="text-sm text-muted-foreground">الطابق</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">الوصف</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {apartmentData.fullDescription}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">المرافق والخدمات</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {apartmentData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                        <feature.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nearby Places */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">الأماكن القريبة</h3>
                  <div className="space-y-2">
                    {apartmentData.nearbyPlaces.map((place, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="text-sm">{place.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {place.distance}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rules */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">قوانين السكن</h3>
                  <div className="space-y-2">
                    {apartmentData.rules.map((rule, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-warning" />
                        <span className="text-sm">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>التقييمات والآراء</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold">{apartmentData.rating}</span>
                    <span className="text-muted-foreground">من أصل 5</span>
                  </div>
                  <span className="text-muted-foreground">
                    ({apartmentData.reviewCount} تقييم)
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{review.user}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground mb-2">{review.comment}</p>
                        <div className="text-sm text-muted-foreground">
                          {review.helpful} شخص وجد هذا التقييم مفيد
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {apartmentData.price.toLocaleString()} جنيه
                  </div>
                  <div className="text-muted-foreground">شهرياً</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">متاح من:</span>
                    <div className="font-medium">{apartmentData.availableFrom}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">الحد الأدنى:</span>
                    <div className="font-medium">{apartmentData.minimumStay}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">التأمين:</span>
                    <div className="font-medium">{apartmentData.deposit.toLocaleString()} جنيه</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">المرافق:</span>
                    <div className="font-medium">{apartmentData.utilities}</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full h-12 text-base">
                        <Calendar className="h-5 w-5 ml-2" />
                        احجز الآن
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>حجز الشقة</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p>سيتم توجيهك لصفحة الدفع لتأكيد الحجز وإيداع التأمين.</p>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="font-medium mb-2">ملخص الحجز:</div>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>الإيجار الشهري:</span>
                              <span>{apartmentData.price.toLocaleString()} جنيه</span>
                            </div>
                            <div className="flex justify-between">
                              <span>التأمين:</span>
                              <span>{apartmentData.deposit.toLocaleString()} جنيه</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-medium">
                              <span>الإجمالي:</span>
                              <span>{(apartmentData.price + apartmentData.deposit).toLocaleString()} جنيه</span>
                            </div>
                          </div>
                        </div>
                        <Button onClick={handleBooking} className="w-full">
                          تأكيد الحجز والانتقال للدفع
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full h-12 text-base">
                        <MessageCircle className="h-5 w-5 ml-2" />
                        راسل المالك
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>إرسال رسالة لصاحب السكن</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="اكتب رسالتك هنا..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="min-h-[120px] text-right"
                        />
                        <Button onClick={handleSendMessage} className="w-full" disabled={!message.trim()}>
                          إرسال الرسالة
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="w-full h-12 text-base">
                    <Phone className="h-5 w-5 ml-2" />
                    اتصل: {apartmentData.owner.phone}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card>
              <CardHeader>
                <CardTitle>معلومات المالك</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={apartmentData.owner.avatar} />
                    <AvatarFallback>{apartmentData.owner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{apartmentData.owner.name}</div>
                    <div className="text-sm text-muted-foreground">
                      عضو منذ {apartmentData.owner.joinDate}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">عدد العقارات:</span>
                    <span>{apartmentData.owner.propertiesCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">التقييم:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{apartmentData.owner.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">وقت الرد:</span>
                    <span>{apartmentData.owner.responseTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Image Modal */}
        <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>صور الشقة</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
              {apartmentData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`صورة ${index + 1}`}
                  className="w-full h-40 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setIsImageModalOpen(false);
                  }}
                />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Footer />
    </div>
  );
};

export default ApartmentDetails;