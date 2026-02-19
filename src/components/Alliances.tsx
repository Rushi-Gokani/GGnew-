import { Section, FadeIn } from './ui/Section';
import { motion } from 'framer-motion';
import { ShieldCheck, Globe2, Sparkles } from 'lucide-react';
import LogoMarquee from './LogoMarquee';

const stats = [
  { label: 'Cities Served', value: '12+', icon: Globe2 },
  { label: 'Luxury Events', value: '500+', icon: Sparkles },
  { label: 'Trusted Partners', value: '80+', icon: ShieldCheck },
];

export default function Alliances() {
  const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <Section id="alliances" className="relative bg-gg-cream">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[760px] h-[420px] bg-gg-navy/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <FadeIn>
              <span className="text-gold-500 font-medium tracking-widest uppercase text-sm mb-3 block">Alliances</span>
              <h2 className="font-serif text-4xl md:text-5xl text-gg-navy leading-tight mb-5">
                Trusted by <span className="italic text-gold-500">World-Class</span> Brands
              </h2>
              <p className="text-gg-slate/70 text-lg leading-relaxed max-w-2xl">
                We collaborate with venues, planners, and iconic brands to produce experiences where every element feels intentional.
              </p>
            </FadeIn>
          </div>

          <div className="lg:col-span-5">
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.35, ease: easeOut }}
                      className="rounded-2xl border border-gg-taupe/25 bg-white/60 hover:bg-white/80 backdrop-blur-sm px-5 py-6 transition-colors duration-500"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-gg-cream border border-gg-taupe/25 flex items-center justify-center text-gg-navy mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="font-serif text-3xl text-gg-navy">{stat.value}</div>
                      <div className="text-[11px] tracking-[0.22em] uppercase font-semibold text-gg-slate/60 mt-1">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.25}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="mt-14"
          >
            <LogoMarquee />
          </motion.div>
        </FadeIn>
      </div>
    </Section>
  );
}
