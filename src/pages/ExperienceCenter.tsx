import { useState, useRef } from 'react';
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
    AnimatePresence,
} from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowDown,
    ArrowRight,
    ChefHat,
    Flame,
    UtensilsCrossed,
    Lightbulb,
    Users,
    Award,
    Target,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Section component
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

// FadeIn animation component
const FadeIn: React.FC<{
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    className?: string;
}> = ({ children, delay = 0, direction = 'up', className = '' }) => {
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
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Experience Center data
const experiences = [
    {
        id: 1,
        title: 'Culinary Innovation Lab',
        subtitle: 'R&D Excellence',
        description:
            'Our state-of-the-art culinary innovation center where new recipes are born, techniques are perfected, and the future of gastronomy is crafted by our world-class chefs.',
        image: '/images/culinary.jpg',
        icon: ChefHat,
    },
    {
        id: 2,
        title: 'Interactive Workshops',
        subtitle: 'Hands-On Learning',
        description:
            'Immersive cooking workshops and masterclasses led by our executive chefs. Perfect for corporate team-building, culinary enthusiasts, and aspiring professionals.',
        image: '/images/workspace.jpg',
        icon: Flame,
    },
    {
        id: 3,
        title: 'Product Showcase',
        subtitle: 'Experiential Space',
        description:
            'A dedicated space to experience our culinary offerings firsthand. From menu tastings to ingredient showcases, discover the artistry behind every dish we create.',
        image: '/images/experience-center/3.jpg',
        icon: UtensilsCrossed,
    },
];

const features = [
    {
        icon: Lightbulb,
        title: 'Creative Test Kitchen',
        description: 'Where ideas are explored, refined, and brought to life.',
    },
    {
        icon: Users,
        title: 'Collaborative Experiences',
        description: 'Designed to strengthen teamwork through shared culinary engagement.',
    },
    {
        icon: Award,
        title: 'Guided by Industry Professionals',
        description: 'Learn directly from experienced chefs and hospitality leaders.',
    },
    {
        icon: Target,
        title: 'Designed Around Your Objectives',
        description: 'Programs shaped to match your goals and expectations.',
    },
];

// Hero Section
const HeroSection = () => {
    const prefersReducedMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    const bgY = useTransform(
        scrollYProgress,
        [0, 1],
        prefersReducedMotion ? [0, 0] : [0, -100]
    );
    const bgScale = useTransform(
        scrollYProgress,
        [0, 1],
        prefersReducedMotion ? [1.1, 1.1] : [1.1, 1.2]
    );
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[80vh] md:h-screen bg-gg-slate overflow-hidden"
        >
            {/* Background Image */}
            <motion.div
                style={{ y: bgY, scale: bgScale }}
                className="absolute inset-0 will-change-transform"
            >
                <img
                    src="/images/Hero.png"
                    alt="Experience Center"
                    className="w-full h-full object-cover opacity-70"
                />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-gg-slate via-gg-slate/50 to-transparent" />
            <div className="absolute inset-0 bg-gg-slate/30" />

            {/* Content */}
            <motion.div
                style={{ opacity: contentOpacity }}
                className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <span className="inline-block py-1 px-3 border border-gg-cream/30 rounded-full text-xs font-medium tracking-widest uppercase text-gg-cream/90 mb-6 backdrop-blur-sm">
                        Global Gourmet
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="font-serif text-5xl md:text-7xl lg:text-8xl text-gg-cream font-medium mb-6 leading-tight"
                >
                    Experience <span className="italic text-white">Center</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-lg md:text-xl text-gg-cream/90 font-light max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Where culinary innovation comes to life. Discover our state-of-the-art
                    facility dedicated to culinary exploration, workshops, and immersive
                    food experiences.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <a
                        href="#explore"
                        className="inline-flex items-center gap-2 text-gg-cream/70 hover:text-gg-cream transition-colors"
                    >
                        <span className="text-xs tracking-widest uppercase">Explore</span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        >
                            <ArrowDown className="w-5 h-5" />
                        </motion.div>
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
};

// Experiences Section
const ExperiencesSection = () => {
    const [activeId, setActiveId] = useState<number>(1);
    const prefersReducedMotion = useReducedMotion();
    const activeItem = experiences.find((e) => e.id === activeId) ?? experiences[0];

    return (
        <Section id="explore" className="relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gg-navy/10 blur-[140px] rounded-full" />
                <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-gg-navy/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-gg-navy font-medium tracking-widest uppercase text-sm mb-3 block">
                            What We Offer
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gg-slate leading-tight mb-6">
                            Our <span className="italic text-gg-navy">Experiences</span>
                        </h2>
                        <p className="text-gg-slate/70 text-lg leading-relaxed max-w-2xl mx-auto">
                            Explore the different ways you can engage with our culinary innovation center.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Left: Experience Cards */}
                    <div className="lg:col-span-5 space-y-4">
                        {experiences.map((item, index) => {
                            const isActive = activeId === item.id;
                            const Icon = item.icon;
                            return (
                                <FadeIn key={item.id} delay={index * 0.1}>
                                    <motion.div
                                        onMouseEnter={() => setActiveId(item.id)}
                                        whileHover={prefersReducedMotion ? {} : { x: 8 }}
                                        transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: easeOut }}
                                        className={`group cursor-pointer rounded-2xl border transition-all duration-500 ${isActive
                                            ? 'border-gg-navy/30 bg-white shadow-xl shadow-gg-navy/10'
                                            : 'border-gg-taupe/30 bg-white/60 hover:bg-white/80'
                                            }`}
                                    >
                                        <button
                                            type="button"
                                            onFocus={() => setActiveId(item.id)}
                                            onClick={() => setActiveId(item.id)}
                                            aria-expanded={isActive}
                                            className="w-full text-left rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-gg-navy/40"
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
                                                        <span
                                                            className={`text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 ${isActive ? 'text-gg-navy' : 'text-gg-slate/50'
                                                                }`}
                                                        >
                                                            {item.subtitle}
                                                        </span>
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
                                                            : 'bg-gg-cream text-gg-slate/60 -rotate-45 group-hover:text-gg-slate'
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

                    {/* Right: Image Display - Desktop Only */}
                    <div className="hidden lg:block lg:col-span-7">
                        <FadeIn direction="left">
                            <div className="relative">
                                <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gg-taupe/20">
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-gg-slate/60 via-transparent to-transparent" />

                                    {/* Caption */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
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
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </Section>
    );
};

// Features Section
const FeaturesSection = () => (
    <Section dark>
        <FadeIn>
            <div className="text-center mb-16">
                <span className="text-gg-cream/70 font-medium tracking-widest uppercase text-sm mb-3 block">
                    Why Choose Us
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-gg-cream leading-tight">
                    What Sets Our <span className="italic">Experience </span>Center Apart
                </h2>
            </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                    <FadeIn key={feature.title} delay={index * 0.1} className="h-full">
                        <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 h-full flex flex-col">
                            <div className="w-14 h-14 rounded-2xl bg-gg-cream/10 flex items-center justify-center mx-auto mb-6 shrink-0">
                                <Icon className="w-7 h-7 text-gg-cream" />
                            </div>
                            <h3 className="font-serif text-xl text-gg-cream mb-3">{feature.title}</h3>
                            <p className="text-gg-cream/70 text-sm leading-relaxed flex-grow">{feature.description}</p>
                        </div>
                    </FadeIn>
                );
            })}
        </div>
    </Section>
);

