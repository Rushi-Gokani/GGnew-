import { useRef, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChefHat, User, Star, Award, Coffee } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Gauvrav Kejriwal',
    role: 'CHIEF GROWTH OFFICER',
    bio: 'Gaurav Kejriwal is a seasoned F&B entrepreneur with 20+ years of experience, known for building successful restaurant brands across Southeast Asia. As Founding Partner & Chief Growth Officer at Global Gourmet, he leads brand growth, strategy, and partnerships.',
    image: '/Team/Gauvrav Kejriwal.jpg',
    icon: Award,
  },
  {
    name: 'Jaymon Devassy',
    role: 'CHIEF OPERATIONS OFFICER',
    bio: 'Jaymon Devassy has 21+ years of luxury hospitality leadership, with operational experience across leading hotels in India, the Middle East, and Asia. As Founding Partner & COO at Global Gourmet, he leads operations, people strategy, and flawless event execution.',
    image: '/Team/Jaymon Devassy.jpg',
    icon: Coffee,
  },
  {
    name: 'Rajib Mazumdar',
    role: 'CHIEF CULINARY OFFICER',
    bio: 'Chef Rajib Mazumdar has 20+ years of culinary leadership across top hotels and large-scale catering in India and the Middle East.As Founding Partner & Chief Culinary Officer at Global Gourmet, he leads menu innovation, kitchen excellence, and scalable food systems.',
    image: '/Team/Rajib Mazumdar.jpg',
    icon: User,
  },
  {
    name: 'Hetal Pathak',
    role: 'CHIEF FINANCE OFFICER',
    bio: 'Hetal Pathak is a seasoned finance leader with 20+ years of experience in hospitality, overseeing financial strategy, compliance, and governance. As Founding Partner & CFO at Global Gourmet, he drives disciplined growth with expertise in financial planning, cost optimization, and reporting.',
    image: '/Team/Hetal Pathak.jpg',
    icon: Star,
  },
  {
    name: 'Ashish Kejriwal',
    role: 'CHIEF TECHNOLOGY OFFICER',
    bio: 'Ashish Kejriwal is an entrepreneurship-driven technologist with a background in economics and hospitality innovation. As a Founding Partner at Global Gourmet, he leads technology and innovation to build future-ready, seamless F&B systems.',
    image: '/Team/Ashish Kejriwal.jpg',
    icon: ChefHat,
  },
];



export default function Team() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const teamGridRef = useRef<HTMLElement | null>(null);
  const memberCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  memberCardsRef.current = [];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroBgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const targets = memberCardsRef.current.filter(
        (el): el is HTMLDivElement => Boolean(el)
      );
      
      if (targets.length) {
        gsap.fromTo(
          targets,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: teamGridRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-gg-cream text-gg-slate">
      <section ref={heroRef} className="relative isolate overflow-hidden min-h-[60vh] flex items-center">
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2000&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            scale: heroBgScale,
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gg-navy/80 mix-blend-multiply" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gg-navy/50 to-transparent" />
        
        <div className="max-w-6xl mx-auto px-6 py-24 w-full text-white text-center">
          <motion.div
            style={{ y: heroContentY, opacity: heroContentOpacity }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xs uppercase tracking-[0.5em] text-white/70 mb-6">Our People</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
              The Artisans Behind the Experience
            </h1>
            <p className="mt-8 text-lg text-white/80 leading-relaxed">
              Meet the passionate individuals who dedicate their craft to creating unforgettable culinary moments.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={teamGridRef} className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {teamMembers.map((member, idx) => (
              <div
                key={member.name}
                ref={(el) => {
                  memberCardsRef.current[idx] = el;
                }}
                className={`group relative lg:col-span-2 ${idx === 3 ? 'lg:col-start-2' : ''}`}
              >
                <div className="aspect-[3/4] overflow-hidden rounded-[2rem] bg-gg-navy/5 mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gg-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <member.icon className="w-6 h-6 text-white mb-2" />
                    <p className="text-white/90 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-gg-navy">{member.name}</h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-gg-slate/60 mt-2">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
