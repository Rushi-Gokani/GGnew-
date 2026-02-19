import { Section, FadeIn } from './ui/Section';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, HeartHandshake, Building2, MapPin, UtensilsCrossed, PartyPopper } from 'lucide-react';

const experiences = [
  {
    title: 'Weddings & Celebrations',
    subtitle: 'Signature Moments',
    description: 'From destination weddings to intimate ceremonies, we design menus and service that feel effortless and unforgettable.',
    icon: HeartHandshake,
  },
  {
    title: 'Corporate & Executive',
    subtitle: 'Precision at Scale',
    description: 'Boardroom luncheons, product launches, and galas delivered with flawless timing, discretion, and polish.',
    icon: Building2,
  },
  {
    title: 'Private Dining',
    subtitle: 'Restaurant at Home',
    description: 'Chef-led tasting experiences in private residences—beautifully plated, thoughtfully paired, and fully hosted.',
    icon: UtensilsCrossed,
  },
  {
    title: 'Experiential Pop-Ups',
    subtitle: 'Immersive Design',
    description: 'Food styling, choreography, and atmosphere unified into one story—crafted for the camera and for memory.',
    icon: Sparkles,
  },
  {
    title: 'Destination Events',
    subtitle: 'Global Ready',
    description: 'Our systems travel well. We execute across cities and venues while keeping the same Global Gourmet standard.',
    icon: MapPin,
  },
  {
    title: 'Luxury Social',
    subtitle: 'High Touch',
    description: 'Anniversaries, milestone birthdays, and soirées with custom menus, bespoke bars, and white-glove hospitality.',
    icon: PartyPopper,
  },
];

export default function Experiences() {
  const prefersReducedMotion = useReducedMotion();
  const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <Section id="experiences" className="relative bg-gg-mist/35">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 -right-28 w-[520px] h-[520px] bg-gold-400/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-[640px] h-[640px] bg-gg-navy/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">
          <FadeIn>
            <div className="max-w-2xl">
              <span className="text-gold-500 font-medium tracking-widest uppercase text-sm mb-3 block">Experiences</span>
              <h2 className="font-serif text-4xl md:text-5xl text-gg-navy leading-tight mb-5">
                Experiences We <span className="italic text-gold-500">Create</span>
              </h2>
              <p className="text-gg-slate/70 text-lg leading-relaxed">
                Every event is a composition—menu, styling, service, and logistics working in harmony. Choose the format, we’ll craft the feeling.
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
                <span className="text-gold-500 text-xs font-bold tracking-widest uppercase">Global Gourmet</span>
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
                      <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-500/90">
                        {item.subtitle}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-gg-navy mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gg-slate/75 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