// Gallery Section
const galleryImages = [
    { src: '/images/experience-center/3.jpg', title: 'Product Showcase', subtitle: 'Experiential Space' },
    { src: '/images/experience-center/asd12.jpg', title: 'Culinary Lab', subtitle: 'Innovation Hub' },
    { src: '/images/experience-center/asd123.jpg', title: 'Workspace', subtitle: 'Creative Zone' },
    { src: '/images/experience-center/Copy of B1630845.jpg', title: 'Kitchen', subtitle: 'State of the Art' },
    { src: '/images/experience-center/Copy of B1630926.jpg', title: 'Dining Area', subtitle: 'Tasting Room' },
    { src: '/images/experience-center/Copy of DSCF7580_11zon.jpg', title: 'Preparation', subtitle: 'Behind the Scenes' },
];

const GallerySection = () => (
    <Section>
        <FadeIn>
            <div className="text-center mb-16">
                <span className="text-gg-navy font-medium tracking-widest uppercase text-sm mb-3 block">
                    Gallery
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-gg-slate leading-tight">
                    Inside Our <span className="italic text-gg-navy">Center</span>
                </h2>
            </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((item, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                    <div className="group relative h-72 rounded-2xl overflow-hidden shadow-xl">
                        <img
                            src={item.src}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gg-slate/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="font-serif text-xl text-white">{item.title}</h3>
                            <p className="text-gg-cream/70 text-sm mt-1">{item.subtitle}</p>
                        </div>
                    </div>
                </FadeIn>
            ))}
        </div>
    </Section>
);

export default function ExperienceCenter() {
    return (
        <main>
            <HeroSection />
            <ExperiencesSection />
            <FeaturesSection />
            <GallerySection />
        </main>
    );
}
