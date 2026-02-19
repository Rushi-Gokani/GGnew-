import { Section, FadeIn } from './ui/Section';
import { motion, useReducedMotion } from 'framer-motion';
import { ClipboardList, Sparkles, CookingPot, ConciergeBell, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    title: 'Discovery & Brief',
    description: 'We align on your vision, guest profile, venue realities, and success criteria—then map the experience end-to-end.',
    icon: ClipboardList,
  },
  {
    title: 'Menu & Styling Design',
    description: 'Cuisine direction, tasting notes, plating language, and service choreography designed as one cohesive aesthetic.',
    icon: Sparkles,
  },
  {
    title: 'Production Planning',
    description: 'Ingredient sourcing, prep schedules, staffing, transport, and contingencies—built for precision and calm execution.',
    icon: CookingPot,
  },
  {
    title: 'On-Site Service',
    description: 'White-glove hospitality, timing control, and details handled quietly—so the event feels effortless to you.',
    icon: ConciergeBell,
  },
  {
    title: 'Finish & Reset',
    description: 'We close with the same discipline: breakdown, venue reset, and post-event notes for continuous refinement.',
    icon: CheckCircle2,
  },
];

export default function CraftExecution() {
  const prefersReducedMotion = useReducedMotion();
  const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <Section id="craft" className="relative bg-gg-cream">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gg-taupe/30 to-transparent" />

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <FadeIn>
            <span className="text-gold-500 font-medium tracking-widest uppercase text-sm mb-3 block">Execution</span>
            <h2 className="font-serif text-4xl md:text-5xl text-gg-navy leading-tight mb-6">
              Craft Detail & <span className="italic text-gold-500">Execution</span>
            </h2>
            <p className="text-gg-slate/70 text-lg leading-relaxed">
              Luxury is consistency. Our work is built on systems that protect the details—so your guests feel the magic, not the mechanics.
            </p>
          </FadeIn>
        </div>

        <div className="lg:col-span-7">
          <div className="relative rounded-3xl border border-gg-taupe/25 bg-white/60 backdrop-blur-sm shadow-sm overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-gg-navy/10 blur-[120px] rounded-full" />
              <div className="absolute -bottom-28 -right-28 w-[520px] h-[520px] bg-gold-400/10 blur-[130px] rounded-full" />
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
                              <span className="text-xs font-bold tracking-widest uppercase text-gold-500">0{idx + 1}</span>
                              <h3 className="font-serif text-2xl text-gg-navy">{step.title}</h3>
                            </div>
                            <p className="text-gg-slate/75 leading-relaxed">
                              {step.description}
                            </p>
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
}
