import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const featuredApartments = [
  {
    id: 1,
    title: 'شقة فاخرة للطلاب',
    price: 2200,
    neighborhood: 'منطقة الجامعة',
    image: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'استوديو مفروش بالكامل',
    price: 1500,
    neighborhood: 'الوليدية',
    image: '/placeholder.svg',
  },
  {
    id: 3,
    title: 'شقة اقتصادية',
    price: 1200,
    neighborhood: 'المنطقة الثالثة',
    image: '/placeholder.svg',
  },
];

const FeaturedApartments = () => (
  <section className="container py-16">
    <h2 className="text-3xl font-bold text-center mb-8">شقق مميزة</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {featuredApartments.map((apt) => (
        <Card key={apt.id}>
          <CardContent className="p-0">
            <img src={apt.image} alt={apt.title} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{apt.title}</h3>
              <p className="text-muted-foreground mb-1">{apt.neighborhood}</p>
              <p className="font-bold text-primary mb-2">{apt.price} جنيه</p>
              <Button size="sm">عرض التفاصيل</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default FeaturedApartments;