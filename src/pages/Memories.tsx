import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';

const memoryPhotos = [
 { id: 2, src: '/Memories/Copy of B1621176.webp', alt: 'Special moment' },
  { id: 3, src: '/Memories/Copy of T1020266-HDR.webp', alt: 'Grand celebration' },
  { id: 4, src: '/Memories/Copy of T1020301-HDR.webp', alt: 'Elegant setting' },
  { id: 5, src: '/Memories/Copy of T1020473.webp', alt: 'Festive atmosphere' },
  { id: 6, src: '/Memories/Copy of T1030041.webp', alt: 'Memorable occasion' },
  { id: 7, src: '/Memories/Copy of T1030073.webp', alt: 'Celebration moment' },
  { id: 8, src: '/Memories/Copy of T1030129.webp', alt: 'Joyful gathering' },
  { id: 9, src: '/Memories/Copy of T1030142.webp', alt: 'Beautiful memory' },
  { id: 10, src: '/Memories/Copy of T1030168.webp', alt: 'Cherished moment' },
  { id: 11, src: '/Memories/Copy of T1030260.webp', alt: 'Happy celebration' },
  { id: 12, src: '/Memories/Copy of B1620458.webp', alt: 'Event memory' },
  { id: 13, src: '/Memories/Copy of T1020356-HDR.webp', alt: 'Culinary art' },
  { id: 14, src: '/Memories/Copy of T1020380.webp', alt: 'Dining experience' },
  { id: 15, src: '/Memories/Copy of T1020463 (1).webp', alt: 'Gathering' },
  { id: 16, src: '/Memories/Copy of T1020465.webp', alt: 'Celebration' },
  { id: 17, src: '/Memories/asd.webp', alt: 'Memory' },
  { id: 18, src: '/Memories/Copy of T1020460.webp', alt: 'Special event' },
  { id: 19, src: '/Memories/Copy of T1020628.webp', alt: 'Festive moment' },
  { id: 20, src: '/Memories/Copy of T1020635.webp', alt: 'Joyful time' },
  { id: 21, src: '/Memories/Copy of B1630225.webp', alt: 'Elegant dinner' },
  { id: 22, src: '/Memories/Copy of T1020629.webp', alt: 'Gala night' },
  { id: 23, src: '/Memories/Copy of B1630545.webp', alt: 'Grand event' },
  { id: 24, src: '/Memories/Copy of B1620826.webp', alt: 'Beautiful setting' },
  { id: 25, src: '/Memories/3.webp', alt: 'Precious moment' },
  { id: 26, src: '/Memories/Copy of DSCF7459 (1).webp', alt: 'Kitchen prep' },
  { id: 27, src: '/Memories/Copy of DSCF7482.webp', alt: 'Culinary creation' },
  { id: 28, src: '/Memories/Copy of DSCF7580.webp', alt: 'Food artistry' },
  { id: 29, src: '/Memories/Copy of B1620953.webp', alt: 'Special occasion' },
  { id: 30, src: '/Memories/inovation.webp', alt: 'Innovation' },
  { id: 31, src: '/Memories/Copy of B1620419.webp', alt: 'Event highlight' },
  { id: 32, src: '/Memories/4.webp', alt: 'Cherished memory' },
  { id: 33, src: '/Memories/Copy of B1620983 copy.webp', alt: 'Celebration time' },
  { id: 34, src: '/Memories/Copy of B1620687.webp', alt: 'Wonderful moment' },
  { id: 35, src: '/Memories/Copy of B1621249.webp', alt: 'Unforgettable event' },
  { id: 36, src: '/Memories/chef-plating-food.webp', alt: 'Chef at work' },
  { id: 37, src: '/Memories/workspace.webp', alt: 'Workspace' },
  { id: 38, src: '/Memories/Copy of B1630926.webp', alt: 'Culinary lab' },
  { id: 39, src: '/Memories/Copy of DJI_20251222143543_0363_D.webp', alt: 'Aerial view' },
  { id: 40, src: '/Memories/Copy of B1630871.webp', alt: 'Innovation center' },
  { id: 41, src: '/Memories/culinary.webp', alt: 'Culinary excellence' },
  { id: 42, src: '/Memories/Copy of B1630845.webp', alt: 'Modern kitchen' },
];

// Ultra-lightweight card - no transitions during scroll
const MemoryCard = React.memo(({ photo, isVisible }: { photo: { id: number; src: string; alt: string }, isVisible: boolean }) => {
  return (
    <div className="memory-card-container">
      {isVisible ? (
        <img
          src={photo.src}
          alt={photo.alt}
          className="memory-card-image"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="memory-card-placeholder" />
      )}
    </div>
  );
});

export default React.memo(function Memories() {
  const [visibleCount, setVisibleCount] = useState(12);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  
  const visiblePhotos = useMemo(() => memoryPhotos.slice(0, visibleCount), [visibleCount]);
  const hasMore = visibleCount < memoryPhotos.length;

  // IntersectionObserver for lazy rendering
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute('data-id'));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set(prev).add(id));
          }
        });
      },
      {
        rootMargin: '200px 0px', // Load images 200px before they enter viewport
        threshold: 0,
      }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Observe new cards
  useEffect(() => {
    const observer = observerRef.current;
    if (!observer) return;

    cardRefs.current.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [visiblePhotos]);

  const setCardRef = useCallback((id: number, element: HTMLDivElement | null) => {
    if (element) {
      cardRefs.current.set(id, element);
      observerRef.current?.observe(element);
    } else {
      const el = cardRefs.current.get(id);
      if (el) observerRef.current?.unobserve(el);
      cardRefs.current.delete(id);
    }
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + 12, memoryPhotos.length));
  }, []);

  return (
    <>
      {/* Scoped styles for maximum performance */}
      <style>{`
        .memory-card-container {
          overflow: hidden;
          border-radius: 1rem;
          border: 1px solid rgba(139, 129, 120, 0.1);
          height: 320px;
          background: rgba(250, 248, 244, 0.5);
          contain: strict;
          content-visibility: auto;
          contain-intrinsic-size: 0 320px;
        }
        .memory-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .memory-card-container:hover .memory-card-image {
          transform: scale(1.05) translateZ(0);
          transition: transform 0.5s ease-out;
        }
        .memory-card-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(250, 248, 244, 0.8), rgba(139, 129, 120, 0.1));
        }
      `}</style>
      
      <main 
        className="bg-gg-cream text-gg-slate pt-28 md:pt-36 pb-20 min-h-screen"
        data-lenis-prevent
      >
        <section className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.4em] text-xs text-gg-taupe">Memories</p>
            <h1 className="font-serif text-4xl md:text-5xl text-gg-navy mt-4">
              A visual archive of <span className="italic text-gold-500">joy</span>
            </h1>
            <p className="text-gg-slate/70 max-w-2xl mx-auto mt-4">
              Curated glimpses from our favorite celebrations—captured through color, texture, and emotion.
              Each frame is a keepsake of the experiences we design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visiblePhotos.map((photo) => (
              <div 
                key={photo.id} 
                ref={(el) => setCardRef(photo.id, el)}
                data-id={photo.id}
              >
                <MemoryCard photo={photo} isVisible={visibleCards.has(photo.id)} />
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-gg-navy text-white rounded-full hover:bg-gg-navy/90 transition-colors duration-300 font-medium tracking-wide text-sm"
              >
                Load More Memories
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
});
