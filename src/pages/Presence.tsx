import React from 'react';
import { FadeIn } from '../components/ui/Section';
import Masonry from '../components/ui/Masonry';

const presenceItems = [
  {
    id: "1",
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    url: "#",
    height: 600,
  },
  {
    id: "2",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
    url: "#",
    height: 400,
  },
  {
    id: "3",
    img: "https://images.unsplash.com/photo-1464093515883-ec948246accb?q=80&w=2059&auto=format&fit=crop",
    url: "#",
    height: 500,
  },
  {
    id: "4",
    img: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop",
    url: "#",
    height: 350,
  },
  {
    id: "5",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    url: "#",
    height: 550,
  },
  {
    id: "6",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=2070&auto=format&fit=crop",
    url: "#",
    height: 400,
  },
  {
    id: "7",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop",
    url: "#",
    height: 450,
  },
  {
    id: "8",
    img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069&auto=format&fit=crop",
    url: "#",
    height: 350,
  },
];

export default function Presence() {
  return (
    <main className="pt-24 min-h-screen bg-gg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12">
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="font-serif text-5xl md:text-6xl text-gg-navy mb-6">Our Global Presence</h1>
            <div className="w-24 h-1 bg-gold-400 mx-auto mb-8" />
            <p className="text-gg-slate/80 max-w-3xl mx-auto text-lg leading-relaxed">
              We have had the privilege of curating culinary experiences in some of the world's most 
              iconic locations. From the bustling streets of New York to the serene vineyards of Tuscany, 
              Global Gourmet brings exceptional taste to every corner of the globe.
            </p>
          </FadeIn>
        </div>

        <div className="w-full min-h-[600px]">
          <Masonry
            items={presenceItems}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.95}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </div>
      </div>
    </main>
  );
}
