import React, { useState } from 'react';
import { Plus, Edit, Eye, Trash2, Star, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const [properties] = useState([
    {
      id: 1,
      title: 'شقة فاخرة للطلاب',
      price: 2200,
      neighborhood: 'منطقة الجامعة',
      status: 'متاحة',
      date: '2025-09-01',
      featured: true,
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
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {property.featured && <Star className="text-yellow-400 h-5 w-5" />}
                  {property.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{property.neighborhood}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{property.date}</span>
                </div>
                <Badge variant={property.status === 'متاحة' ? 'success' : 'destructive'}>
                  {property.status}
                </Badge>
              </CardContent>
              <div className="flex justify-end gap-2 p-4 pt-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/edit-apartment/${property.id}`)}
                  className="gap-1"
                >
                  <Edit className="h-4 w-4" />
                  تعديل
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => navigate(`/apartment/${property.id}`)}
                  className="gap-1"
                >
                  <Eye className="h-4 w-4" />
                  رؤية
                </Button>
                <Button size="sm" variant="destructive" className="gap-1">
                  <Trash2 className="h-4 w-4" />
                  حذف
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;