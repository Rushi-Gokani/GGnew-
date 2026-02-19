import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function BrandSplit() {
  return (
    <section className="relative w-full h-screen max-h-[900px] overflow-hidden">
      
      {/* FEATURED BRAND: THE FIFTH COURSE */}
      <Link 
        to="/brands/the-fifth-course" 
        className="group relative w-full h-full overflow-hidden block"
      >
        {/* Background Video */}
        <div className="absolute inset-0 bg-gg-slate">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            <source src="https://video.gumlet.io/67489ec0dad6bb7514b3bf09/6981ef084db88a967f9f9e4e/download.mp4" type="video/mp4" />
            Fallback image for browsers that don't support video
          </video>
        </div>

        {/* Overlay - Shifts color on hover */}
        <div className="absolute inset-0 bg-gg-navy/60 group-hover:bg-gg-slate/80 transition-colors duration-700 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <span className="block text-gold-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
              Avant-Garde
            </span>
            <h2 className="font-serif text-5xl md:text-8xl text-white mb-4 group-hover:text-gold-400 transition-colors duration-500">
              The Fifth Course
            </h2>
            <div className="w-12 h-0.5 bg-gold-400 mx-auto my-8 transition-all duration-500 group-hover:w-32" />
            <p className="text-white/90 max-w-xl mx-auto font-light text-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 hidden md:block">
Curated culinary experiences crafted with precision and passion.            </p>
          </motion.div>

          {/* Button */}
          <div className="absolute bottom-12 md:bottom-24 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <span className="flex items-center gap-3 text-gold-400 text-sm font-semibold tracking-widest uppercase border border-gold-400/30 px-8 py-4 rounded-full hover:bg-gold-400 hover:text-gg-slate transition-all">
              Explore Innovation <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>

    </section>
  );
}
