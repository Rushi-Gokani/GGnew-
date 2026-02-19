import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

type TrailPoint = {
  x: number;
  y: number;
  t: number;
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  const trailPointsRef = useRef<TrailPoint[]>([]);
  const rafRef = useRef<number | null>(null);
  const revealRadiusRef = useRef<number>(16);
  const [trailNow, setTrailNow] = useState(0);

  const BG_URL = "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop";
  const TRAIL_HOLD_MS = 700;
  const TRAIL_FADE_MS = 1600;
  const TRAIL_MAX_POINTS = 46;
  const REVEAL_RADIUS_PX = 70;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -80]);
  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1.15, 1.15] : [1.15, 1.25]
  );

  const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 0]);

  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const startTrailLoop = () => {
    if (rafRef.current !== null) return;
    const totalLifetime = TRAIL_HOLD_MS + TRAIL_FADE_MS;

    const tick = (t: number) => {
      const cutoff = t - totalLifetime;
      trailPointsRef.current = trailPointsRef.current.filter((p) => p.t >= cutoff);
      setTrailNow(t);

      if (trailPointsRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const addTrailPoint = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    if (prefersReducedMotion || !stickyRef.current) return;

    const rect = stickyRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    if (x < 0 || x > 1 || y < 0 || y > 1) return;

    const t = performance.now();
    const points = trailPointsRef.current;
    const last = points[points.length - 1];
    const minDist = 4 / Math.min(rect.width, rect.height);
    const dist = last ? Math.hypot(x - last.x, y - last.y) : Number.POSITIVE_INFINITY;

    if (!last || dist >= minDist) {
      points.push({ x, y, t });
      if (points.length > TRAIL_MAX_POINTS) points.splice(0, points.length - TRAIL_MAX_POINTS);
      setTrailNow(t);
    }

    revealRadiusRef.current = (REVEAL_RADIUS_PX / Math.min(rect.width, rect.height)) * 100;
    startTrailLoop();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    addTrailPoint(event);
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    addTrailPoint(event);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    startTrailLoop();
  };

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!prefersReducedMotion) return;
    trailPointsRef.current = [];
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative w-full h-[170vh] md:h-[200vh] bg-gg-slate">
      <div
        ref={stickyRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform">
            <img
              src={BG_URL}
              alt="Elegant catering setup"
              className="w-full h-full object-cover opacity-90"
            />
          </motion.div>
          {!prefersReducedMotion && (
            <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform">
              <svg
                className="absolute inset-0 h-full w-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <filter id="gg-hero-trail-frost" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
                    <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="8" result="noise" />
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="noise"
                      scale="2.8"
                      xChannelSelector="R"
                      yChannelSelector="G"
                      result="displaced"
                    />
                    <feGaussianBlur in="displaced" stdDeviation="0.35" />
                  </filter>
                  <filter
                    id="gg-hero-frost-filter"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                    colorInterpolationFilters="sRGB"
                  >
                    <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="2" result="noise" />
                    <feDisplacementMap
                      in="blur"
                      in2="noise"
                      scale="28"
                      xChannelSelector="R"
                      yChannelSelector="G"
                      result="displaced"
                    />
                    <feColorMatrix
                      in="displaced"
                      type="matrix"
                      values="1 0 0 0 0.06 0 1 0 0 0.06 0 0 1 0 0.08 0 0 0 1 0"
                    />
                  </filter>

                  <mask
                    id="gg-hero-trail-mask"
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    maskUnits="userSpaceOnUse"
                    maskContentUnits="userSpaceOnUse"
                  >
                    <rect x="0" y="0" width="100" height="100" fill="white" />
                    <g filter="url(#gg-hero-trail-frost)">
                      {trailPointsRef.current.map((p, idx) => {
                        const age = trailNow - p.t;
                        const alpha = age <= TRAIL_HOLD_MS ? 1 : 1 - (age - TRAIL_HOLD_MS) / TRAIL_FADE_MS;
                        if (alpha <= 0) return null;
                        const gray = Math.round(255 * (1 - Math.max(0, Math.min(1, alpha))));
                        const grayColor = `rgb(${gray} ${gray} ${gray})`;
                        return (
                          <circle
                            key={`${p.t}-${idx}`}
                            cx={p.x * 100}
                            cy={p.y * 100}
                            r={revealRadiusRef.current}
                            fill={grayColor}
                          />
                        );
                      })}
                    </g>
                  </mask>
                </defs>

                <image
                  href={BG_URL}
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  preserveAspectRatio="xMidYMid slice"
                  filter="url(#gg-hero-frost-filter)"
                  mask="url(#gg-hero-trail-mask)"
                  opacity="0.92"
                />
              </svg>
            </motion.div>
          )}
          <div className="absolute inset-0 bg-gg-slate/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-gg-slate/80 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto will-change-transform">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 border border-gg-cream/30 rounded-full text-xs font-medium tracking-widest uppercase text-gg-cream/90 mb-6 backdrop-blur-sm">
              Est. 2012
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-gg-cream font-medium mb-6 leading-tight"
          >
            Taste the <span className="italic text-white">Extraordinary</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-gg-cream/90 font-light max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Elevating events with bespoke culinary experiences. From intimate gatherings to grand celebrations, we craft memories through flavor.
          </motion.p>

          
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gg-cream flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase opacity-70">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 opacity-70" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
