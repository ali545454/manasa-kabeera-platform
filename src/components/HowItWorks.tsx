import { Card, CardContent } from '@/components/ui/card';

const HowItWorks = () => (
  <section className="container py-16">
    <h2 className="text-3xl font-bold text-center mb-8">كيف يعمل الموقع؟</h2>
    <div className="grid md:grid-cols-3 gap-8 text-center">
      <Card>
        <CardContent className="py-8">
          <h3 className="font-semibold mb-2">ابحث بسهولة</h3>
          <p>استخدم محرك البحث للعثور على الشقق المناسبة حسب المنطقة والسعر والمميزات.</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-8">
          <h3 className="font-semibold mb-2">تواصل بأمان</h3>
          <p>تواصل مع أصحاب الشقق مباشرة وتحقق من التقييمات لضمان المصداقية.</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-8">
          <h3 className="font-semibold mb-2">احجز بثقة</h3>
          <p>احجز شقتك بعد التأكد من التفاصيل، وادفع بأمان عبر الموقع أو عند المعاينة.</p>
        </CardContent>
      </Card>
    </div>
  </section>
);

export default HowItWorks;