import React, { useMemo, useState } from "react";
import { HelpCircle, Phone, Mail, MessageSquare, Search, ArrowRight, Shield, Calendar, CreditCard, CheckCircle2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/**
 * Help Page – Arabic (RTL)
 * Tech: React + TypeScript + Tailwind + shadcn/ui + framer-motion
 * Brand colors: main #1c7cf2 (blue), secondary #10b77f (green)
 * Notes:
 *  - Fully RTL with Arabic copy
 *  - Mobile-first, responsive
 *  - Search within FAQs
 *  - Re-usable FAQ data with type safety
 */

const BRAND = {
  blue: "#1c7cf2",
  green: "#10b77f",
};

// Types
interface ContactInfo {
  email: string;
  phone: string; // e.g. "+20 100 000 0000"
  whatsapp?: string; // wa.me link
  hours?: string; // Arabic hours string
}

interface FAQItem {
  id: string;
  q: string;
  a: string;
  tags?: string[];
}

interface HelpPageProps {
  contact?: ContactInfo;
  onStartBooking?: () => void; // optional CTA handler
}

const DEFAULT_CONTACT: ContactInfo = {
  email: "support@yourwebsite.com",
  phone: "+20 100 000 0000",
  whatsapp: "https://wa.me/201000000000",
  hours: "يوميًا من 9 صباحًا حتى 10 مساءً",
};

const FAQS: FAQItem[] = [
  {
    id: "start",
    q: "كيف أبدأ الحجز؟",
    a: "اختر الشقة المناسبة ثم اضغط \"احجز الآن\" واتبع الخطوات الخمس حتى تأكيد الحجز.",
    tags: ["بداية", "حجز", "الخطوات"],
  },
  {
    id: "steps",
    q: "ما هي خطوات الحجز؟",
    a: "1) المعلومات الأساسية 2) التفاصيل المالية 3) طرق الدفع 4) التواريخ + خيار الاحتفاظ بالمبلغ حتى تأكيد الطرفين 5) تأكيد الحجز.",
    tags: ["خطوات", "عملية", "تأكيد"],
  },
  {
    id: "payments",
    q: "هل الدفع آمن؟",
    a: "نعم. نوفر قنوات دفع آمنة للبطاقات البنكية والمحافظ (فودافون كاش، اتصالات، أورنج)، مع خيار الاحتفاظ بالمبلغ في الموقع حتى التأكيد.",
    tags: ["دفع", "أمان", "محافظ"],
  },
  {
    id: "afterpay",
    q: "ماذا يحدث بعد الدفع؟",
    a: "ستصلك رسالة تأكيد، ومع موافقة صاحب السكن يتم تفعيل الحجز رسميًا.",
    tags: ["تأكيد", "رسالة", "موافقة"],
  },
  {
    id: "refund",
    q: "ماذا عن الاسترجاع أو الإلغاء؟",
    a: "يعتمد على سياسة كل شقة. ستظهر السياسة بوضوح قبل إتمام الدفع.",
    tags: ["استرجاع", "إلغاء", "سياسة"],
  },
  {
    id: "fees",
    q: "ما هي الرسوم؟",
    a: "سترى مبلغ الحجز والضرائب ونسبة الموقع بشكل واضح في خطوة التفاصيل المالية قبل الدفع.",
    tags: ["رسوم", "ضرائب", "نسبة"],
  },
];

export default function HelpPage({ contact = DEFAULT_CONTACT, onStartBooking }: HelpPageProps) {
  const [query, setQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    const q = query.trim();
    if (!q) return FAQS;
    const hay = q.toLowerCase();
    return FAQS.filter((f) =>
      [f.q, f.a, ...(f.tags || [])].join(" ").toLowerCase().includes(hay)
    );
  }, [query]);

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Top bar */}
      <div className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5" style={{ color: BRAND.blue }} />
            <span className="font-bold" style={{ color: BRAND.blue }}>
              موقع الشقق الطلابية
            </span>
          </div>
          <a
            href="/"
            className="text-sm text-slate-600 hover:text-slate-900 transition"
            aria-label="العودة للصفحة الرئيسية"
          >
            الصفحة الرئيسية
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              المساعدة والدعم
            </h1>
            <p className="text-slate-600">
              هنا ستجد إجابات سريعة لأسئلتك حول الحجز، الدفع، والتأكيد. استخدم البحث للوصول للمعلومة مباشرة.
            </p>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث في الأسئلة الشائعة (مثال: الدفع، الضرائب، التأكيد)"
                className="pr-10"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge color={BRAND.blue}>الدفع</Badge>
              <Badge color={BRAND.green}>التأكيد</Badge>
              <Badge color={BRAND.blue}>الضرائب</Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <HeroCards onStartBooking={onStartBooking} />
          </motion.div>
        </div>
      </section>

      {/* Quick Guides */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="grid gap-4 md:grid-cols-3">
          <GuideCard
            icon={<Shield className="h-5 w-5" />} title="هل الدفع آمن؟"
            desc="نستخدم قنوات دفع آمنة (بطاقات، محافظ)، ويمكنك الاحتفاظ بالمبلغ حتى تأكيد الطرفين."
          />
          <GuideCard
            icon={<Calendar className="h-5 w-5" />} title="كيف أحدد التواريخ؟"
            desc="اختر تاريخ الدخول والخروج بسهولة، ويمكن تعديلهما قبل التأكيد النهائي."
          />
          <GuideCard
            icon={<CreditCard className="h-5 w-5" />} title="ما هي الرسوم؟"
            desc="ستظهر قيمة الحجز والضرائب ونسبة الموقع بشكل واضح قبل الدفع."
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <Card className="border-2" style={{ borderColor: BRAND.blue }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" style={{ color: BRAND.blue }} />
              <CardTitle>الأسئلة الشائعة</CardTitle>
            </div>
            <CardDescription>
              إذا لم تجد إجابتك هنا، تواصل مع فريق الدعم بأسفل الصفحة.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredFaqs.length === 0 ? (
              <p className="text-slate-500">لا توجد نتائج مطابقة لبحثك.</p>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-right">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="leading-relaxed text-slate-700">{faq.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>تواصل معنا</CardTitle>
            <CardDescription>
              نسعد بخدمتك. اختر وسيلة التواصل المناسبة لك.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <ContactTile
                href={`mailto:${contact.email}`}
                icon={<Mail className="h-5 w-5" />}
                title="البريد الإلكتروني"
                subtitle={contact.email}
                color={BRAND.blue}
              />
              <ContactTile
                href={`tel:${contact.phone}`}
                icon={<Phone className="h-5 w-5" />}
                title="الهاتف"
                subtitle={contact.phone}
                color={BRAND.green}
              />
              <ContactTile
                href={contact.whatsapp || "#"}
                icon={<MessageSquare className="h-5 w-5" />}
                title="واتساب"
                subtitle={contact.whatsapp ? "تواصل مباشر" : "أضف رابط واتساب"}
                color={BRAND.blue}
              />
            </div>
            {contact.hours && (
              <p className="mt-4 text-slate-500">أوقات العمل: {contact.hours}</p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Footer CTA */}
      <footer className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border rounded-2xl p-4">
          <div>
            <p className="font-semibold">جاهز تبدأ الحجز؟</p>
            <p className="text-slate-600 text-sm">اتبع ٥ خطوات بسيطة لإتمام حجزك بثقة.</p>
          </div>
          <Button
            onClick={onStartBooking}
            className="text-white"
            style={{ backgroundColor: BRAND.green }}
          >
            ابدأ الحجز الآن
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
          </Button>
        </div>
        <p className="text-center text-xs text-slate-500 mt-6">
          © {new Date().getFullYear()} موقع الشقق الطلابية. جميع الحقوق محفوظة.
        </p>
      </footer>
    </div>
  );
}

// ===== UI bits =====
function Badge({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-3 py-1 text-xs"
      style={{
        borderColor: color || BRAND.blue,
        color: color || BRAND.blue,
        background: "white",
      }}
    >
      {children}
    </span>
  );
}

function GuideCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 text-slate-700">
          {icon}
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
        <CardDescription className="leading-relaxed">{desc}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function ContactTile({
  href,
  icon,
  title,
  subtitle,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color?: string;
}) {
  return (
    <a
      href={href}
      className="group block border rounded-xl p-4 hover:shadow-md transition"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: `${(color || BRAND.blue)}10` }}
        >
          <span className="text-slate-700" style={{ color: color || BRAND.blue }}>
            {icon}
          </span>
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-slate-600">{subtitle}</p>
        </div>
      </div>
    </a>
  );
}

