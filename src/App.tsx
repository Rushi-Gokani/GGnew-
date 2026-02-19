import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Lenis from './lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip Lenis smooth scroll on mobile — saves significant main thread time
    const isMobile = window.innerWidth < 768;
    let lenis: Lenis | null = null;
    let rafId: number;

    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        lerp: 0.1,
      });

      let lastTime = 0;
      const targetFPS = 60;
      const frameInterval = 1000 / targetFPS;

      function raf(time: number) {
        const deltaTime = time - lastTime;
        if (deltaTime >= frameInterval) {
          lenis!.raf(time);
          lastTime = time - (deltaTime % frameInterval);
        }
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    }

    // Loading screen timer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      <div className="font-sans text-gg-slate bg-gg-cream selection:bg-gg-navy selection:text-white">
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

