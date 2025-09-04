import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AddApartment = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا تقدر تضيف منطق الإرسال للسيرفر
    navigate('/dashboard');
  };

  return (
    <div className="container py-16">
      <Card className="max-w-xl mx-auto">
        <CardContent>
          <h2 className="text-2xl font-bold mb-6 text-center">إضافة شقة جديدة</h2>
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
            <Button type="submit" className="w-full">حفظ الشقة</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddApartment;