import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useDragControls,
} from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowRight,
  CheckCircle,
  Globe,
  ChefHat,
  Users,
  Palette,
  Leaf,
  Sparkles,
  HeartHandshake,
  Building2,
  MapPin,
  UtensilsCrossed,
  PartyPopper,
  ClipboardList,
  CookingPot,
  ConciergeBell,
  CheckCircle2,
  Play,
  ShieldCheck,
  Globe2,
  Mail,
  Phone,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  Loader2,
} from 'lucide-react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

gsap.registerPlugin(ScrollTrigger);

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];



type JQueryConstructor = typeof import('jquery');

declare global {
  interface Window {
    jQuery?: JQueryConstructor;
    $?: JQueryConstructor;
  }
}

let jqueryInstance: JQueryConstructor | null = null;
let owlCarouselReady = false;

const ensureMemoriesCarouselReady = async (): Promise<JQueryConstructor | null> => {
  if (typeof window === 'undefined') return null;

  if (!jqueryInstance) {
    try {
      const module = await import('jquery');
      jqueryInstance = (module.default ?? module) as JQueryConstructor;
      window.$ = window.jQuery = jqueryInstance;
    } catch (error) {
      console.warn('Unable to load jQuery for Memories carousel:', error);
      return null;
    }
  }

  if (!owlCarouselReady) {
    try {
      await import('owl.carousel');
      owlCarouselReady = true;
    } catch (error) {
      console.warn('Unable to load Owl Carousel script for Memories:', error);
      return null;
    }
  }

  return jqueryInstance;
};



const testimonials = [
  {
    quote:
      "Thank you once again for preparing and presenting such an amazing menu. Our guests—especially our Indian family—were absolutely delighted!",
    author: 'Khun. Som and Mr. Vishwast',
    event: 'Wedding Client',
  },
  {
    quote:
      'A heartfelt thank you to you, Gaurav, and the entire team The food was appreciated by every single guest. Even those who usually find faults absolutely loved it!',
    author: 'Mrs. Mrudula and Mr. Shabir',
    event: 'Wedding Client',
  },
  {
    quote:
      'We are truly grateful to the Global Gourmet Bangkok team for their exceptional service throughout the wedding events. Everything was handled with great professionalism, warmth, and attention to detail. Our guests were extremely happy, and their contribution made Rajiv and Alia’s celebration smooth, memorable, and truly special.',
    author: 'Geeta & Anita',
    event: 'Wedding Client',
  },
  {
    quote:
      'Global Gourmet exceeded all our expectations. The attention to detail and the quality of the food were simply outstanding.',
    author: 'Bhavin & Priya ',
    event: 'Corporate Event',
  },
];

type MemoryItem = {
  src: string;
  alt: string;
  caption: string;
  label: string;
};

const memories: MemoryItem[] = [
  {
    src: '/images/Events/Copy of B1620464.webp',
    alt: 'Grand event celebration',
    caption: 'GRAND CELEBRATIONS',
    label: 'Royal Gala Evening',
  },
  {
    src: '/images/Events/Copy of B1620479.webp',
    alt: 'Elegant event setup',
    caption: 'ELEGANT SETUPS',
    label: 'Luxe Event Design',
  },
  {
    src: '/images/Events/Copy of B1620636.webp',
    alt: 'Spectacular event venue',
    caption: 'SPECTACULAR VENUES',
    label: 'Grand Hall Experience',
  },
  {
    src: '/images/Events/Copy of B1621065.webp',
    alt: 'Corporate celebration',
    caption: 'CORPORATE EXCELLENCE',
    label: 'Executive Gathering',
  },
  {
    src: '/images/Events/Copy of B1621162.webp',
    alt: 'Festive celebration',
    caption: 'FESTIVE MOMENTS',
    label: 'Celebration Soirée',
  },
  {
    src: '/images/Events/Copy of B1621171.webp',
    alt: 'Private event gathering',
    caption: 'PRIVATE GATHERINGS',
    label: 'Intimate Reception',
  },
  {
    src: '/images/Events/Copy of B1630060.webp',
    alt: 'Outdoor event setting',
    caption: 'OUTDOOR ELEGANCE',
    label: 'Garden Event Setup',
  },
  {
    src: '/images/Events/Copy of B1630146.webp',
    alt: 'Evening event ambiance',
    caption: 'EVENING AMBIANCE',
    label: 'Twilight Affair',
  },
  {
    src: '/images/Events/Copy of B1630239.webp',
    alt: 'Artistic event decor',
    caption: 'ARTISTIC DECOR',
    label: 'Design Excellence',
  },
  {
    src: '/images/Events/Copy of B1630244.webp',
    alt: 'Premium event styling',
    caption: 'PREMIUM STYLING',
    label: 'Curated Details',
  },
  {
    src: '/images/Events/Copy of B1630832.webp',
    alt: 'Lavish celebration',
    caption: 'LAVISH CELEBRATIONS',
    label: 'Grand Festivity',
  },
  {
    src: '/images/Events/Copy of DJI_20251220124147_0765_D.webp',
    alt: 'Aerial event view',
    caption: 'BREATHTAKING SCALE',
    label: 'Panoramic Vista',
  },
  {
    src: '/images/Events/Copy of DJI_20251220130842_0797_D.webp',
    alt: 'Event venue aerial',
    caption: 'VENUE GRANDEUR',
    label: 'Skyline Perspective',
  },
  {
    src: '/images/Events/Copy of DJI_20251220164951_0813_D.webp',
    alt: 'Sunset event atmosphere',
    caption: 'GOLDEN HOUR',
    label: 'Sunset Celebration',
  },
  {
    src: '/images/Events/Copy of DJI_20251221142258_0194_D.webp',
    alt: 'Destination event setup',
    caption: 'DESTINATION EVENTS',
    label: 'Scenic Gathering',
  },
];

