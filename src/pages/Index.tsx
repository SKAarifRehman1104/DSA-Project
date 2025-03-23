
import { useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import BenefitsSection from "@/components/home/BenefitsSection";

const Index = () => {
  useEffect(() => {
    document.title = "DSA Visualizer";
    
    // Add animation for elements with animate-on-scroll class
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.9 && position.bottom >= 0) {
          element.classList.add('is-visible');
        }
      });
    };
    
    // Add shimmer effect to elements when they enter viewport
    const addShimmerEffect = () => {
      const elements = document.querySelectorAll('.glass-card');
      elements.forEach((element, index) => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight && position.bottom >= 0) {
          setTimeout(() => {
            element.classList.add('animate-shimmer');
          }, index * 150);
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('scroll', addShimmerEffect);
    
    // Initial check
    animateOnScroll();
    addShimmerEffect();
    
    // Add stagger animation to main sections
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('stagger-animation');
    });
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
      window.removeEventListener('scroll', addShimmerEffect);
    };
  }, []);

  return (
    <div>
      <HeroSection />
      <FeaturesGrid />
      <BenefitsSection />
    </div>
  );
};

export default Index;
