import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { PipelineSection } from '@/components/home/PipelineSection';
import { CTASection } from '@/components/home/CTASection';
import { ProjectOverviewSection } from '@/components/home/ProjectOverviewSection';
import { VoiceIntelligenceSection } from '@/components/home/VoiceIntelligenceSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Global Background Image & Effects */}
      <div className="fixed inset-0 z-[-1] bg-background/80 backdrop-blur-sm" />
      <div
        className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity"
        style={{ backgroundImage: 'url(/waves-bg.png)' }}
      />

      <Header />
      <main className="pt-16 relative z-10">
        <HeroSection />
        <ProjectOverviewSection />
        <VoiceIntelligenceSection />
        <FeaturesSection />
        <PipelineSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
