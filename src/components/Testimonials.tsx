import { useState, useEffect } from 'react';
import { Section, FadeIn } from './ui/Section';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Sarah & James Jenkins",
    role: "Wedding Reception",
    image: "https://images.unsplash.com/photo-1624562563808-1700656e4c06?q=80&w=1974&auto=format&fit=crop",
    quote: "The food was absolutely spectacular. Every guest commented on how delicious and beautifully presented everything was. The team was professional, invisible yet everywhere at once.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Ross",
    role: "CEO, TechFlow Inc.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    quote: "Global Gourmet handled our corporate gala with such grace. The menu was innovative, the service was impeccable, and they accommodated all dietary restrictions effortlessly.",
    rating: 5
  },
  {
    id: 3,
    name: "Elena & Marco",
    role: "Silver Anniversary",
    image: "https://images.unsplash.com/photo-1519744346901-141b2141232d?q=80&w=2080&auto=format&fit=crop",
    quote: "We wanted something unique for our anniversary, and the team delivered a tasting menu that told the story of our travels. It was emotional, delicious, and perfect.",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <Section id="testimonials" className="bg-gg-cream overflow-hidden py-16 md:py-24">
      <div className="text-center mb-10 md:mb-16">
        <FadeIn>
          <span className="text-gold-500 font-medium tracking-widest uppercase text-sm mb-2 block">Testimonials</span>
          <h2 className="font-serif text-3xl md:text-5xl text-gg-navy">Client Stories</h2>
        </FadeIn>
      </div>

      {/* Container Height: Taller on mobile to fit stacked content */}
      <div className="max-w-6xl mx-auto relative h-[750px] sm:h-[650px] md:h-[500px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full px-4 md:px-0"
          >
            <div className="w-full h-full flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
              {/* Image Section - Fixed height on mobile, full height on desktop */}
              <div className="w-full h-64 sm:h-72 md:h-full md:w-5/12 relative flex-shrink-0 overflow-hidden">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gg-navy/10 mix-blend-multiply" />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-7/12 p-6 sm:p-8 md:p-16 flex flex-col justify-center bg-gg-navy text-gg-cream relative flex-grow">
                <Quote className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 md:w-20 md:h-20 text-white/5 rotate-180" />
                
                <div className="flex gap-1 text-gold-400 mb-4 md:mb-8">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                  ))}
                </div>

                <blockquote className="font-serif text-xl md:text-3xl leading-relaxed mb-6 md:mb-8 relative z-10">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                <div className="mt-auto border-t border-white/10 pt-4 md:pt-6">
                  <h4 className="font-bold text-lg md:text-xl text-white">{testimonials[currentIndex].name}</h4>
                  <p className="text-gold-400/80 text-xs md:text-sm uppercase tracking-wider">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons - Hidden on mobile side, moved to bottom */}
        <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-20">
          <button 
            onClick={() => paginate(-1)}
            className="p-3 rounded-full bg-white text-gg-navy shadow-lg hover:bg-gold-400 hover:text-white transition-all transform hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-20">
          <button 
            onClick={() => paginate(1)}
            className="p-3 rounded-full bg-white text-gg-navy shadow-lg hover:bg-gold-400 hover:text-white transition-all transform hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation Controls (Bottom) */}
        <div className="absolute -bottom-12 md:-bottom-12 left-0 right-0 flex justify-center items-center gap-6">
            {/* Mobile Arrows */}
            <button 
                onClick={() => paginate(-1)}
                className="md:hidden p-2 rounded-full bg-white text-gg-navy shadow-md hover:bg-gold-400 hover:text-white transition-colors"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-3">
                {testimonials.map((_, idx) => (
                    <button
                    key={idx}
                    onClick={() => {
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                    }}
                    className={`h-3 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'bg-gg-navy w-8' : 'bg-gg-taupe/50 w-3 hover:bg-gg-navy/50'
                    }`}
                    />
                ))}
            </div>

            {/* Mobile Arrows */}
            <button 
                onClick={() => paginate(1)}
                className="md:hidden p-2 rounded-full bg-white text-gg-navy shadow-md hover:bg-gold-400 hover:text-white transition-colors"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
      </div>
      
    </Section>
  );
}
