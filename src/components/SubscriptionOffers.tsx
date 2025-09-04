import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const subscriptionOffers = [
  { title: 'اشتراك شهر', price: '100 جنيه', features: ['بحث غير محدود', 'دعم مباشر'] },
  { title: 'اشتراك 3 شهور', price: '250 جنيه', features: ['بحث غير محدود', 'دعم مباشر', 'عرض شقق مميزة'] },
  { title: 'اشتراك سنوي', price: '800 جنيه', features: ['كل المميزات', 'دعم VIP', 'إعلانات مجانية'] },
];

const SubscriptionOffers = () => (
  <section className="container py-16">
    <h2 className="text-3xl font-bold text-center mb-8">عروض الاشتراكات</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {subscriptionOffers.map((offer, idx) => (
        <Card key={idx}>
          <CardContent className="py-8 text-center">
            <h3 className="font-semibold text-xl mb-2">{offer.title}</h3>
            <p className="text-primary font-bold text-2xl mb-4">{offer.price}</p>
            <ul className="mb-4 space-y-2">
              {offer.features.map((f, i) => (
                <li key={i} className="text-muted-foreground">{f}</li>
              ))}
            </ul>
            <Button>اشترك الآن</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default SubscriptionOffers;