const advantages = [
  {
    id: 1,
    title: 'Multi-Market Presence',
    subtitle: 'Borderless Excellence',
    description:
      'Seamless operations across multiple cities and markets. Whether it is a destination wedding in Rajasthan or a corporate summit in Dubai, our logistical precision ensures the Global Gourmet standard travels with you.',
    image: '/images/1-png.webp',
    icon: Globe,
  },
  {
    id: 2,
    title: 'Innovation Kitchens',
    subtitle: 'Chef-Driven',
    description:
      "Our kitchens are laboratories of taste. Led by Michelin-trained talent, we don't just follow trends—we define them through rigorous experimentation and culinary artistry.",
    image:
      '/images/1.webp',
    icon: ChefHat,
  },
  {
    id: 3,
    title: 'Event-Scale Adaptability',
    subtitle: 'Intimate to Infinite',
    description:
      "Flawless execution, whether it is a private dinner for ten or a gala for two thousand. We scale our resources without compromising on the bespoke details.",
    image:
      '/images/3.webp',
    icon: Users,
  },
  {
    id: 4,
    title: 'Integrated Curation',
    subtitle: 'Styling & Logistics',
    description:
      'We go beyond the plate. Our team integrates food styling, table design, and service choreography to create a cohesive, immersive sensory masterpiece.',
    image: '/images/4.webp',
    icon: Palette,
  },
  {
    id: 5,
    title: 'Mindful Sourcing',
    subtitle: 'Sustainability',
    description:
      'Conscious luxury is our foundation. We prioritize locally sourced, seasonal ingredients and sustainable practices to minimize our footprint while maximizing flavor.',
    image: '/images/mindful-sourcing.webp',
    icon: Leaf,
  },
];

const experiences = [
  {
    title: 'Weddings & Celebrations',
    subtitle: 'Signature Moments',
    description:
      'From destination weddings to intimate ceremonies, we design menus and service that feel effortless and unforgettable.',
    icon: HeartHandshake,
  },
  {
    title: 'Corporate & Executive',
    subtitle: 'Precision at Scale',
    description:
      'Boardroom luncheons, product launches, and galas delivered with flawless timing, discretion, and polish.',
    icon: Building2,
  },
  {
    title: 'Private Dining',
    subtitle: 'Restaurant at Home',
    description:
      'Chef-led tasting experiences in private residences—beautifully plated, thoughtfully paired, and fully hosted.',
    icon: UtensilsCrossed,
  },
  {
    title: 'Experiential Pop-Ups',
    subtitle: 'Immersive Design',
    description:
      'Food styling, choreography, and atmosphere unified into one story—crafted for the camera and for memory.',
    icon: Sparkles,
  },
  {
    title: 'Destination Events',
    subtitle: 'Global Ready',
    description:
      'Our systems travel well. We execute across cities and venues while keeping the same Global Gourmet standard.',
    icon: MapPin,
  },
  {
    title: 'Luxury Social',
    subtitle: 'High Touch',
    description:
      'Anniversaries, milestone birthdays, and soirées with custom menus, bespoke bars, and white-glove hospitality.',
    icon: PartyPopper,
  },
];

const steps = [
  {
    title: 'Discovery & Brief',
    description:
      'We align on your vision, guest profile, venue realities, and success criteria—then map the experience end-to-end.',
    icon: ClipboardList,
  },
  {
    title: 'Menu & Styling Design',
    description:
      'Cuisine direction, tasting notes, plating language, and service choreography designed as one cohesive aesthetic.',
    icon: Sparkles,
  },
  {
    title: 'Production Planning',
    description:
      'Ingredient sourcing, prep schedules, staffing, transport, and contingencies—built for precision and calm execution.',
    icon: CookingPot,
  },
  {
    title: 'On-Site Service',
    description:
      'White-glove hospitality, timing control, and details handled quietly—so the event feels effortless to you.',
    icon: ConciergeBell,
  },
  {
    title: 'Finish & Reset',
    description:
      'We close with the same discipline: breakdown, venue reset, and post-event notes for continuous refinement.',
    icon: CheckCircle2,
  },
];

const menuItems = [
  {
    category: 'MODERN CHAAT',
    name: 'Coconut Pani Puri',
    desc: 'Coconut pani puri served in artisanal porcelain with refined presentation.',
    image: 'public/images/food/coconut pani puri.png',
  },
  {
    category: 'SIGNATURE STARTER',
    name: 'Chapli Kebab',
    desc: 'Chapli kebab paired with glazed sweet potato, fresh herbs, and vibrant chutney accents.',
    image: 'public/images/food/chapli kebab sweet potato.png',
  },
  {
    category: 'EVENT STYLING',
    name: 'Luxury Event Decoration',
    desc: 'Elegant tablescapes with candlelight, florals, and bespoke luxury detailing.',
    image: 'public/images/food/105.png',
  },
  {
    category: 'CANAPÉ SELECTION',
    name: ' Avocado Tartlet',
    desc: 'Avocado tartlet topped with seasonal garnish and delicate edible florals.',
    image: 'public/images/food/Avocado Tartlet.png',
  },
];



const experienceCenterItems = [
  {
    id: 1,
    title: 'Culinary Innovation Lab',
    subtitle: 'R&D Excellence',
    description:
      'Our state-of-the-art culinary innovation center where new recipes are born, techniques are perfected, and the future of gastronomy is crafted by our world-class chefs.',
    image: '/images/culinary.webp',
    icon: ChefHat,
  },
  {
    id: 2,
    title: 'Interactive Workshops',
    subtitle: 'Hands-On Learning',
    description:
      'Immersive cooking workshops and masterclasses led by our executive chefs. Perfect for corporate team-building, culinary enthusiasts, and aspiring professionals.',
    image: '/images/workspace.webp',
    icon: Flame,
  },
  {
    id: 3,
    title: 'Product Showcase',
    subtitle: 'Experiential Space',
    description:
      'A dedicated space to experience our culinary offerings firsthand. From menu tastings to ingredient showcases, discover the artistry behind every dish we create.',
    image: '/images/experience-center/3.webp',
    icon: UtensilsCrossed,
  },
];

const Section: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}> = ({ children, className, id, dark = false }) => (
  <section
    id={id}
    className={`py-20 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden scroll-mt-24 md:scroll-mt-28 lg:scroll-mt-32 ${dark ? 'bg-gg-slate text-gg-cream' : 'bg-gg-cream text-gg-slate'
      } ${className ?? ''}`}
  >
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}> = ({ children, delay = 0, direction = 'up' }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.8, ease: easeOut, delay },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};



