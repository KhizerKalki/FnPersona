import { BentoGridThirdDemo } from '@/components/grid-section/Bento';
import { InfiniteMovingCardsDemo } from '@/components/testimonial/InfiniteMovingCardsDemo';
import { Hero } from '@/components/hero/Hero';
import HeroHighlightDemo from '@/components/hero/HeroHighlightDemo';

const Home = () => {
  return (
    <div className=''>
      <Hero />
      <BentoGridThirdDemo />
      <InfiniteMovingCardsDemo />
      <HeroHighlightDemo />
    </div>
  );
};
export default Home;
