import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Home from '../pages/Home';
import PageTransition from './PageTransition';

const About = lazy(() => import('../pages/About'));
const Memories = lazy(() => import('../pages/Memories'));
const ZeroWaste = lazy(() => import('../pages/ZeroWaste'));
const Presence = lazy(() => import('../pages/Presence'));
const Brands = lazy(() => import('../pages/Brands'));
const TheFifthCourse = lazy(() => import('../pages/brands/TheFifthCourse'));
const ExperienceCenter = lazy(() => import('../pages/ExperienceCenter'));
const Team = lazy(() => import('../pages/Team'));
const Community = lazy(() => import('../pages/Community'));
const Contact = lazy(() => import('../pages/Contact'));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/memories" element={<PageTransition><Memories /></PageTransition>} />
        <Route path="/zero-waste" element={<PageTransition><ZeroWaste /></PageTransition>} />
        <Route path="/presence" element={<PageTransition><Presence /></PageTransition>} />
        <Route path="/brands" element={<PageTransition><Brands /></PageTransition>} />
        <Route path="/brands/the-fifth-course" element={<PageTransition><TheFifthCourse /></PageTransition>} />
        <Route path="/experience-center" element={<PageTransition><ExperienceCenter /></PageTransition>} />
        <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
        <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
    </Suspense>
  );
};

export default AnimatedRoutes;
