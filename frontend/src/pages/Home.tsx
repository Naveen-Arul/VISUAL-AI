import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { PipelineSection } from '@/components/home/PipelineSection';
import { CTASection } from '@/components/home/CTASection';
import { ProjectOverviewSection } from '@/components/home/ProjectOverviewSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <ProjectOverviewSection />
        <FeaturesSection />
        <PipelineSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