const HeroSection = React.memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -80],
  );
  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1.15, 1.15] : [1.15, 1.25],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -120],
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);


  return (
    <section ref={sectionRef} className="relative w-full h-[170vh] md:h-[200vh] bg-gg-slate">
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform will-change-opacity">
            <img
              src="/images/hero_real.webp"
              alt="Hero Background"
              className="w-full h-full object-cover opacity-90"
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gg-slate/40 mix-blend-multiply will-change-transform" />
          <div className="absolute inset-0 bg-gradient-to-t from-gg-slate/80 via-transparent to-transparent will-change-transform" />
        </div>
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto will-change-transform will-change-opacity">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
            <span className="inline-block py-1 px-3 border border-gg-cream/30 rounded-full text-xs font-medium tracking-widest uppercase text-gg-cream/90 mb-6 backdrop-blur-sm">
              Est. 2020
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="font-serif text-5xl md:text-7xl lg:text-8xl text-gg-cream font-medium mb-6 leading-tight">
            Taste the <span className="italic text-white">Extraordinary</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="text-lg md:text-xl text-gg-cream/90 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Elevating events with bespoke culinary experiences. From intimate gatherings to grand celebrations, we craft memories through flavor.
          </motion.p>

        </motion.div>
        <motion.div style={{ opacity: indicatorOpacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gg-cream flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase opacity-70">Scroll</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
            <ArrowDown className="w-5 h-5 opacity-70" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

const AboutSection = React.memo(() => (
  <Section id="about">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div className="relative">
        <FadeIn direction="right">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/Creative123.webp"
              alt="Chef plating food"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 bg-gg-mist rounded-2xl -z-10" />
          <div className="absolute -top-6 -right-6 w-1/2 h-1/2 border-2 border-gg-navy/30 rounded-2xl -z-10" />
        </FadeIn>
      </div>
      <div>
        <FadeIn direction="left">
          <span className="text-gg-navy font-semibold tracking-wider uppercase text-sm mb-2 block">
            Our Philosophy
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-gg-slate mb-6 leading-tight">
            We Believe Food is <br />
            <span className="text-gg-navy italic">Art & Connection</span>
          </h2>
          <p className="text-gg-slate/80 text-lg leading-relaxed mb-6">
            Global Gourmet was built on a simple belief: food is not just served - it is felt. Rooted in culture, guided by craft, and delivered with precision, we design culinary experiences that connect people, places, and moments.
          </p>
          <p className="text-gg-slate/80 text-lg leading-relaxed mb-8">
            From intimate rituals to grand celebrations, every menu is shaped by intention, every detail by discipline, and every experience by soul.

          </p>
          <div className="space-y-4">
            {[
              'Chef-led menus inspired by regional authenticity',
              'End-to-end execution with zero outsourcing',
              'Scalable systems without compromising soul',
              'Emotionally intelligent service teams',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-gg-navy flex-shrink-0" />
                <span className="text-gg-slate font-medium">{item}</span>
              </div>
            ))}
          </div>
          <Link to="/team" className="mt-10 inline-block px-8 py-3 border-2 border-gg-navy text-gg-navy rounded-full font-semibold hover:bg-gg-navy hover:text-white transition-all">
            Meet the Team
          </Link>
        </FadeIn>
      </div>
    </div>
  </Section>
));

const VideoSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinContentRef = useRef<HTMLDivElement | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const gradientOverlayRef = useRef<HTMLDivElement | null>(null);
  const darkOverlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => video.play().catch(() => undefined);

    video.play().catch((error) => {
      console.log('Video play failed:', error);
      const onUserInteract = () => {
        tryPlay();
        document.removeEventListener('click', onUserInteract);
        document.removeEventListener('touchstart', onUserInteract);
      };
      document.addEventListener('click', onUserInteract, { once: true });
      document.addEventListener('touchstart', onUserInteract, { once: true });
    });
  }, []);

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !pinContentRef.current ||
      !contentRef.current ||
      !videoWrapperRef.current ||
      !gradientOverlayRef.current ||
      !darkOverlayRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const textTargets = contentRef.current
        ? (Array.from(contentRef.current.children) as HTMLElement[])
        : [];

      // Initial fade-in animation for text elements
      gsap.fromTo(textTargets,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.15,
          delay: 0.3,
        }
      );

      // Scroll-based parallax animation
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=200%',
            scrub: 1,
            pin: pinContentRef.current,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        .to(
          contentRef.current,
          {
            yPercent: -25,
            opacity: 0,
            ease: 'power3.out',
          },
          0,
        )
        .to(
          videoWrapperRef.current,
          {
            scale: 1.15,
            yPercent: 8,
            ease: 'none',
          },
          0,
        )
        .to(
          gradientOverlayRef.current,
          {
            opacity: 0.5,
            ease: 'none',
          },
          0.05,
        )
        .to(
          darkOverlayRef.current,
          {
            opacity: 0.25,
            ease: 'none',
          },
          0.05,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-black min-h-screen overflow-hidden">
      <div ref={pinContentRef} className="relative h-screen overflow-hidden">
        <div ref={videoWrapperRef} className="absolute inset-0 will-change-transform will-change-opacity">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-70"
            preload="none"
          >
            <source
              src="https://video.gumlet.io/67489ec0dad6bb7514b3bf09/696f49996f4a3a8ce1146c9f/download.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div
          ref={gradientOverlayRef}
          className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 will-change-transform will-change-opacity"
        />
        <div
          ref={darkOverlayRef}
          className="absolute inset-0 bg-black/40 will-change-transform will-change-opacity"
        />
        <div
          ref={contentRef}
          className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto will-change-transform will-change-opacity"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-8 mx-auto cursor-pointer hover:scale-110 hover:bg-white/20 transition-all duration-500 group">
            <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-current group-hover:text-gg-cream transition-colors ml-1" />
          </div>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight leading-tight">
            Poetry in <span className="text-white italic">Motion</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Witness the dedication, precision, and passion that goes into every plate we serve.
            From the kitchen to your table, we orchestrate a symphony of flavors.
          </p>
          <button className="px-8 py-3 border border-white/30 rounded-full text-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300">
            Watch Full Reel
          </button>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = React.memo(() => {
  const [activeId, setActiveId] = useState<number>(1);
  const [activeImageFailed, setActiveImageFailed] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const activeItem = useMemo(() => advantages.find((a) => a.id === activeId) ?? advantages[0], [activeId]);
  const activeImageSrc = activeImageFailed ? '/logo.png' : activeItem.image;

  // Memoize the hover handler to prevent unnecessary re-renders
  const handleMouseEnter = useCallback((id: number) => {
    setActiveId(id);
  }, []);

  const handleFocus = useCallback((id: number) => {
    setActiveId(id);
  }, []);

  const handleClick = useCallback((id: number) => {
    setActiveId(id);
  }, []);

  useEffect(() => {
    setActiveImageFailed(false);
  }, [activeId]);

  return (
    <Section id="services" className="bg-gg-cream relative overflow-hidden py-24 md:py-32">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gg-taupe/30 to-transparent" />
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-gg-navy/10 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[620px] h-[620px] bg-gg-navy/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div className="md:order-1 flex flex-col gap-10">
          <FadeIn>
            <div>
              <span className="text-gg-navy font-medium tracking-widest uppercase text-sm mb-3 block">
                Why Global Gourmet?
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-gg-navy leading-tight mb-6">
                The Global Gourmet <br />
                <span className="italic text-gg-navy">Advantage</span>
              </h2>
              <p className="text-gg-slate/70 text-lg leading-relaxed max-w-2xl">
                Confidence through capability. We redefine the standard of premium catering through
                scale, innovation, and precision.
              </p>
            </div>
          </FadeIn>
          <div className="hidden md:block relative h-[600px] md:sticky md:top-32">
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gg-slate ring-1 ring-gg-taupe/20 bg-[url('/logo.png')] bg-center bg-no-repeat bg-[length:170px_170px]">
              <div className="absolute inset-0 bg-gradient-to-br from-gg-navy via-gg-slate to-black" />
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(212,175,55,0.35),transparent_45%),radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.18),transparent_45%)]" />
              {activeImageFailed && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-10">
                    <img src="/logo.png" alt="Global Gourmet" className="h-14 w-auto mx-auto opacity-95" />
                  </div>
                </div>
              )}
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
                  className={`absolute inset-0 w-full h-full object-cover ${activeImageFailed ? 'opacity-0' : 'opacity-100'}`}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-gg-navy/80 via-transparent to-transparent mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: easeOut }}
                  >
                    <span className="text-white text-xs font-bold tracking-widest uppercase mb-2 block">
                      {activeItem.subtitle}
                    </span>
                    <h3 className="text-white font-serif text-3xl">{activeItem.title}</h3>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="absolute -inset-4 border border-gg-taupe/30 rounded-3xl -z-10" />
          </div>
        </div>
        <div className="flex flex-col justify-center md:order-2">
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
                    className={`group rounded-2xl border transition-all duration-500 ${isActive
                      ? 'border-gg-navy/40 bg-white/70 shadow-xl shadow-gg-navy/10'
                      : 'border-gg-taupe/25 bg-white/30 hover:bg-white/50'
                      } focus-within:ring-2 focus-within:ring-gg-navy/40 focus-within:ring-offset-2 focus-within:ring-offset-gg-cream`}
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
                            <div
                              className={`mt-1 w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-500 ${isActive
                                ? 'bg-gg-navy text-white border-gg-navy/20'
                                : 'bg-gg-cream text-gg-navy border-gg-taupe/30 group-hover:border-gg-navy/30'
                                }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-gg-navy' : 'text-gg-taupe'}`}>
                                  0{item.id}
                                </span>
                                <span className={`text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 ${isActive ? 'text-gg-navy' : 'text-gg-slate/60'}`}>
                                  {item.subtitle}
                                </span>
                              </div>
                              <h3 className={`font-serif text-2xl md:text-3xl transition-colors duration-300 ${isActive ? 'text-gg-navy' : 'text-gg-slate'}`}>
                                {item.title}
                              </h3>
                            </div>
                          </div>
                          <div
                            className={`shrink-0 p-2 rounded-full transition-all duration-500 ${isActive
                              ? 'bg-gg-navy text-white rotate-0'
                              : 'bg-gg-cream/60 text-gg-taupe -rotate-45 group-hover:text-gg-navy group-hover:bg-gg-cream'
                              }`}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: isActive ? 'auto' : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: easeOut }}
                      className="overflow-hidden"
                      id={`advantage-panel-${item.id}`}
                    >
                      <div className="px-6 md:px-7 pb-7">
                        <div className="pt-5 border-t border-gg-taupe/15">
                          <div className="lg:hidden w-full h-48 rounded-xl overflow-hidden mb-5 relative ring-1 ring-gg-taupe/20">
                            <img
                              src={item.image}
                              alt={item.title}
                              onError={(e) => {
                                e.currentTarget.src = '/logo.png';
                              }}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gg-navy/20 mix-blend-multiply" />
                          </div>
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
    </Section>
  );
});

