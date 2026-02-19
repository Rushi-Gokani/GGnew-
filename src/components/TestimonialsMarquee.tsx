import { memo, useLayoutEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const testimonials = [
  {
    quote:
      "Thank you once again for preparing and presenting such an amazing menu. Our guests—especially our Indian family—were absolutely delighted!",
    author: 'Khun. Som and Mr. Vishwast',
    event: 'Wedding Client',
  },
  {
    quote:
      'A heartfelt thank you to you, Gaurav, and the entire team 🙏🙏🙏 The food was appreciated by every single guest. Even those who usually find faults absolutely loved it!',
    author: 'Mrs. Mrudula and Mr. Shabir',
    event: 'Wedding Client',
  },
  {
    quote:
      'We are truly grateful to the Global Gourmet Bangkok team for their exceptional service throughout the wedding events. Everything was handled with great professionalism, warmth, and attention to detail. Our guests were extremely happy, and their contribution made Rajiv and Alia’s celebration smooth, memorable, and truly special.',
    author: 'Geeta & Anita',
    event: 'Wedding Client',
  },
  {
    quote:
      'Our annual corporate gala was a massive success, thanks to Jade Banquets. The space is professional, elegant, and their team handled every detail flawlessly.',
    author: 'Anjali Mehta',
    event: 'Corporate Event Planner',
  },
];

gsap.registerPlugin(ScrollTrigger);

export default memo(function TestimonialsMarquee() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const loopedTestimonials = useMemo(() => [...testimonials, ...testimonials], []);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector('h2');
      const marquees = sectionRef.current?.querySelectorAll('.marquee-container');

      if (!heading || !marquees || marquees.length === 0) return;

      gsap.from([heading, ...Array.from(marquees)], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1,
        },
        opacity: 0,
        y: 60,
        filter: 'blur(5px)',
        ease: 'expo.out',
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="bg-gg-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-14 md:mb-16">
          <span className="text-gold-500 font-medium tracking-widest uppercase text-sm mb-3 block">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-gg-navy">Words from Our Clients</h2>
        </div>
      </div>

      <div className="relative w-screen left-1/2 -translate-x-1/2">
        <div className="marquee-container pause-on-hover group relative w-full overflow-hidden mb-5">
          <div className="marquee-wrapper flex w-max animate-marquee">
            {loopedTestimonials.map((t, idx) => (
              <div
                key={`row1-${idx}`}
                className="flex-shrink-0 w-[28rem] max-w-[calc(100vw-3rem)] mx-6 p-8 bg-white shadow-xl rounded-2xl border border-gg-taupe/20"
              >
                <p className="font-serif italic text-lg text-gg-slate/90 mb-6">“{t.quote}”</p>
                <div>
                  <p className="font-semibold text-gg-slate">{t.author}</p>
                  <p className="text-sm text-gg-slate/60">{t.event}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gg-cream to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gg-cream to-transparent" />
        </div>

        <div className="marquee-container pause-on-hover group relative w-full overflow-hidden">
          <div className="marquee-wrapper flex w-max animate-marquee-reverse">
            {loopedTestimonials.map((t, idx) => (
              <div
                key={`row2-${idx}`}
                className="flex-shrink-0 w-[28rem] max-w-[calc(100vw-3rem)] mx-6 p-8 bg-white shadow-xl rounded-2xl border border-gg-taupe/20"
              >
                <p className="font-serif italic text-lg text-gg-slate/90 mb-6">“{t.quote}”</p>
                <div>
                  <p className="font-semibold text-gg-slate">{t.author}</p>
                  <p className="text-sm text-gg-slate/60">{t.event}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gg-cream to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gg-cream to-transparent" />
        </div>
      </div>
    </section>
  );
});
