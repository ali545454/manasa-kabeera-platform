import { Card, CardContent } from '@/components/ui/card';

const WhyUs = () => (
  <section className="container py-16">
    <h2 className="text-3xl font-bold text-center mb-8">لماذا تستخدم منصتنا؟</h2>
    <div className="grid md:grid-cols-3 gap-8 text-center">
      <Card>
        <CardContent className="py-8">
          <h3 className="font-semibold mb-2">شقق موثقة</h3>
          <p>جميع الشقق يتم مراجعتها والتأكد من بياناتها قبل عرضها.</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-8">
          <h3 className="font-semibold mb-2">دعم سريع</h3>
          <p>فريق دعم متواجد لمساعدتك في أي مشكلة أو استفسار.</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-8">
          <h3 className="font-semibold mb-2">تجارب حقيقية</h3>
          <p>تقييمات ومراجعات من طلاب حقيقيين لضمان الشفافية.</p>
        </CardContent>
      </Card>
    </div>
  </section>
);

export default WhyUs;