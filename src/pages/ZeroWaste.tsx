import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Truck, Users, Recycle, Utensils, Sparkles, Package, Zap, ChevronDown, Leaf } from 'lucide-react';

export default function ZeroWaste() {
    React.useEffect(() => {
        document.title = "Zero Waste | Global Gourmet";
    }, []);
    const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const practices = [
        {
            icon: <Truck className="w-5 h-5" />,
            title: "Ethical Sourcing",
            desc: "We prioritize seasonal, locally sourced, and ethically farmed ingredients — reducing food miles and supporting regional producers."
        },
        {
            icon: <Users className="w-5 h-5" />,
            title: "Vendor Alignment & Training",
            desc: "We work only with like-minded partners who share our commitment to eco-conscious practices, and train all staff in sustainable service protocols."
        },
        {
            icon: <Recycle className="w-5 h-5" />,
            title: "Waste Minimization & Portion Planning",
            desc: "Intelligent portioning, live counters, and customizable menus help reduce food waste while elevating the guest experience."
        },
        {
            icon: <Utensils className="w-5 h-5" />,
            title: "Mindful Procurement",
            desc: "Wherever possible, we incorporate earthenware, banana leaves, ceramicware, and other natural alternatives that reduce environmental impact without compromising on aesthetics."
        },
        {
            icon: <Sparkles className="w-5 h-5" />,
            title: "Eco-Friendly Cleaning",
            desc: "We are using sustainable chemicals for dish washing to ensure high hygiene standards while minimizing water pollution and environmental harm."
        },
        {
            icon: <Package className="w-5 h-5" />,
            title: "Conscious Packaging",
            desc: "Our mithai boxes, gifting trays, and delivery containers use recyclable, biodegradable, or reusable materials. We minimize single-use plastics across events."
        },
        {
            icon: <Zap className="w-5 h-5" />,
            title: "Energy-Efficient Operations",
            desc: "From production kitchens to transport, we are optimizing fuel usage, reducing emissions, and investing in equipment that conserves energy and water."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, x: 20 },
        show: { opacity: 1, x: 0, transition: { stiffness: 50 } }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number]
            }
        }
    };

    return (
        <div className="pt-24 min-h-screen bg-gg-cream text-gg-navy overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20" ref={containerRef}>

                {/* Hero / Intro Section */}
                <div className="mb-24 text-center max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={titleVariants}
                        className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-7xl leading-tight mb-8"
                    >
                        Rooted in Responsibility.<br className="md:hidden" />
                        <motion.span
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="italic text-gg-taupe inline-block"
                        >
                            Styled for a Better Tomorrow.
                        </motion.span>
                    </motion.div>

                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="overflow-hidden"
                    >
                        <p className="text-xl text-gg-slate/80 leading-relaxed max-w-2xl mx-auto">
                            Zero Waste is not a trend — It's a commitment woven into every aspect of our culinary and operational choices.
                        </p>
                    </motion.div>
                </div>

                {/* Main Content: Left Side Info + Right Side Accordion */}
                <div className="flex flex-col lg:flex-row gap-16 items-start relative">

                    {/* Left Side: Sticky Content & Image */}
                    <div className="lg:w-5/12 lg:sticky lg:top-32 z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="pl-2"
                        >
                            <span className="text-gg-taupe text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Our Approach</span>
                            <h2 className="font-serif text-4xl text-gg-navy mb-4">Key Zero Waste<br />Practices</h2>
                            <p className="text-gg-slate/70 leading-relaxed">
                                From the farm to your fork, and back to the earth. Discover how we implement eco-conscious strategies at every step of our service.
                            </p>
                        </motion.div>

                        <motion.div
                            style={{ y, opacity }}
                            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl group"
                        >
                            <img
                                src="/sustainability-visual.png"
                                alt="Sustainable Catering Practices"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gg-navy/50 via-transparent to-transparent opacity-80"></div>

                            {/* Floating Badge */}
                            <motion.div
                                className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20"
                                whileHover={{ scale: 1.05, rotate: 2 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gg-navy/10 rounded-full text-gg-navy">
                                        <Leaf className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gg-taupe font-bold">Impact</p>
                                        <p className="font-serif text-gg-navy text-sm font-semibold">100% Eco-Friendly</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Side: Accordion List */}
                    <motion.div
                        className="lg:w-7/12 w-full flex flex-col gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {practices.map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className={`group bg-white rounded-xl overflow-hidden transition-all duration-500 border relative ${activeAccordion === idx
                                    ? 'shadow-xl border-gg-taupe/40 ring-1 ring-gg-taupe/10'
                                    : 'shadow-sm border-transparent hover:border-gg-taupe/20 hover:shadow-md'
                                    }`}
                            >
                                {/* Active Indicator Line */}
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: activeAccordion === idx ? '100%' : '0%' }}
                                    className="absolute left-0 top-0 w-1 bg-gg-taupe"
                                />

                                <button
                                    onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none relative z-10"
                                >
                                    <div className="flex items-center gap-5">
                                        <motion.div
                                            whileHover={{ rotate: 15, scale: 1.1 }}
                                            className={`p-3 rounded-full transition-all duration-500 ${activeAccordion === idx
                                                ? 'bg-gg-navy text-white shadow-lg'
                                                : 'bg-gg-cream text-gg-navy group-hover:bg-gg-taupe/20'
                                                }`}
                                        >
                                            {item.icon}
                                        </motion.div>
                                        <span className={`font-serif text-lg lg:text-xl font-medium transition-colors duration-300 ${activeAccordion === idx ? 'text-gg-navy' : 'text-gg-slate group-hover:text-gg-navy'
                                            }`}>
                                            {item.title}
                                        </span>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: activeAccordion === idx ? 180 : 0 }}
                                        transition={{ duration: 0.4, type: "spring" }}
                                    >
                                        <ChevronDown className={`w-5 h-5 transition-colors ${activeAccordion === idx ? 'text-gg-taupe' : 'text-gg-slate/40'
                                            }`} />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {activeAccordion === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        >
                                            <div className="px-6 pb-8 pl-[5rem] pr-8">
                                                <motion.p
                                                    initial={{ y: 10, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.1, duration: 0.4 }}
                                                    className="text-gg-slate/70 leading-relaxed text-base"
                                                >
                                                    {item.desc}
                                                </motion.p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
