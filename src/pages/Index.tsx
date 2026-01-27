import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import WorkSection from '@/components/WorkSection';
import ChatAnimationSection from '@/components/ChatAnimationSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <WorkSection />
      <ChatAnimationSection />
      <Footer />
    </div>
  );
};

export default Index;
