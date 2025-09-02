import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, Star, Heart, MessageCircle, Settings, Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userType] = useState<'student' | 'owner'>('student'); // This would come from auth context
  
  const [profileData, setProfileData] = useState({
    fullName: 'أحمد محمد علي',
    email: 'ahmed.mohamed@email.com',
    phone: '01234567890',
    city: 'القاهرة',
    university: 'الجامعة الأمريكية بالقاهرة',
    bio: 'طالب في كلية الهندسة، أبحث عن سكن هادئ بالقرب من الجامعة. أفضل الأماكن المفروشة والمجهزة بالإنترنت.',
    avatar: '/placeholder.svg'
  });

  const [tempData, setTempData] = useState(profileData);

  const handleEdit = () => {
    setTempData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setTempData(prev => ({ ...prev, [field]: value }));
  };

  // Mock data for student profile
  const studentStats = {
    favoriteApartments: 12,
    reviewsWritten: 8,
    totalRating: 4.7,
    bookings: 3
  };

  const recentActivity = [
    { id: 1, type: 'favorite', message: 'أضفت شقة "استوديو مفروش" للمفضلة', date: '2024-01-15' },
    { id: 2, type: 'review', message: 'كتبت تقييماً لشقة "بجوار الجامعة"', date: '2024-01-14' },
    { id: 3, type: 'message', message: 'أرسلت رسالة لصاحب الشقة في الزمالك', date: '2024-01-13' },
    { id: 4, type: 'booking', message: 'حجزت شقة في المعادي', date: '2024-01-12' }
  ];

  const favoriteApartments = [
    {
      id: 1,
      title: 'شقة فاخرة بجوار الجامعة',
      location: 'المعادي، القاهرة',
      price: 2500,
      rating: 4.8,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'استوديو مفروش حديث',
      location: 'مدينة نصر، القاهرة',
      price: 1800,
      rating: 4.6,
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
          <CardContent className="relative p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src={profileData.avatar} />
                <AvatarFallback className="text-2xl">
                  {profileData.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-right">
                <div className="flex items-center justify-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold">{profileData.fullName}</h1>
                    <p className="text-muted-foreground text-lg">{profileData.university}</p>
                    <Badge variant="secondary" className="mt-2">
                      {userType === 'student' ? 'طالب' : 'صاحب سكن'}
                    </Badge>
                  </div>
                  
                  <div className="hidden md:flex gap-2">
                    {!isEditing ? (
                      <Button onClick={handleEdit} className="gap-2">
                        <Edit3 className="h-4 w-4" />
                        تعديل الملف الشخصي
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button onClick={handleSave} className="gap-2">
                          <Save className="h-4 w-4" />
                          حفظ
                        </Button>
                        <Button variant="outline" onClick={handleCancel} className="gap-2">
                          <X className="h-4 w-4" />
                          إلغاء
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{studentStats.favoriteApartments}</div>
                    <div className="text-sm text-muted-foreground">مفضلة</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">{studentStats.reviewsWritten}</div>
                    <div className="text-sm text-muted-foreground">تقييم</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-warning">{studentStats.totalRating}</div>
                    <div className="text-sm text-muted-foreground">تقييمي</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-info">{studentStats.bookings}</div>
                    <div className="text-sm text-muted-foreground">حجوزات</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Edit Button */}
            <div className="md:hidden mt-4 text-center">
              {!isEditing ? (
                <Button onClick={handleEdit} className="gap-2">
                  <Edit3 className="h-4 w-4" />
                  تعديل الملف الشخصي
                </Button>
              ) : (
                <div className="flex gap-2 justify-center">
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="h-4 w-4" />
                    حفظ
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="gap-2">
                    <X className="h-4 w-4" />
                    إلغاء
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">المعلومات</TabsTrigger>
            <TabsTrigger value="favorites">المفضلة</TabsTrigger>
            <TabsTrigger value="activity">النشاط</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الشخصية</CardTitle>
                <CardDescription>
                  معلوماتك الأساسية ووصفك الشخصي
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">الاسم الكامل</Label>
                    <div className="relative">
                      <User className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="fullName"
                        value={isEditing ? tempData.fullName : profileData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="pr-10 text-right"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={isEditing ? tempData.phone : profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pr-10 text-right"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      value={isEditing ? tempData.email : profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pr-10 text-right"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">المدينة</Label>
                    <div className="relative">
                      <MapPin className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="city"
                        value={isEditing ? tempData.city : profileData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="pr-10 text-right"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="university">الجامعة</Label>
                    <div className="relative">
                      <Building className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="university"
                        value={isEditing ? tempData.university : profileData.university}
                        onChange={(e) => handleInputChange('university', e.target.value)}
                        className="pr-10 text-right"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">النبذة الشخصية</Label>
                  <Textarea
                    id="bio"
                    value={isEditing ? tempData.bio : profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="min-h-[120px] text-right resize-none"
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites */}
          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  الشقق المفضلة
                </CardTitle>
                <CardDescription>
                  الشقق التي أضفتها للمفضلة لديك
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoriteApartments.map((apartment) => (
                    <Card key={apartment.id} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={apartment.image}
                          alt={apartment.title}
                          className="w-full h-32 object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 left-2 bg-white/80 hover:bg-white"
                        >
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-right">{apartment.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {apartment.location}
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{apartment.rating}</span>
                          </div>
                          <div className="text-lg font-bold text-primary">
                            {apartment.price} جنيه
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>النشاط الأخير</CardTitle>
                <CardDescription>
                  تفاعلاتك الأخيرة على المنصة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {activity.type === 'favorite' && <Heart className="h-5 w-5 text-red-500" />}
                        {activity.type === 'review' && <Star className="h-5 w-5 text-yellow-500" />}
                        {activity.type === 'message' && <MessageCircle className="h-5 w-5 text-blue-500" />}
                        {activity.type === 'booking' && <Building className="h-5 w-5 text-green-500" />}
                      </div>
                      <div className="flex-1 text-right">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  إعدادات الحساب
                </CardTitle>
                <CardDescription>
                  إدارة إعدادات حسابك وتفضيلاتك
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">إشعارات البريد الإلكتروني</h3>
                      <p className="text-sm text-muted-foreground">تلقي إشعارات عن الشقق الجديدة والرسائل</p>
                    </div>
                    <Button variant="outline">إدارة</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">الخصوصية</h3>
                      <p className="text-sm text-muted-foreground">إعدادات الخصوصية وظهور الملف الشخصي</p>
                    </div>
                    <Button variant="outline">إدارة</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">تغيير كلمة المرور</h3>
                      <p className="text-sm text-muted-foreground">تحديث كلمة المرور لحسابك</p>
                    </div>
                    <Button variant="outline">تغيير</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center text-red-600">
                    <div>
                      <h3 className="font-medium">حذف الحساب</h3>
                      <p className="text-sm">حذف حسابك وجميع بياناتك نهائياً</p>
                    </div>
                    <Button variant="destructive">حذف</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;