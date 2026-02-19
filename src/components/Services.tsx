import { useCallback, useEffect, useMemo, useState } from 'react';
import { Section, FadeIn } from './ui/Section';
import { motion, AnimatePresence, useReducedMotion, useDragControls } from 'framer-motion';
import { ArrowRight, Globe, ChefHat, Users, Palette, Leaf, ChevronLeft, ChevronRight } from 'lucide-react';

const advantages = [
  {
    id: 1,
    title: "Multi-Market Presence",
    subtitle: "Borderless Excellence",
    description: "Seamless operations across multiple cities and markets. Whether it's a destination wedding in Rajasthan or a corporate summit in Dubai, our logistical precision ensures the Global Gourmet standard travels with you.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    icon: Globe
  },
  {
    id: 2,
    title: "Innovation Kitchens",
    subtitle: "Chef-Driven",
    description: "Our kitchens are laboratories of taste. Led by Michelin-trained talent, we don't just follow trends—we define them through rigorous experimentation and culinary artistry.",
    image: "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?q=80&w=2062&auto=format&fit=crop",
    icon: ChefHat
  },
  {
    id: 3,
    title: "Event-Scale Adaptability",
    subtitle: "Intimate to Infinite",
    description: "Flawless execution, whether it's a private dinner for ten or a gala for two thousand. We scale our resources without compromising on the bespoke details.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
    icon: Users
  },
  {
    id: 4,
    title: "Integrated Curation",
    subtitle: "Styling & Logistics",
    description: "We go beyond the plate. Our team integrates food styling, table design, and service choreography to create a cohesive, immersive sensory masterpiece.",
    image: "https://images.unsplash.com/photo-1530103862676-de3c9da59af7?q=80&w=2070&auto=format&fit=crop",
    icon: Palette
  },
  {
    id: 5,
    title: "Mindful Sourcing",
    subtitle: "Sustainability",
    description: "Conscious luxury is our foundation. We prioritize locally sourced, seasonal ingredients and sustainable practices to minimize our footprint while maximizing flavor.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop",
    icon: Leaf
  }
];

