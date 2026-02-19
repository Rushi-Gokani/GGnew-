import { useEffect, useLayoutEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinContentRef = useRef<HTMLDivElement | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => video.play().catch(() => undefined);

    video.play().catch((error) => {
      console.log('Video play failed:', error);

      const onUserInteract = () => {
        tryPlay();
        document.removeEventListener('click', onUserInteract);
        document.removeEventListener('touchstart', onUserInteract);
      };

      document.addEventListener('click', onUserInteract, { once: true });
      document.addEventListener('touchstart', onUserInteract, { once: true });
    });
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const textTargets = contentRef.current
        ? (Array.from(contentRef.current.children) as HTMLElement[])
        : [];

      gsap.from(textTargets, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.15,
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: pinContentRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        .to(
          contentRef.current,
          {
            yPercent: -20,
            ease: 'power2.out',
          },
          0
        )
        .to(
          videoWrapperRef.current,
          {
            yPercent: 12,
            scale: 1.08,
            ease: 'none',
          },
          0
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-gg-navy min-h-screen overflow-hidden">
      <div ref={pinContentRef} className="relative h-screen">
        {/* Video Background */}
        <div ref={videoWrapperRef} className="absolute inset-0 will-change-transform">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            {/* Using a high-quality Pexels stock video of fine dining plating/prep */}
            <source src="https://videos.pexels.com/video-files/3196344/3196344-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-gg-navy via-gg-navy/40 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div
          ref={contentRef}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto will-change-transform"
        >
          {/* Play Button Icon (Visual only for now, could open a modal) */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-8 mx-auto cursor-pointer hover:scale-110 hover:bg-white/20 transition-all duration-500 group">
            <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-current group-hover:text-gold-400 transition-colors ml-1" />
          </div>

          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight leading-tight">
            Poetry in <span className="text-gold-400 italic">Motion</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gg-cream/80 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Witness the dedication, precision, and passion that goes into every plate we serve. 
            From the kitchen to your table, we orchestrate a symphony of flavors.
          </p>

          <button className="px-8 py-3 border border-white/30 rounded-full text-white text-sm tracking-widest uppercase hover:bg-white hover:text-gg-navy transition-all duration-300">
            Watch Full Reel
          </button>
        </div>
      </div>
    </section>
  );
}