const BrandSplitSection = React.memo(() => (
  <section className="relative w-full h-screen max-h-[900px] overflow-hidden">
    <Link
      to="/brands/the-fifth-course"
      className="group relative w-full h-full overflow-hidden block"
    >
      <div className="absolute inset-0 bg-gg-slate">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80">
          <source src="https://video.gumlet.io/67489ec0dad6bb7514b3bf09/6981ef084db88a967f9f9e4e/download.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gg-navy/60 group-hover:bg-gg-slate/80 transition-colors duration-700 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 z-10">
        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="relative">
          <span className="block text-gold-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
            Avant-Garde
          </span>
          <h2 className="font-serif text-5xl md:text-8xl text-white mb-4 group-hover:text-gold-400 transition-colors duration-500">
            The Fifth Course
          </h2>
          <div className="w-12 h-0.5 bg-gold-400 mx-auto my-8 transition-all duration-500 group-hover:w-32" />
          <p className="text-white/90 max-w-xl mx-auto font-light text-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 hidden md:block">
            Curated culinary experiences crafted with precision and passion.          </p>
        </motion.div>
        <div className="absolute bottom-12 md:bottom-24 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <span className="flex items-center gap-3 text-gold-400 text-sm font-semibold tracking-widest uppercase border border-gold-400/30 px-8 py-4 rounded-full hover:bg-gold-400 hover:text-gg-slate transition-all">
            Explore Innovation <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  </section>
));