export default function Services() {
  const [activeId, setActiveId] = useState<number>(1);
  const [activeImageFailed, setActiveImageFailed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const dragControls = useDragControls();
  const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const activeItem = useMemo(() => advantages.find(a => a.id === activeId) ?? advantages[0], [activeId]);
  const activeImageSrc = activeImageFailed ? '/logo.png' : activeItem.image;

  // Memoize handlers to prevent unnecessary re-renders
  const handleMouseEnter = useCallback((id: number) => setActiveId(id), []);
  const handleFocus = useCallback((id: number) => setActiveId(id), []);
  const handleClick = useCallback((id: number) => setActiveId(id), []);

  useEffect(() => {
    setActiveImageFailed(false);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [activeId]);

  const handleDragEnd = (event: any, info: any) => {
    if (!isMobile) return;
    const { offset, velocity } = info;
    if (offset.x < -50 || velocity.x < -500) {
      // Swipe left - go to next
      setActiveId(prev => prev >= advantages.length ? 1 : prev + 1);
    } else if (offset.x > 50 || velocity.x > 500) {
      // Swipe right - go to previous
      setActiveId(prev => prev <= 1 ? advantages.length : prev - 1);
    }
  };

  const goToSlide = (id: number) => {
    setActiveId(id);
  };

  return (
    <Section id="services" className="bg-gg-cream relative overflow-hidden py-24 md:py-32">
      {/* Background Elements for Texture */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gg-taupe/30 to-transparent" />
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-gg-navy/10 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[620px] h-[620px] bg-gold-400/10 blur-[130px] rounded-full pointer-events-none" />
      
      <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
      
        {/* LEFT COLUMN: Intro + Sticky Image Display */}
        <div className="md:order-1 flex flex-col gap-10">
            <FadeIn>
                <div className="w-full">
                    <span className="text-gold-500 font-medium tracking-widest uppercase text-sm mb-3 block">Why Global Gourmet?</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-gg-navy leading-tight mb-6">
                        The Global Gourmet <br /><span className="italic text-gold-500">Advantage</span>
                    </h2>
                    <p className="text-gg-slate/70 text-lg leading-relaxed max-w-2xl">
                        Confidence through capability. We redefine the standard of premium catering through scale, innovation, and precision.
                    </p>
                </div>
            </FadeIn>

            <div className="hidden md:block relative h-[600px] md:sticky md:top-32">
                <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gg-slate ring-1 ring-gg-taupe/20 bg-[url('/logo.png')] bg-center bg-no-repeat bg-[length:170px_170px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-gg-navy via-gg-slate to-black" />
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(212,175,55,0.35),transparent_45%),radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.18),transparent_45%)]" />
                    {activeImageFailed ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center px-10">
                        <img src="/logo.png" alt="Global Gourmet" className="h-14 w-auto mx-auto opacity-95" />
                        </div>
                    </div>
                    ) : null}
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={activeId}
                            src={activeImageSrc}
                            alt={activeItem.title}
                            onError={() => setActiveImageFailed(true)}
                            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
                            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: easeOut }}
                            className={"absolute inset-0 w-full h-full object-cover " + (activeImageFailed ? "opacity-0" : "opacity-100")}
                        />
                    </AnimatePresence>
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gg-navy/80 via-transparent to-transparent mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" />
                        
                        {/* Active Caption */}
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: easeOut }}
                            >
                                <span className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-2 block">
                                    {activeItem.subtitle}
                                </span>
                                <h3 className="text-white font-serif text-3xl">
                                    {activeItem.title}
                                </h3>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                
                {/* Decorative Offset Border */}
                <div className="absolute -inset-4 border border-gg-taupe/30 rounded-3xl -z-10" />
            </div>
        </div>

        {/* RIGHT COLUMN: Mobile Slider / Desktop List */}
        <div className="flex flex-col justify-center md:order-2">

            {/* Mobile Slider Interface */}
            <div className="md:hidden">
                {/* Slider Container */}
                <motion.div
                    drag="x"
                    dragControls={dragControls}
                    dragElastic={0.2}
                    dragMomentum={false}
                    onDragEnd={handleDragEnd}
                    className="relative overflow-hidden rounded-2xl"
                >
                    <AnimatePresence mode="wait">
                        {advantages.map((item) => {
                            const isActive = activeId === item.id;
                            const Icon = item.icon;

                            if (!isActive) return null;

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: 300 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -300 }}
                                    transition={{ duration: 0.3, ease: easeOut }}
                                    className="w-full"
                                >
                                    <div className="bg-white/70 border border-gold-400/40 rounded-2xl shadow-xl shadow-gg-navy/10 p-6">
                                        {/* Icon and Title */}
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gg-navy text-white flex items-center justify-center">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-gold-500 text-xs font-bold tracking-widest uppercase">
                                                        0{item.id}
                                                    </span>
                                                    <span className="text-gold-500 text-[11px] font-semibold tracking-[0.22em] uppercase">
                                                        {item.subtitle}
                                                    </span>
                                                </div>
                                                <h3 className="font-serif text-2xl text-gg-navy">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Mobile Image */}
                                        <div className="w-full h-56 rounded-xl overflow-hidden mb-4 relative ring-1 ring-gg-taupe/20">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gg-navy/20 mix-blend-multiply" />
                                        </div>

                                        {/* Description */}
                                        <p className="text-gg-slate/80 leading-relaxed text-base">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Slider Controls */}
                <div className="flex items-center justify-between mt-6">
                    <button
                        onClick={() => goToSlide(activeId <= 1 ? advantages.length : activeId - 1)}
                        className="p-2 rounded-full bg-gg-cream border border-gg-taupe/30 hover:bg-gg-navy hover:text-white transition-colors"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex gap-2">
                        {advantages.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => goToSlide(item.id)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    activeId === item.id
                                        ? 'bg-gg-navy w-6'
                                        : 'bg-gg-taupe/40 hover:bg-gg-taupe/60'
                                }`}
                                aria-label={`Go to slide ${item.id}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => goToSlide(activeId >= advantages.length ? 1 : activeId + 1)}
                        className="p-2 rounded-full bg-gg-cream border border-gg-taupe/30 hover:bg-gg-navy hover:text-white transition-colors"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Swipe Hint */}
                <div className="text-center mt-4">
                    <p className="text-gg-slate/60 text-sm">
                        Swipe or use arrows to navigate
                    </p>
                </div>
            </div>

            {/* Desktop List Interface */}
            <div className="hidden md:block">
                <div className="space-y-5">
                    {advantages.map((item, index) => {
                        const isActive = activeId === item.id;
                        const Icon = item.icon;

                        return (
                            <FadeIn key={item.id} delay={index * 0.1}>
                                <motion.div
                                    onMouseEnter={() => handleMouseEnter(item.id)}
                                    whileHover={prefersReducedMotion ? {} : { y: -2 }}
                                    transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: easeOut }}
                                    className={
                                      `group rounded-2xl border transition-all duration-500 ` +
                                      (isActive
                                        ? 'border-gold-400/40 bg-white/70 shadow-xl shadow-gg-navy/10'
                                        : 'border-gg-taupe/25 bg-white/30 hover:bg-white/50') +
                                      ' focus-within:ring-2 focus-within:ring-gold-400/40 focus-within:ring-offset-2 focus-within:ring-offset-gg-cream'
                                    }
                                >
                                    <button
                                        type="button"
                                        onFocus={() => handleFocus(item.id)}
                                        onClick={() => handleClick(item.id)}
                                        aria-expanded={isActive}
                                        aria-controls={`advantage-panel-${item.id}`}
                                        className="w-full text-left rounded-2xl outline-none"
                                    >
                                        <div className="px-6 md:px-7 py-6">
                                            <div className="flex items-start justify-between gap-6">
                                                <div className="flex items-start gap-4">
                                                    <div className={
                                                      `mt-1 w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-500 ` +
                                                      (isActive
                                                        ? 'bg-gg-navy text-white border-gg-navy/20'
                                                        : 'bg-gg-cream text-gg-navy border-gg-taupe/30 group-hover:border-gg-navy/30')
                                                    }>
                                                        <Icon className="w-5 h-5" />
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-gold-500' : 'text-gg-taupe'}`}>
                                                                0{item.id}
                                                            </span>
                                                            <span className={`text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 ${isActive ? 'text-gold-500' : 'text-gg-slate/60'}`}>
                                                                {item.subtitle}
                                                            </span>
                                                        </div>
                                                        <h3 className={`font-serif text-2xl md:text-3xl transition-colors duration-300 ${isActive ? 'text-gg-navy' : 'text-gg-slate'}`}>
                                                            {item.title}
                                                        </h3>
                                                    </div>
                                                </div>

                                                <div className={
                                                  `shrink-0 p-2 rounded-full transition-all duration-500 ` +
                                                  (isActive
                                                    ? 'bg-gg-navy text-white rotate-0'
                                                    : 'bg-gg-cream/60 text-gg-taupe -rotate-45 group-hover:text-gg-navy group-hover:bg-gg-cream')
                                                }>
                                                    <ArrowRight className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </button>

                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: isActive ? 'auto' : 0,
                                            opacity: isActive ? 1 : 0
                                        }}
                                        transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: easeOut }}
                                        className="overflow-hidden"
                                        id={`advantage-panel-${item.id}`}
                                    >
                                        <div className="px-6 md:px-7 pb-7">
                                            <div className="pt-5 border-t border-gg-taupe/15">
                                                <p className="text-gg-slate/80 leading-relaxed text-base md:text-lg">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>
        </div>
      </div>
    </Section>
  );
}
