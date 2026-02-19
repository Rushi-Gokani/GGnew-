import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  Users,
  Globe2,
  Leaf,
  HeartHandshake,
  Crown,
  Landmark,
  ArrowUpRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const branchNodes = [
  {
    title: 'Our Story',
    description:
      'What began as an intimate kitchen in Jaipur now choreographs high-touch culinary theatre across continents. Global Gourmet grew by obsessing over every sensation—aroma, pacing, plate, and pause.',
    accent: 'from-gg-navy/90 to-gg-slate',
    icon: Sparkles,
  },
  {
    title: 'Teams',
    description:
      'Producers, designers, culinary scientists, and service artists collaborate inside one war room. Every brief is deconstructed, rebuilt, and rehearsed until it feels inevitable.',
    accent: 'from-gg-taupe/60 to-gg-navy/70',
    icon: Users,
  },
  {
    title: 'Founders',
    description:
      'Built by founders who believe hospitality is felt, not staged - where culture, craft, and care lead every experience.',
    accent: 'from-gg-navy/80 to-gg-taupe/80',
    icon: Crown,
  },
  {
    title: 'Our Mission',
    description:
      'To design and deliver emotionally resonant culinary journeys that awaken the senses, elevate traditions, and set new standards in food service excellence.',
    accent: 'from-gg-navy/80 to-gg-mist/70',
    icon: Leaf,
  },
  {
    title: 'Our Vision',
    description:
      'To become one of Asia’s top 3 F&B solution providers across catering, HORECA services, and experiential dining—celebrated for our authenticity, artistry, and immersive execution.',
    accent: 'from-gg-slate/90 to-gg-navy/70',
    icon: Globe2,
  },
  {
    title: 'Community',
    description:
      'We invest in growers, artisans, and culinary apprentices so that every celebration also elevates the ecosystem that supports it.',
    accent: 'from-gg-navy/90 to-gg-taupe/90',
    icon: HeartHandshake,
  },
];

const teams = [
  {
    title: 'Culinary Atelier',
    description:
      'Our chefs and food architects explore tradition through a contemporary lens, shaping menus that respect origin while embracing creativity and refinement.',
    focus: ['Heritage-led menu design', 'Technique-driven innovation', 'Custom tasting development'],
  },
  {
    title: 'Experience Architects',
    description:
      'Designers, planners, and production minds collaborate to choreograph flow, atmosphere, and timing — ensuring each experience unfolds with clarity and emotion.',
    focus: ['Spatial storytelling', 'Moment sequencing', 'Seamless coordination'],
  },
  {
    title: 'Operations & Responsibility',
    description:
      'Execution specialists and sustainability stewards ensure every detail is delivered with discipline, accountability, and respect for people, resources, and place.',
    focus: ['Ethical sourcing practices', 'Efficient systems & controls', 'On-site leadership'],
  },
];





