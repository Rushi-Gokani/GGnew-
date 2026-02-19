import { Link } from 'react-router-dom';
import { Section, FadeIn } from '../components/ui/Section';
import { ArrowRight } from 'lucide-react';
import TFCLogo from '../assets/TFCW.png';

export default function Brands() {
  return (
    <main className="pt-24 min-h-screen bg-gg-cream">
      <Section className="min-h-[80vh] flex flex-col justify-center bg-gg-cream">
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="font-serif text-5xl md:text-7xl text-gg-navy mb-6">Our Culinary Portfolio</h1>
            <div className="w-24 h-1 bg-gold-400 mx-auto mb-8" />
            <p className="text-gg-slate/80 max-w-2xl mx-auto text-lg leading-relaxed">
              Global Gourmet is proud to present its signature culinary identity,
              crafted to deliver an unparalleled gastronomic experience.
            </p>
          </FadeIn>
        </div>

        <div className="max-w-4xl mx-auto w-full">
          {/* The Fifth Course Card */}
          <FadeIn delay={0.2}>
            <Link to="/brands/the-fifth-course" className="group block relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
                alt="The Fifth Course"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gg-slate/40 group-hover:bg-gg-slate/30 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
                <img src={TFCLogo} alt="The Fifth Course" className="h-16 md:h-20 mb-8 object-contain self-start" />
                <p className="text-white/90 text-xl mb-8 max-w-lg leading-relaxed">
                  Avant-garde dining and exquisite patisserie. Where innovation meets indulgence in a symphony of flavors.
                </p>
                <span className="inline-flex items-center text-sm font-semibold tracking-widest uppercase group-hover:translate-x-2 transition-transform bg-gold-400/20 backdrop-blur-sm px-6 py-3 rounded-full border border-gold-400/30">
                  Explore Brand <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </div>
            </Link>
          </FadeIn>
        </div>
      </Section>
    </main>
  );
}
