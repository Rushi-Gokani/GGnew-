import { useRef, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Gift, Users, Coins } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const initiatives = [
  {
    title: 'Open Table Gatherings',
    description:
      'We bring people together around simple, well-made food in spaces that feel safe and welcoming. These meals are about dignity, warmth, and shared moments - where everyone is treated with care and respect.',
    icon: Heart,
  },
  {
    title: 'Thoughtful Giving Moments',
    description:
      'Rather than formal drives, we invite gentle participation. At select experiences, guests are offered meaningful ways to contribute - allowing generosity to flow naturally and with intention.',
    icon: Gift,
  },
  {
    title: 'Celebrations That Give Back',
    description:
      'Life’s milestones carry powerful energy. We channel that collective spirit into moments that encourage awareness, empathy, and shared responsibility - turning celebration into connection.',
    icon: Users,
  },
  {
    title: 'Impact Beyond the Event',
    description:
      'Some experiences continue long after the final guest leaves. Through sustained commitments tied to our work, we help support access to learning, nourishment, and care within the communities we touch.',
    icon: Coins,
  },
];

export default function Community() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  cardsRef.current = [];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroBgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const targets = cardsRef.current.filter(
        (el): el is HTMLDivElement => Boolean(el)
      );

      if (targets.length) {
        gsap.fromTo(
          targets,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-gg-cream text-gg-slate">
      <section ref={heroRef} className="relative isolate overflow-hidden min-h-[50vh] flex items-center">
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2000&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            scale: heroBgScale,
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gg-navy/80 mix-blend-multiply" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gg-navy/60 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 py-24 w-full text-white text-center">
          <motion.div
            style={{ y: heroContentY, opacity: heroContentOpacity }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
              Sharing What We Believe In.<br />
              <span className="italic text-white/90">Standing Where It Truly Matters.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto font-light">
              Community is where our values take shape beyond words. It’s found in the moments we choose to show up, listen closely, and act with intention. From our kitchens to the communities around us, we believe care should be consistent, dignity should be preserved, and support should feel genuine - never performative.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={gridRef} className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-gg-navy/70">Our Impact</p>
            <h2 className="text-3xl md:text-4xl font-serif text-gg-navy mt-4">Community-Led Initiatives</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {initiatives.map((item, idx) => (
              <div
                key={item.title}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="bg-white p-10 rounded-[2rem] shadow-sm border border-gg-navy/5 hover:shadow-xl transition-shadow duration-500 group"
              >
                <div className="w-12 h-12 rounded-full bg-gg-navy/5 flex items-center justify-center mb-6 group-hover:bg-gg-navy group-hover:text-white transition-colors duration-500">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif text-gg-navy mb-4">{item.title}</h3>
                <p className="text-gg-slate/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