const ExperiencesSection = React.memo(() => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <Section id="experiences" className="relative bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 -right-28 w-[520px] h-[520px] bg-gg-navy/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-[640px] h-[640px] bg-gg-navy/10 blur-[140px] rounded-full" />
      </div>
      <div className="relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">
          <FadeIn>
            <div className="max-w-2xl">
              <span className="text-gg-navy font-medium tracking-widest uppercase text-sm mb-3 block">
                Experiences
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-gg-navy leading-tight mb-5">
                Experiences We <span className="italic text-gg-navy">Create</span>
              </h2>
              <p className="text-gg-slate/70 text-lg leading-relaxed">
                Every event is a composition—menu, styling, service, and logistics working in
                harmony. Choose the format, we will craft the feeling.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="rounded-2xl border border-gg-taupe/25 bg-white/50 backdrop-blur-sm px-6 py-5 max-w-xl">
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gg-slate/70">
                A refined process, a consistent standard
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gg-taupe/40 to-transparent" />
                <span className="text-gg-navy text-xs font-bold tracking-widest uppercase">
                  Global Gourmet
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={idx * 0.08}>
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { y: -6 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: easeOut }}
                  className="group h-full rounded-2xl border border-gg-taupe/25 bg-white/60 hover:bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-xl hover:shadow-gg-navy/10 transition-all duration-500"
                >
                  <div className="p-7">
                    <div className="flex items-start justify-between gap-6 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gg-cream border border-gg-taupe/25 flex items-center justify-center text-gg-navy group-hover:border-gg-navy/25 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gg-navy/90">
                        {item.subtitle}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-gg-navy mb-3">{item.title}</h3>
                    <p className="text-gg-slate/75 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </Section>
  );
});

const CraftExecutionSection = React.memo(() => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <Section id="craft" className="relative bg-gg-cream">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gg-taupe/30 to-transparent" />
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <FadeIn>
            <span className="text-gg-navy font-medium tracking-widest uppercase text-sm mb-3 block">
              Execution
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-gg-navy leading-tight mb-6">
              Craft Detail & <span className="italic text-gg-navy">Execution</span>
            </h2>
            <p className="text-gg-slate/70 text-lg leading-relaxed">
              Luxury is consistency. Our work is built on systems that protect the details—so your
              guests feel the magic, not the mechanics.
            </p>
          </FadeIn>
        </div>
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl border border-gg-taupe/25 bg-white/60 backdrop-blur-sm shadow-sm overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-gg-navy/10 blur-[120px] rounded-full" />
              <div className="absolute -bottom-28 -right-28 w-[520px] h-[520px] bg-gg-navy/10 blur-[130px] rounded-full" />
            </div>
            <div className="relative p-7 md:p-10">
              <div className="relative">
                <div className="absolute left-[22px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-gg-taupe/35 to-transparent" />
                <div className="space-y-7">
                  {steps.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <FadeIn key={step.title} delay={idx * 0.08}>
                        <motion.div
                          whileHover={prefersReducedMotion ? {} : { x: 6 }}
                          transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: easeOut }}
                          className="flex gap-6"
                        >
                          <div className="shrink-0 relative">
                            <div className="w-11 h-11 rounded-2xl bg-gg-cream border border-gg-taupe/25 flex items-center justify-center text-gg-navy">
                              <Icon className="w-5 h-5" />
                            </div>
                          </div>
                          <div className="pt-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-xs font-bold tracking-widest uppercase text-gg-navy">
                                0{idx + 1}
                              </span>
                              <h3 className="font-serif text-2xl text-gg-navy">{step.title}</h3>
                            </div>
                            <p className="text-gg-slate/75 leading-relaxed">{step.description}</p>
                          </div>
                        </motion.div>
                      </FadeIn>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});

