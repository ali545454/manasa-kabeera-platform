import React, { useState } from 'react';
import { Plus, Edit, Eye, Trash2, Star, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const [properties] = useState([
    {
      id: 1,
      title: 'شقة فاخرة مفروشة',
      neighborhood: 'منطقة الجامعة',
      price: 2500,
      status: 'متاحة',
      views: 145,
      rating: 4.8,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'استوديو حديث',
      neighborhood: 'الوليدية',
      price: 1800,
      status: 'محجوزة',
      views: 89,
      rating: 4.6,
      image: '/placeholder.svg'
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">لوحة تحكم المالك</h1>
          <Button onClick={() => navigate('/add-apartment')} className="mb-4 gap-2">
            <Plus className="h-4 w-4" />
            إضافة شقة جديدة
          </Button>
        </div>

        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="properties">العقارات</TabsTrigger>
            <TabsTrigger value="bookings">الحجوزات</TabsTrigger>
            <TabsTrigger value="messages">الرسائل</TabsTrigger>
            <TabsTrigger value="analytics">الإحصائيات</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>عقاراتي ({properties.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <Card key={property.id} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-48 object-cover"
                        />
                        <Badge
                          className={`absolute top-2 right-2 ${
                            property.status === 'متاحة' ? 'bg-secondary' : 'bg-warning'
                          }`}
                        >
                          {property.status}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{property.title}</h3>
                        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{property.neighborhood}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-lg font-bold text-primary">
                            {property.price} جنيه
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{property.rating}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>الحجوزات الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">لا توجد حجوزات حالياً</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>الرسائل</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">لا توجد رسائل جديدة</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>إحصائيات العقارات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">2</div>
                    <div className="text-sm text-muted-foreground">عقارات نشطة</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-secondary">234</div>
                    <div className="text-sm text-muted-foreground">مشاهدات</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-warning">5</div>
                    <div className="text-sm text-muted-foreground">استفسارات</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-info">4.7</div>
                    <div className="text-sm text-muted-foreground">التقييم</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;