function HeroCards({ onStartBooking }: { onStartBooking?: () => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="border-2" style={{ borderColor: BRAND.blue }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">خمس خطوات للحجز</CardTitle>
          <CardDescription>سريعة، واضحة، ومناسبة للطلاب</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="list-disc pr-5 text-slate-700 text-sm space-y-1">
            <li>المعلومات الأساسية</li>
            <li>التفاصيل المالية</li>
            <li>طرق الدفع</li>
            <li>التواريخ + خيار الاحتفاظ بالمبلغ</li>
            <li>تأكيد الحجز</li>
          </ul>
          <div className="pt-4">
            <Button
              onClick={onStartBooking}
              className="text-white"
              style={{ backgroundColor: BRAND.green }}
            >
              ابدأ الآن
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="border-2" style={{ borderColor: BRAND.green }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">طرق الدفع المدعومة</CardTitle>
          <CardDescription>بطاقات + محافظ (فودافون، اتصالات، أورنج)</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2 text-sm">
            <Pill>Visa</Pill>
            <Pill>Mastercard</Pill>
            <Pill>Vodafone Cash</Pill>
            <Pill>Etisalat</Pill>
            <Pill>Orange</Pill>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 className="h-4 w-4" />
            <span>خيار الاحتفاظ بالمبلغ حتى تأكيد الطرفين متاح</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border px-3 py-1">{children}</span>
  );
}
