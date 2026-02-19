import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Facebook, Twitter, LayoutGrid, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  // Throttled scroll handler for better performance
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (rafRef.current !== null) return;

    const now = performance.now();
    const timeSinceLastUpdate = now - lastUpdateRef.current;

    // Update immediately if enough time has passed, otherwise schedule
    if (timeSinceLastUpdate > 100) {
      setIsScrolled(latest > 50);
      lastUpdateRef.current = now;
    } else {
      rafRef.current = requestAnimationFrame(() => {
        setIsScrolled(latest > 50);
        lastUpdateRef.current = performance.now();
        rafRef.current = null;
      });
    }
  });

  // Lock body scroll when menu is open + cleanup RAF
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobileMenuOpen]);

  // Determine navbar style based on route and scroll state
  const isHome = location.pathname === '/';

  // Desktop Navbar Styles
  let navbarBg = 'bg-gg-cream/90 backdrop-blur-md shadow-sm';
  let textColor = 'text-gg-navy';

  if (isHome && !isScrolled) {
    navbarBg = 'bg-transparent';
    textColor = 'text-white';
  } else if (isScrolled) {
    navbarBg = 'bg-gg-cream/90 backdrop-blur-md shadow-sm';
    textColor = 'text-gg-navy';
  }

  // Mobile Pill Styles (Always solid/glass for visibility)
  const mobilePillBg = 'bg-gg-navy/95';
  const mobilePillText = 'text-gg-cream';
  const mobileMenuBg = 'bg-gg-navy';

  const navLinks = [
    {
      name: 'About',
      href: '/about',
      children: [
        { name: 'Our Story', href: '/about' },
        { name: 'Team', href: '/team' },
        { name: 'Community', href: '/community' },
        { name: 'Experience Center', href: '/experience-center' }
      ]
    },
    { name: 'Zero Waste', href: '/zero-waste' },
    { name: 'Brands', href: '/brands' },
    { name: 'Memories', href: '/memories' },
    // { name: 'Services', href: '/#services' },
    // { name: 'Alliances', href: '/#alliances' },
    // { name: 'Presence', href: '/presence' },
    // { name: 'Contact', href: '/contact' },
  ];

  // Animation Variants
  const easeExpo: [number, number, number, number] = [0.76, 0, 0.24, 1];
  const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const menuVariants = {
    initial: {
      clipPath: "inset(0% 0% 100% 0%)",
      transition: { duration: 0.5, ease: easeExpo }
    },
    animate: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 0.5, ease: easeExpo }
    },
    exit: {
      clipPath: "inset(100% 0% 0% 0%)",
      transition: { duration: 0.5, ease: easeExpo }
    }
  };

  const containerVariants = {
    initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    animate: { transition: { delayChildren: 0.3, staggerChildren: 0.07 } },
    exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const linkVariants = {
    initial: { y: "100%", opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: easeOut }
    },
    exit: { y: "100%", opacity: 0 }
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <motion.nav
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 ${navbarBg}`}
      >
        <div className="max-w-7xl mx-auto px-12 w-full flex items-center justify-between relative">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={isHome && !isScrolled ? "/logo.webp" : "/logo-blue.webp"}
              alt="Global Gourmet"
              className="h-10 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group/item">
                <Link
                  to={link.href}
                  className={`text-sm font-medium tracking-wide uppercase hover:opacity-70 transition-opacity flex items-center gap-1 ${textColor}`}
                >
                  {link.name}
                  {link.children && <ChevronDown className="w-3 h-3" />}
                </Link>

                {link.children && (
                  <div className="absolute top-full left-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto transition-all duration-300">
                    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-2 min-w-[160px] border border-gg-navy/5 flex flex-col gap-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="px-4 py-2 text-sm text-gg-navy hover:bg-gg-navy/5 rounded-lg transition-colors uppercase tracking-wide"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <Link to="/contact" className="px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-lg bg-gg-navy text-white hover:bg-gg-slate">
              Book Now
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE FLOATING PILL HEADER */}
      <motion.div
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`md:hidden fixed top-6 left-1/2 z-50 w-[90%] max-w-[380px] rounded-full px-5 py-3 flex items-center justify-between shadow-2xl backdrop-blur-lg border border-white/10 transition-colors duration-500 ${mobilePillBg} ${mobilePillText}`}
      >
        {/* Logo in Pill */}
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center">
          <img
            src="/logo.webp"
            alt="Global Gourmet"
            className="h-7 w-auto"
          />
        </Link>

        {/* Modern Menu Trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center gap-3 pl-4 border-l border-white/10"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-90">
            {isMobileMenuOpen ? 'Close' : 'Menu'}
          </span>
          <div className={`p-2 rounded-full transition-colors ${isMobileMenuOpen ? 'bg-white/20' : 'bg-white/10'}`}>
            {isMobileMenuOpen ? <X size={16} /> : <LayoutGrid size={16} />}
          </div>
        </button>
      </motion.div>

      {/* FULL SCREEN MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`fixed inset-0 z-40 flex flex-col justify-center px-6 md:hidden ${mobileMenuBg} ${mobilePillText}`}
          >
            <div className="flex flex-col h-full justify-center pt-20 pb-10">
              {/* Navigation Links */}
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col gap-4"
              >
                {navLinks.map((link, idx) => (
                  <div key={idx} className="overflow-hidden">
                    <motion.div variants={linkVariants}>
                      {link.children ? (
                        <div className="flex flex-col gap-2">
                          <Link
                            to={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-4xl font-serif font-medium tracking-tight hover:text-white/70 transition-colors"
                          >
                            {link.name}
                          </Link>
                          <div className="flex flex-col gap-2 pl-4 border-l border-white/20 ml-2">
                            {link.children.map((child) => (
                              <Link
                                key={child.name}
                                to={child.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl font-serif text-white/80 hover:text-white transition-colors"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-4xl font-serif font-medium tracking-tight hover:text-white/70 transition-colors"
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  </div>
                ))}
              </motion.div>

              {/* Footer Info in Menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="border-t border-white/20 pt-8 mt-12"
              >
                <div className="flex flex-col gap-4">
                  <p className="text-xs opacity-60 uppercase tracking-widest">Get in Touch</p>
                  <a href="mailto:experience@globalgourmet.asia" className="text-lg font-medium hover:opacity-70">experience@globalgourmet.asia</a>
                  <div className="flex gap-6 mt-2">
                    <a href="#" className="hover:scale-110 transition-transform"><Instagram className="w-5 h-5" /></a>
                    <a href="#" className="hover:scale-110 transition-transform"><Facebook className="w-5 h-5" /></a>
                    <a href="#" className="hover:scale-110 transition-transform"><Twitter className="w-5 h-5" /></a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
