import React from 'react';
import { Section, FadeIn } from './ui/Section';
import { CheckCircle } from 'lucide-react';

export default function About() {
  return (
    <Section id="about">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative">
          <FadeIn direction="right">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?q=80&w=2062&auto=format&fit=crop"
                alt="Chef plating food"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 bg-gg-mist rounded-2xl -z-10" />
            <div className="absolute -top-6 -right-6 w-1/2 h-1/2 border-2 border-gold-400/30 rounded-2xl -z-10" />
          </FadeIn>
        </div>

        <div>
          <FadeIn direction="left">
            <span className="text-gg-navy font-semibold tracking-wider uppercase text-sm mb-2 block">Our Philosophy</span>
            <h2 className="font-serif text-4xl md:text-5xl text-gg-slate mb-6 leading-tight">
              We Believe Food is <br /><span className="text-gg-navy italic">Art & Connection</span>
            </h2>
            <p className="text-gg-slate/80 text-lg leading-relaxed mb-6">
Global Gourmet was built on a simple belief: food is not just served - it is felt. Rooted in culture, guided by craft, and delivered with precision, we design culinary experiences that connect people, places, and moments.
            </p>
            <p className="text-gg-slate/80 text-lg leading-relaxed mb-8">
From intimate rituals to grand celebrations, every menu is shaped by intention, every detail by discipline, and every experience by soul.
            </p>

            <div className="space-y-4">
              {[
                "Chef-led menus inspired by regional authenticity",
                "End-to-end execution with zero outsourcing",
                "Scalable systems without compromising soul",
                "Emotionally intelligent service teams"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-gg-navy flex-shrink-0" />
                  <span className="text-gg-slate font-medium">{item}</span>
                </div>
              ))}
            </div>

            <button className="mt-10 px-8 py-3 border-2 border-gg-navy text-gg-navy rounded-full font-semibold hover:bg-gg-navy hover:text-white transition-all">
              Meet the Team
            </button>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