const missionStatements = [
  {
    title: 'Our Mission',
    description:
      'To design and deliver emotionally resonant culinary journeys that awaken the senses, elevate traditions, and set new standards in food service excellence.',
    icon: Landmark,
  },
  {
    title: 'Our Vision',
    description:
      'To become one of Asia’s top 3 F&B solution providers across catering, HORECA services, and experiential dining—celebrated for our authenticity, artistry, and immersive execution.',
    icon: Globe2,
  },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const heroStats = [
  { value: '14', label: 'Global Cities' },
  { value: '1,200+', label: 'Signature Experiences' },
  { value: '70+', label: 'Culinary Artists' },
];

export default function About() {
  const aboutPageRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const mindMapRef = useRef<HTMLElement | null>(null);
  const missionRef = useRef<HTMLElement | null>(null);
  const teamsRef = useRef<HTMLElement | null>(null);

  const ctaRef = useRef<HTMLElement | null>(null);
  const mapCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const missionCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const teamCardsRef = useRef<(HTMLDivElement | null)[]>([]);



  mapCardsRef.current = [];
  missionCardsRef.current = [];
  teamCardsRef.current = [];



  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroBgScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const heroGlowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroContentScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const animateGroup = (
        elements: (HTMLDivElement | null)[],
        trigger: HTMLElement | null,
        vars: gsap.TweenVars = {}
      ) => {
        const targets = elements.filter(
          (el): el is HTMLDivElement => Boolean(el)
        );
        if (!targets.length) return;
        gsap.fromTo(
          targets,
          { opacity: 0, y: 60, rotateX: -8, ...vars.from },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: trigger ?? targets[0],
              start: 'top 80%',
            },
            ...vars.to,
          }
        );
      };

      animateGroup(mapCardsRef.current, mindMapRef.current);
      animateGroup(missionCardsRef.current, missionRef.current);
      animateGroup(teamCardsRef.current, teamsRef.current);




      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, aboutPageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={aboutPageRef} className="bg-gg-cream text-gg-slate">
      {/* Hero Section - Clean & Minimal */}
      <section ref={heroRef} className="relative isolate overflow-hidden bg-gg-navy">
        {/* Subtle gradient overlay */}
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-gg-navy via-gg-navy to-gg-slate/90"
          style={{ scale: heroBgScale }}
        />

        {/* Soft ambient glow */}
        <motion.div
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03),_transparent_60%)]"
          style={{ opacity: heroGlowOpacity }}
        />

        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-28 lg:py-36 text-white">
          <motion.div
            className="text-center mx-auto"
            style={{ y: heroContentY, opacity: heroContentOpacity, scale: heroContentScale }}
          >
            {/* Badge */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs uppercase tracking-[0.4em] text-white/50 mb-6"
            >
              About Global Gourmet
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.15]"
            >
              Curated food experiences <br className="hidden md:block" />
              <span className="italic text-white/80">delivered with intent.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-6 text-base lg:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
            >
           Global Gourmet is a multi-brand F&B company creating thoughtfully designed catering, experiential dining, and hospitality solutions across Asia.
            </motion.p>

          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gg-cream to-transparent" />
      </section>

      <section className="relative px-6">
        <div className="absolute inset-0 -z-10">
          <div className="h-72 w-72 bg-gg-navy/10 blur-3xl rounded-full absolute -top-10 -right-10" />
          <div className="h-64 w-64 bg-gg-taupe/30 blur-3xl rounded-full absolute top-20 left-0 opacity-70" />
        </div>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-gg-navy/70 mb-6">
              OUR STORY BEGINS WITH INTENT
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-gg-navy leading-tight">
              Hospitality that listens, responds, and comes alive through craft and care.
            </h1>
            <p className="mt-6 text-lg text-gg-slate/80">
              Our story is shaped by moments - quiet rituals, shared tables, and celebrations that matter. We approach hospitality as a living practice, where culture guides creation, details earn trust, and every experience is designed to feel personal, present, and deeply considered.
            </p>

          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="relative overflow-hidden rounded-[32px] h-[400px] shadow-2xl"
          >
            <img
              src="/images/N.png"
              alt="Culinary Art"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gg-navy/40 to-transparent" />
          </motion.div>
        </div>
      </section>

      <section ref={mindMapRef} className="py-20 px-6 bg-gradient-to-b from-white/70 to-gg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.4em] text-gg-navy/70">Mind Map</p>
            <h2 className="text-3xl md:text-4xl font-serif text-gg-navy mt-4">How the branches connect</h2>
            <p className="mt-4 text-gg-slate/80">
              Inspired by our internal strategy map, this visual keeps every team aligned with the promises we make
              to guests, partners, and one another.
            </p>
          </div>
          <div className="relative rounded-[40px] border border-gg-navy/10 p-10 bg-white/70">
            <div className="absolute inset-y-10 left-1/2 -translate-x-1/2 w-px bg-gg-navy/10 hidden lg:block" />
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease }}
                className="w-32 h-32 rounded-full bg-white border border-gg-navy/20 shadow-xl flex flex-col items-center justify-center"
              >
                <span className="text-xs uppercase tracking-[0.4em] text-gg-navy/60">Core</span>
                <p className="text-lg font-serif text-gg-navy">About</p>
              </motion.div>
            </div>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {branchNodes.map((node, index) => {
                const Icon = node.icon;
                return (
                  <motion.div
                    key={node.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.05, ease }}
                    className="relative rounded-3xl bg-white shadow-lg p-6 overflow-hidden"
                    ref={(el) => {
                      mapCardsRef.current[index] = el;
                    }}
                  >
                    <div
                      className={`absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r ${node.accent}`}
                    />
                    <div className="flex items-center gap-3 text-gg-navy">
                      <Icon className="w-5 h-5" />
                      <p className="uppercase text-xs tracking-[0.3em]">{node.title}</p>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-gg-slate/80">{node.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section ref={missionRef} className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
          {missionStatements.map((statement, idx) => (
            <motion.div
              key={statement.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="rounded-[32px] bg-white p-10 shadow-2xl border border-gg-navy/10"
              ref={(el) => {
                missionCardsRef.current[idx] = el;
              }}
            >
              <div className="flex items-center gap-4 text-gg-navy">
                <statement.icon className="w-8 h-8" />
                <h3 className="text-2xl font-serif">{statement.title}</h3>
              </div>
              <p className="mt-6 text-lg text-gg-slate/80">{statement.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section ref={teamsRef} className="py-20 px-6 bg-gg-navy text-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Teams & Founders</p>
            <h2 className="text-3xl md:text-4xl font-serif mt-4">People behind every meaningful moment.</h2>
            <p className="mt-4 text-white/80">
              Great experiences don’t happen by chance - they’re built through alignment. Our teams work as one ecosystem, translating vision into action, ideas into detail, and intention into experiences that feel effortless, thoughtful, and alive.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {teams.map((team, idx) => (
              <motion.div
                key={team.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-8"
                ref={(el) => {
                  teamCardsRef.current[idx] = el;
                }}
              >
                <h3 className="text-xl font-serif">{team.title}</h3>
                <p className="mt-4 text-white/80 text-sm leading-relaxed">{team.description}</p>
                <ul className="mt-6 space-y-2 text-xs uppercase tracking-[0.2em] text-white/70">
                  {team.focus.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-px w-6 bg-white/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>
      </section>



      <section ref={ctaRef} className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="max-w-5xl mx-auto rounded-[40px] bg-gradient-to-r from-gg-navy to-gg-slate text-white p-12 overflow-hidden relative"
        >
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.4),_transparent_55%)]" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">Next Chapter</p>
            <h2 className="text-3xl md:text-4xl font-serif mt-4">
              Let’s co-create the next unforgettable gathering.
            </h2>
            <p className="mt-4 text-white/80 max-w-3xl">
              From founder-led tastings to immersive destination builds, our About page is an open invitation to
              meet the people behind the scenes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/#contact"
                className="px-8 py-3 rounded-full bg-white text-gg-navy font-semibold tracking-wide uppercase text-sm"
              >
                Start a Conversation
              </Link>
              <Link
                to="/brands"
                className="px-8 py-3 rounded-full border border-white/40 text-sm tracking-wide uppercase"
              >
                Explore Our Brands
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