const ExperienceCenterSection = React.memo(() => {
  const [activeId, setActiveId] = useState<number>(1);
  const prefersReducedMotion = useReducedMotion();
  const activeItem = useMemo(() => experienceCenterItems.find((e) => e.id === activeId) ?? experienceCenterItems[0], [activeId]);

  // Memoize handlers to prevent re-renders
  const handleMouseEnter = useCallback((id: number) => setActiveId(id), []);
  const handleFocus = useCallback((id: number) => setActiveId(id), []);
  const handleClick = useCallback((id: number) => setActiveId(id), []);

  return (
    <Section id="experience-center" className="relative overflow-hidden bg-gg-cream">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gg-navy/10 blur-[140px] rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-gg-navy/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="lg:col-span-5">
          <FadeIn>
            <span className="text-gg-navy font-medium tracking-widest uppercase text-sm mb-3 block">
              Experience Center
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gg-slate leading-tight mb-6">
              Experience{' '}
              <span className="italic text-gg-navy">Center</span>
            </h2>
            <p className="text-gg-slate/70 text-lg leading-relaxed mb-10">
              Discover our cutting-edge culinary experience center—where innovation meets gastronomy.
              A space dedicated to culinary exploration, workshops, and immersive food experiences.
            </p>
          </FadeIn>

          {/* Experience Cards */}
          <div className="space-y-4">
            {experienceCenterItems.map((item, index) => {
              const isActive = activeId === item.id;
              const Icon = item.icon;
              return (
                <FadeIn key={item.id} delay={index * 0.1}>
                  <motion.div
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    whileHover={prefersReducedMotion ? {} : { x: 8 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: easeOut }}
                    className={`group cursor-pointer rounded-2xl border transition-all duration-500 ${isActive
                      ? 'border-gg-navy/30 bg-white shadow-xl shadow-gg-navy/10'
                      : 'border-gg-taupe/30 bg-white/60 hover:bg-white/80'
                      }`}
                  >
                    <button
                      type="button"
                      onFocus={() => handleFocus(item.id)}
                      onClick={() => handleClick(item.id)}
                      aria-expanded={isActive}
                      className="w-full text-left rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-gg-navy/40 focus-visible:ring-offset-2 focus-visible:ring-offset-gg-cream"
                    >
                      <div className="px-6 py-5">
                        <div className="flex items-start gap-4">
                          <div
                            className={`mt-1 w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 ${isActive
                              ? 'bg-gg-navy text-white border-gg-navy/20'
                              : 'bg-gg-cream text-gg-slate border-gg-taupe/30 group-hover:border-gg-navy/30'
                              }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span
                                className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-gg-navy' : 'text-gg-slate/60'
                                  }`}
                              >
                                0{item.id}
                              </span>
                              <span
                                className={`text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 ${isActive ? 'text-gg-navy' : 'text-gg-slate/50'
                                  }`}
                              >
                                {item.subtitle}
                              </span>
                            </div>
                            <h3
                              className={`font-serif text-xl md:text-2xl transition-colors duration-300 ${isActive ? 'text-gg-slate' : 'text-gg-slate/80'
                                }`}
                            >
                              {item.title}
                            </h3>
                          </div>
                          <div
                            className={`shrink-0 p-2 rounded-full transition-all duration-500 ${isActive
                              ? 'bg-gg-navy text-white rotate-0'
                              : 'bg-gg-cream text-gg-slate/60 -rotate-45 group-hover:text-gg-slate group-hover:bg-gg-mist'
                              }`}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Expanded Content */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isActive ? 'auto' : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: easeOut }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <div className="pt-4 border-t border-gg-taupe/20">
                          {/* Mobile Image */}
                          <div className="lg:hidden w-full h-48 rounded-xl overflow-hidden mb-4 relative ring-1 ring-gg-taupe/20">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gg-navy/20 mix-blend-multiply" />
                          </div>
                          <p className="text-gg-slate/70 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>

          {/* CTA Button */}
          <FadeIn delay={0.4}>
            <div className="mt-10">
              <Link to="/experience-center" className="group inline-flex items-center gap-3 px-8 py-4 bg-gg-navy text-white rounded-full font-semibold transition-all hover:bg-gg-slate hover:scale-105 shadow-lg shadow-gg-navy/20">
                Explore Experience Center
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Right Image Display - Desktop Only */}
        <div className="hidden lg:block lg:col-span-7">
          <FadeIn direction="left">
            <div className="relative">
              {/* Main Image */}
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gg-taupe/20">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeId}
                    src={activeItem.image}
                    alt={activeItem.title}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: easeOut }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-gg-slate/80 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-gg-slate/40 via-transparent to-transparent" />

                {/* Floating Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-8 pb-28">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: easeOut }}
                    >
                      <span className="text-gg-cream text-xs font-bold tracking-widest uppercase mb-2 block">
                        {activeItem.subtitle}
                      </span>
                      <h3 className="text-white font-serif text-3xl">{activeItem.title}</h3>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-gg-taupe/30 rounded-[2rem] -z-10" />

              {/* Stats Badges */}
              <div className="absolute -top-6 -right-6 bg-gg-navy text-white px-6 py-4 rounded-2xl shadow-xl">
                <div className="font-serif text-2xl font-medium">50+</div>
                <div className="text-xs tracking-widest uppercase text-white/70">Events Monthly</div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md border border-gg-taupe/30 text-gg-slate px-6 py-4 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <ChefHat className="w-6 h-6 text-gg-navy" />
                  <div>
                    <div className="font-serif text-lg">Expert Chefs</div>
                    <div className="text-xs text-gg-slate/60">Michelin-trained team</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
});

const MenuPreviewSection = React.memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const dragControls = useDragControls();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDragEnd = (event: any, info: any) => {
    if (!isMobile) return;
    const { offset, velocity } = info;
    if (offset.x < -50 || velocity.x < -500) {
      // Swipe left - go to next
      setCurrentIndex(prev => (prev + 1) % menuItems.length);
    } else if (offset.x > 50 || velocity.x > 500) {
      // Swipe right - go to previous
      setCurrentIndex(prev => (prev - 1 + menuItems.length) % menuItems.length);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + menuItems.length) % menuItems.length);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % menuItems.length);
  };

  return (
    <Section id="menu" dark className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 px-6 md:px-0">
          <FadeIn>
            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-2">Seasonal Highlights</h2>
              <p className="text-stone-400">A glimpse into our current favorite creations.</p>
            </div>
          </FadeIn>

        </div>

        {/* Mobile Slider Interface */}
        <div className="md:hidden relative w-full">
          <div className="overflow-hidden">
            <motion.div
              drag="x"
              dragControls={dragControls}
              dragElastic={0.2}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              animate={{
                x: `-${currentIndex * 100}%`
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex w-full"
            >
              {menuItems.map((item, index) => {
                return (
                  <motion.div
                    key={item.name}
                    className="w-full shrink-0 px-6"
                  >
                    <div className="flex flex-col gap-4">
                      <article className="group relative h-full min-h-[420px] rounded-[32px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.45)] bg-gradient-to-b from-white/10 to-white/5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                        />
                        <div
                          className={`absolute inset-0 transition-colors duration-500 bg-gradient-to-t ${index % 2 === 0
                            ? 'from-emerald-900/90 via-emerald-700/40 to-transparent'
                            : 'from-purple-900/90 via-purple-700/40 to-transparent'
                            }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90" />
                        <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 gap-3">
                          <div className="space-y-3">
                            <span className="text-white/80 text-xs tracking-[0.35em] uppercase block">
                              {item.category}
                            </span>
                            <p className="text-white/85 text-sm leading-relaxed">{item.desc}</p>
                              <div className="flex items-center justify-center pt-3">
                                <Link to="/contact" className="inline-flex items-center gap-3 text-white text-sm font-semibold tracking-wide uppercase border border-white/40 rounded-full px-5 py-2 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                                  Explore Now
                                  <span className="text-base leading-none">→</span>
                                </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                      <h3 className="text-white text-2xl font-serif leading-tight px-2 text-center">
                        {item.name}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-between mt-6 px-6">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {menuItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index
                    ? 'bg-white w-6'
                    : 'bg-white/40 hover:bg-white/60'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Swipe Hint */}
          <div className="text-center mt-4">
            <p className="text-white/60 text-sm">
              Swipe or use arrows to navigate
            </p>
          </div>
        </div>

        {/* Desktop Grid Interface */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, index) => (
            <FadeIn key={item.name} delay={index * 0.12}>
              <div className="flex flex-col gap-4">
                <article className="group relative h-full min-h-[420px] rounded-[32px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.45)] bg-gradient-to-b from-white/10 to-white/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 transition-colors duration-500 bg-gradient-to-t ${index % 2 === 0
                      ? 'from-emerald-900/90 via-emerald-700/40 to-transparent'
                      : 'from-purple-900/90 via-purple-700/40 to-transparent'
                      }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90" />
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 gap-3">
                    <div className="space-y-3">
                      <span className="text-white/80 text-xs tracking-[0.35em] uppercase block">
                        {item.category}
                      </span>
                      <p className="text-white/85 text-sm leading-relaxed">{item.desc}</p>
                      <div className="flex items-center justify-center pt-3">
                        <Link to="/contact" className="inline-flex items-center gap-2 text-white text-sm font-semibold tracking-wide uppercase border border-white/40 rounded-full px-5 py-2 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                          Explore Now
                          <span className="text-base leading-none">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
                <h3 className="text-white text-2xl font-serif leading-tight px-2">{item.name}</h3>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
});

const MemoriesSection = React.memo(() => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const visibilityTimeout = useRef<number | null>(null);
  const isClient = typeof window !== 'undefined';

  const markVisible = () => {
    if (!carouselRef.current) return;
    carouselRef.current.classList.add('memories-visible');
  };

  const activateFallback = () => {
    if (!carouselRef.current) return;
    markVisible();
    carouselRef.current.classList.add('memories-carousel-fallback');
  };

  const verifyVisibility = (carouselEl: JQuery<HTMLElement>) => {
    if (carouselEl.hasClass('owl-loaded')) {
      carouselEl.removeClass('memories-carousel-fallback');
    } else {
      activateFallback();
    }
  };

  const scheduleVisibilityCheck = () => {
    if (!isClient) return;
    if (visibilityTimeout.current) {
      window.clearTimeout(visibilityTimeout.current);
    }
    visibilityTimeout.current = window.setTimeout(() => {
      if (!carouselRef.current) return;
      if (!carouselRef.current.classList.contains('owl-loaded')) {
        activateFallback();
      }
    }, 800);
  };

  const initCarousel = async () => {
    if (!isClient || !carouselRef.current) return;
    const $ = await ensureMemoriesCarouselReady();
    if (!$) {
      activateFallback();
      return;
    }
    try {
      const $carousel = $(carouselRef.current);
      if ($carousel.hasClass('owl-loaded')) {
        $carousel.trigger('destroy.owl.carousel');
      }
      // @ts-ignore - Owl Carousel augments jQuery at runtime
      $carousel.owlCarousel({
        items: 1,
        loop: true,
        center: true,
        nav: false,
        dots: false,
        margin: 36,
        stagePadding: 260,
        smartSpeed: 420,
        dragEndSpeed: 380,
        autoplay: false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        freeDrag: false,
        responsive: {
          0: { stagePadding: 12, margin: 10 },
          480: { stagePadding: 24, margin: 12 },
          768: { stagePadding: 64, margin: 16 },
          1024: { stagePadding: 180, margin: 24 },
          1440: { stagePadding: 320, margin: 36 },
        },
      });
      markVisible();
      verifyVisibility($carousel);
    } catch (error) {
      console.warn('Failed to initialize Owl Carousel for Memories:', error);
      activateFallback();
    }
    scheduleVisibilityCheck();
  };

  const refreshCarousel = async () => {
    if (!isClient || !carouselRef.current) return;
    const $ = await ensureMemoriesCarouselReady();
    if (!$) return;
    const $carousel = $(carouselRef.current);
    if ($carousel.hasClass('owl-loaded')) {
      $carousel.trigger('refresh.owl.carousel');
    }
  };

  const destroyCarousel = async () => {
    if (!isClient || !carouselRef.current) return;
    const $ = await ensureMemoriesCarouselReady();
    if (!$) return;
    const $carousel = $(carouselRef.current);
    if ($carousel.hasClass('owl-loaded')) {
      $carousel.trigger('destroy.owl.carousel');
    }
  };

  useEffect(() => {
    markVisible();
    initCarousel();
    const handleResize = () => {
      refreshCarousel();
    };
    if (isClient) {
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (visibilityTimeout.current) {
        window.clearTimeout(visibilityTimeout.current);
      }
      if (isClient) {
        window.removeEventListener('resize', handleResize);
      }
      destroyCarousel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="py-20 md:py-32 overflow-hidden px-0 bg-gg-cream">
      <div className="w-full max-w-none mx-auto px-0">
        <div className="container mx-auto px-6 md:px-10 mb-12 md:mb-16">
          <h2 className="text-center font-serif tracking-[0.4em] uppercase text-gg-navy text-sm md:text-base">
            Events
          </h2>
          <p className="text-center font-serif text-3xl md:text-5xl text-gg-navy mt-4">
            Moments we{' '}
            <span className="italic text-gg-navy">
              create
            </span>
          </p>
        </div>

        <div className="relative memories-shell">
          <div ref={carouselRef} className="memories-carousel owl-carousel" aria-live="polite">
            {memories.map((item, index) => (
              <article key={`${item.src}-${index}`} className="memories-card">
                <div className="memories-media">
                  <img src={item.src} alt={item.alt} className="memories-image" loading="lazy" />
                </div>
                <p className="memories-caption">{item.label}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="md:hidden flex justify-center mt-6">
          <p className="text-sm text-gg-slate/60">
            Swipe to explore more
          </p>
        </div>
      </div>
    </section>
  );
});

const TestimonialsSection = React.memo(() => {
  const loopedTestimonials = useMemo(() => [...testimonials, ...testimonials], []);

  return (
    <Section id="testimonials" className="bg-gg-cream py-20 pb-32 md:py-28 md:pb-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <FadeIn>
          <div className="text-center mb-14 md:mb-16">
            <span className="text-gg-navy font-medium tracking-widest uppercase text-sm mb-3 block">
              Testimonials
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-gg-navy">Words from Our Clients</h2>
          </div>
        </FadeIn>
      </div>
      <div className="relative w-screen left-1/2 -translate-x-1/2">
        <FadeIn delay={0.2}>
          <div className="marquee-container pause-on-hover group relative w-full overflow-hidden mb-5 py-6">
            <div className="marquee-wrapper flex w-max animate-marquee">
              {loopedTestimonials.map((t, idx) => (
                <div
                  key={`row1-${idx}`}
                  className="flex-shrink-0 w-[28rem] max-w-[calc(100vw-3rem)] mx-6 p-8 bg-white shadow-xl rounded-2xl border border-gg-taupe/20"
                >
                  <p className="font-serif italic text-lg text-gg-slate/90 mb-6">“{t.quote}”</p>
                  <div>
                    <p className="font-semibold text-gg-slate">{t.author}</p>
                    <p className="text-sm text-gg-slate/60">{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gg-cream to-transparent" />
            <div className="pointer-events-none absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gg-cream to-transparent" />
          </div>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="marquee-container pause-on-hover group relative w-full overflow-hidden pb-6">
            <div className="marquee-wrapper flex w-max animate-marquee-reverse">
              {loopedTestimonials.map((t, idx) => (
                <div
                  key={`row2-${idx}`}
                  className="flex-shrink-0 w-[28rem] max-w-[calc(100vw-3rem)] mx-6 p-8 bg-white shadow-xl rounded-2xl border border-gg-taupe/20"
                >
                  <p className="font-serif italic text-lg text-gg-slate/90 mb-6">“{t.quote}”</p>
                  <div>
                    <p className="font-semibold text-gg-slate">{t.author}</p>
                    <p className="text-sm text-gg-slate/60">{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gg-cream to-transparent" />
            <div className="pointer-events-none absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gg-cream to-transparent" />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
});



const ContactSection = React.memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    guest_count: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Split name into first and last name
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const payload = {
        ...formData,
        // Snake case
        full_name: formData.name,
        first_name: firstName,
        last_name: lastName,
        // Camel case
        fullName: formData.name,
        firstName: firstName,
        lastName: lastName,
        // Lowercase
        fullname: formData.name,
        firstname: firstName,
        lastname: lastName,
      };

      console.log('Submitting form:', payload);
      const response = await fetch('https://feed.ohmylead.com/api/webhook/9fa8e014-82c7-4f9c-a5e9-97ad8666581c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.status >= 200 && response.status < 300) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', city: '', guest_count: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" dark className="relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-gg-navy/30 blur-[140px] rounded-full" />
        <div className="absolute -bottom-36 -right-40 w-[700px] h-[700px] bg-gg-cream/15 blur-[150px] rounded-full" />
      </div>
      <div className="relative grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
        <div className="lg:col-span-5">
          <FadeIn>
            <span className="text-gg-cream font-medium tracking-widest uppercase text-sm mb-3 block">
              Invitation
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-gg-cream leading-tight mb-6">
              Let's create something <span className="italic text-white">unforgettable</span>
            </h2>
            <p className="text-gg-taupe text-lg leading-relaxed mb-10">
              Share your date, city, guest count, and the feeling you want. We will respond with a
              tailored approach and next steps.
            </p>
            <div className="space-y-4 text-gg-cream/90">
              {[
                {
                  label: 'Email',
                  value: 'experience@globalgourmet.asia',
                  icon: Mail,
                },
                {
                  label: 'Phone',
                  value: '+66 95-706-3377',
                  icon: Phone,
                },
                {
                  label: 'Availability',
                  value: 'Thailand • Vietnam • Dubai ',
                  icon: MapPin,
                },
              ].map((contact) => {
                const Icon = contact.icon;
                return (
                  <div key={contact.label} className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs tracking-[0.22em] uppercase text-gg-taupe">
                        {contact.label}
                      </div>
                      <div className="font-medium">{contact.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
        <div className="lg:col-span-7">
          <FadeIn delay={0.15}>
            <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-2xl">
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold tracking-[0.22em] uppercase text-gg-taupe mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-gg-cream placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gg-cream/40"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold tracking-[0.22em] uppercase text-gg-taupe mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-gg-cream placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gg-cream/40"
                    placeholder="+66 XX XXX XXXX"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold tracking-[0.22em] uppercase text-gg-taupe mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-gg-cream placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gg-cream/40"
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold tracking-[0.22em] uppercase text-gg-taupe mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-gg-cream placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gg-cream/40"
                    placeholder="Mumbai / Dubai / New York"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold tracking-[0.22em] uppercase text-gg-taupe mb-2">
                    Guest Count
                  </label>
                  <input
                    type="text"
                    name="guest_count"
                    value={formData.guest_count}
                    onChange={(e) => handleChange('guest_count', e.target.value)}
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-gg-cream placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gg-cream/40"
                    placeholder="Approx. guests"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold tracking-[0.22em] uppercase text-gg-taupe mb-2">
                    Tell us about your event
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className="w-full min-h-[120px] rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-gg-cream placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gg-cream/40"
                    placeholder="Date, style, cuisine preferences, venue, dietary needs..."
                    required
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="md:col-span-2 rounded-2xl bg-green-500/10 border border-green-500/30 p-5 flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-gg-cream font-semibold mb-1">Thank You!</h4>
                      <p className="text-gg-taupe text-sm">We have received your inquiry and will get back to you within 24–48 hours with a personalized proposal.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="md:col-span-2 rounded-2xl bg-red-500/10 border border-red-500/30 p-5">
                    <p className="text-red-300 text-sm">Something went wrong. Please try again or email us directly at <span className="underline">experience@globalgourmet.asia</span></p>
                  </div>
                )}

                <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between pt-2">
                  <p className="text-sm text-gg-taupe/80">We typically respond within 24–48 hours.</p>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={prefersReducedMotion ? {} : { scale: isSubmitting ? 1 : 1.03 }}
                    whileTap={prefersReducedMotion ? {} : { scale: isSubmitting ? 1 : 0.98 }}
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-gg-cream text-gg-navy px-7 py-4 font-semibold transition-all hover:bg-white hover:text-gg-navy disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Request a Proposal
                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
});

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <BrandSplitSection />
      <ExperienceCenterSection />
      <VideoSection />
      <ServicesSection />

      <MenuPreviewSection />
      <MemoriesSection />
      <TestimonialsSection />

      <ContactSection />
    </main>
  );
}
