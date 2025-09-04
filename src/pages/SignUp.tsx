import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    city: '',
    university: '',
    bio: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<'student' | 'owner'>('student');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup attempt:', { ...formData, userType, agreeToTerms });
  };

  const cities = ['القاهرة', 'الجيزة', 'الإسكندرية', 'المنصورة', 'أسيوط', 'طنطا'];

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">إنشاء حساب جديد</CardTitle>
          <CardDescription>
            انضم إلينا واكتشف أفضل خيارات السكن الطلابي
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* User Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">نوع الحساب</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={userType === 'student' ? 'default' : 'outline'}
                onClick={() => setUserType('student')}
                className="h-12"
              >
                طالب
              </Button>
              <Button
                type="button"
                variant={userType === 'owner' ? 'default' : 'outline'}
                onClick={() => setUserType('owner')}
                className="h-12"
              >
                صاحب سكن
              </Button>
            </div>
          </div>

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">الاسم الكامل</Label>
                <div className="relative">
                  <User className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    placeholder="أدخل اسمك الكامل"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="pr-10 h-12 text-right"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <div className="relative">
                  <Phone className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pr-10 h-12 text-right"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pr-10 h-12 text-right"
                  required
                />
              </div>
            </div>

            {/* Location and University */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city">المدينة</Label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <select
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full h-12 pr-10 pl-4 border border-input rounded-md bg-background text-right appearance-none focus:ring-2 focus:ring-primary/20"
                    required
                  >
                    <option value="">اختر المدينة</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* University (for students) / Business Type (for owners) */}
              <div className="space-y-2">
                <Label htmlFor="university">
                  {userType === 'student' ? 'الجامعة' : 'نوع العمل'}
                </Label>
                <div className="relative">
                  <Building className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="university"
                    placeholder={userType === 'student' ? 'اسم الجامعة' : 'مجال العمل'}
                    value={formData.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                    className="pr-10 h-12 text-right"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="أدخل كلمة المرور"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pr-10 pl-10 h-12 text-right"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="أعد إدخال كلمة المرور"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pr-10 pl-10 h-12 text-right"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-2 h-8 w-8"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">
                {userType === 'student' ? 'نبذة شخصية (اختياري)' : 'وصف الخدمات المقدمة'}
              </Label>
              <Textarea
                id="bio"
                placeholder={
                  userType === 'student' 
                    ? 'أخبرنا قليلاً عن نفسك...'
                    : 'اكتب وصفاً عن الخدمات والمرافق التي تقدمها...'
                }
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="min-h-[100px] text-right resize-none"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
              required
            />
              <Label htmlFor="terms" className="text-sm">
                أوافق على{' '}
                <Link to="/terms" className="text-primary hover:text-primary-hover underline">
                  الشروط والأحكام
                </Link>
                {' '}و{' '}
                <Link to="/privacy" className="text-primary hover:text-primary-hover underline">
                  سياسة الخصوصية
                </Link>
              </Label>
            </div>

            {/* Sign Up Button */}
            <Button 
              type="submit" 
              className="w-full h-12 text-base"
              disabled={!agreeToTerms}
            >
              إنشاء الحساب
            </Button>
          </form>

          <Separator />

          {/* Login Link */}
          <div className="text-center">
            <p className="text-muted-foreground">
              لديك حساب بالفعل؟{' '}
              <Link 
                to="/login" 
                className="text-primary hover:text-primary-hover font-medium transition-colors"
              >
                تسجيل الدخول
              </Link>
            </p>
          </div>

          {/* Quick Actions */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">أو</p>
            <Link to="/">
              <Button variant="outline" className="w-full">
                العودة للصفحة الرئيسية
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
    <Footer />
    </>
  );
};

export default SignUp;