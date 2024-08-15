import { BentoGridThirdDemo } from '@/components/grid-section/Bento';
import { InfiniteMovingCardsDemo } from '@/components/testimonial/InfiniteMovingCardsDemo';
import { Hero } from '@/components/hero/Hero';
import HeroHighlightDemo from '@/components/hero/HeroHighlightDemo';
import {TabsDemo} from '@/components/tabs/TabsDemo'
import { FeaturesSection } from '@/components/features/FeaturesSection';
const Home = () => {
  return (
    <div className=''>
      <Hero />
      <BentoGridThirdDemo />
      <TabsDemo />
      <HeroHighlightDemo />
      <FeaturesSection />
      <InfiniteMovingCardsDemo />
    </div>
  );
};
export default Home;
