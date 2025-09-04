import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumb } from '@/components/ui/breadcrumb';
const EditApartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // هنا يمكنك جلب بيانات الشقة من API حسب id
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // منطق التعديل هنا
    navigate('/dashboard');
  };

  return (
    
    <>

    <Header/>
      {/* Breadcrumb */}
      <div className="container py-2">
        <Breadcrumb items={[
          { label: 'الرئيسية', href: '/' },
          { label: 'لوحة التحكم', href: '/dashboard' },
          { label: 'تعديل الشقة', href: `/edit-apartment/${id}` }
        ]} />
      </div>

    <div className="container py-16">
      <Card className="max-w-xl mx-auto">
        <CardContent>
          <h2 className="text-2xl font-bold mb-6 text-center">تعديل بيانات الشقة</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="عنوان الشقة"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <Input
              placeholder="السعر"
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
            />
            <Input
              placeholder="المنطقة"
              value={neighborhood}
              onChange={e => setNeighborhood(e.target.value)}
              required
            />
            <Input
              placeholder="وصف الشقة"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">حفظ التعديلات</Button>
          </form>
        </CardContent>
      </Card>
      {/* مثال داخل صفحة Dashboard أو قائمة الشقق */}
      <Button
        size="sm"
        variant="outline"
        onClick={() => navigate(`/edit-apartment/${id}`)}
      >
        تعديل
      </Button>
    </div>
    <Footer />
    </>
  );
};

export default EditApartment;