import React from 'react';
import { Section, FadeIn } from './ui/Section';
import Masonry from './ui/Masonry';

const presenceItems = [
  {
    id: "1",
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    url: "#",
    height: 600, // Tall
  },
  {
    id: "2",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
    url: "#",
    height: 400, // Medium
  },
  {
    id: "3",
    img: "https://images.unsplash.com/photo-1464093515883-ec948246accb?q=80&w=2059&auto=format&fit=crop",
    url: "#",
    height: 500, // Medium-Tall
  },
  {
    id: "4",
    img: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop",
    url: "#",
    height: 350, // Short
  },
  {
    id: "5",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    url: "#",
    height: 550, // Tall
  },
  {
    id: "6",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=2070&auto=format&fit=crop",
    url: "#",
    height: 400, // Medium
  },
  {
    id: "7",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop",
    url: "#",
    height: 450, // Medium
  },
  {
    id: "8",
    img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069&auto=format&fit=crop",
    url: "#",
    height: 350, // Short
  },
];

export default function Presence() {
  return (
    <Section id="presence" className="bg-stone-50">
      <div className="text-center mb-16">
        <FadeIn>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">Our Global Presence</h2>
          <div className="w-24 h-1 bg-gold-400 mx-auto mb-6" />
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">
            From intimate local gatherings in New York to grand galas in Paris, 
            our culinary artistry knows no borders. Explore a visual journey of our 
            most memorable events across the globe.
          </p>
        </FadeIn>
      </div>

      <div className="w-full min-h-[600px]">
        <Masonry
          items={presenceItems}
          ease="power3.out"
          duration={0.8}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={1.02}
          blurToFocus={true}
          colorShiftOnHover={true}
        />
      </div>
    </Section>
  );
}
