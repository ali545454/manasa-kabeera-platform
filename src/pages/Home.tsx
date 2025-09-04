import React, { useState } from 'react';
import { Search, MapPin, Filter, Star, Heart, Users, Building } from 'lucide-react';
import { Input } from '@/components/ui/input';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import WhyUs from '@/components/WhyUs';
import ScamStories from '@/components/ScamStories';
import SubscriptionOffers from '@/components/SubscriptionOffers';
import FeaturedApartments from '@/components/FeaturedApartments';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const Home = () => {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <HeroSection />
      <HowItWorks />
      <WhyUs />
      <ScamStories />
      <SubscriptionOffers />
      <FeaturedApartments />
      <Footer />
    </div>
  );
};

export default Home;