import { motion } from 'framer-motion';
import { Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const footerLinks = [
  {
    title: "Explore",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Services", href: "/#services" },
      { name: "Experience Center", href: "/experience-center" },
      { name: "Community", href: "/community" },
    ]
  },
  {
    title: "Connect",
    links: [
      { name: "Contact", href: "/contact" },
      { name: "Team", href: "/team" },
      { name: "Memories", href: "/memories" },
    ]
  }
];

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/thefifthcourse.experience?igsh=dWM0bHoxanJicmJ1" },
  { icon: Facebook, href: "https://www.facebook.com/share/16DXJNhanq/" },
];

export default function Footer() {
  const location = useLocation();
  const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const handleScroll = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut }
    }
  };

  return (
    <footer className="bg-gg-slate text-gg-taupe py-20 md:py-32 overflow-hidden relative">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gg-navy/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Top Section: CTA */}
      

        {/* Middle Section: Links & Info */}
        <div className="grid md:grid-cols-12 gap-12 mb-20">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <Link to="/" className="inline-block mb-8 group">
              <img
                src="/logo.png"
                alt="Global Gourmet"
                className="h-12 w-auto transition-transform group-hover:scale-105"
              />
            </Link>
            <div className="flex gap-4 mb-8">
              {socialLinks.map((Social, idx) => (
                <motion.a
                  key={idx}
                  href={Social.href}
                  whileHover={{ y: -5, color: '#FFF7ED', borderColor: '#d4af37' }}
                  className="w-12 h-12 rounded-full border border-gg-taupe/30 flex items-center justify-center hover:bg-gold-400/10 transition-all"
                >
                  <Social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-gg-taupe/60 max-w-xs">
              Crafting exceptional culinary experiences for the world's most discerning clients since 2020.
            </p>
          </motion.div>

          {/* Navigation Columns */}
          {footerLinks.map((column, idx) => (
            <motion.div key={idx} variants={itemVariants} className="md:col-span-2">
              <h4 className="text-gg-cream font-medium mb-6">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      to={link.href}
                      onClick={() => handleScroll(link.href)}
                      className="hover:text-gold-400 transition-colors flex items-center gap-2 group"
                    >
                      <span className="relative overflow-hidden">
                        {link.name}
                        <span className="absolute left-0 bottom-0 w-full h-px bg-gold-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Brands Portfolio Column (Replaces Newsletter) */}
          <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-gg-cream font-medium mb-2">Our Portfolio</h4>
            
            {/* The Fifth Course Card */}
            <Link to="/brands/the-fifth-course" className="group block bg-white/5 p-6 rounded-xl hover:bg-gg-navy transition-all duration-500 border border-white/5 hover:border-gold-400/20 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-serif text-2xl text-gg-cream group-hover:text-gold-400 mb-1 transition-colors">The Fifth Course</h5>
                  <p className="text-xs text-gg-taupe group-hover:text-gold-400/80 uppercase tracking-widest font-medium">Modern Gastronomy</p>
                </div>
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-gold-400/20 transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-gg-taupe group-hover:text-gold-400 transition-colors" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Section: Copyright */}
        <motion.div 
          variants={itemVariants} 
          className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gg-taupe/20 text-sm text-gg-taupe/80"
        >
          <p>
            &copy; {new Date().getFullYear()} Global Gourmet Inc. All rights reserved. 
            <span className="hidden md:inline mx-2">|</span> 
            <span className="block md:inline mt-2 md:mt-0">
              Mindfully crafted by <a href="https://scraft.studio/" target="_blank" rel="noopener noreferrer" className="hover:text-gg-cream transition-colors">Scraft</a>
            </span>
          </p>
          <div className="flex gap-8">
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
