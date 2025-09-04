import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'student' | 'owner'>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password, userType });
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">تسجيل الدخول</CardTitle>
          <CardDescription>
            مرحباً بك مرة أخرى! سجل دخولك للوصول لحسابك
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
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-10 h-12 text-right"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Forgot Password */}
            <div className="text-left">
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:text-primary-hover transition-colors"
              >
                نسيت كلمة المرور؟
              </Link>
            </div>

            {/* Login Button */}
            <Button type="submit" className="w-full h-12 text-base">
              تسجيل الدخول
            </Button>
          </form>

          <Separator />

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-muted-foreground">
              ليس لديك حساب؟{' '}
              <Link 
                to="/signup" 
                className="text-primary hover:text-primary-hover font-medium transition-colors"
              >
                إنشاء حساب جديد
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
    <Footer/>
    </>
  );
};

export default Login;