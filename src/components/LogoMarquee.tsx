import React from 'react';

const logos = [
  // Using placeholder logos that look professional
  { name: "Vogue", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Vogue_logo.svg/2560px-Vogue_logo.svg.png" },
  { name: "Forbes", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Forbes_logo.svg/2560px-Forbes_logo.svg.png" },
  { name: "Chanel", url: "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Chanel_logo_interlocking_cs.svg/1200px-Chanel_logo_interlocking_cs.svg.png" },
  { name: "Ritz Carlton", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Ritz-Carlton_Logo.svg/2560px-Ritz-Carlton_Logo.svg.png" },
  { name: "Bentley", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Bentley_logo.svg/2560px-Bentley_logo.svg.png" },
  { name: "Moet Chandon", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Mo%C3%ABt_%26_Chandon_logo.svg/2560px-Mo%C3%ABt_%26_Chandon_logo.svg.png" },
  { name: "Rolex", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Rolex_logo.svg/2560px-Rolex_logo.svg.png" },
  { name: "Sotheby's", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Sothebys_Logo.svg/2560px-Sothebys_Logo.svg.png" },
];

export default function LogoMarquee() {
  return (
    <div className="w-full pt-16 md:pt-24 border-t border-gg-taupe/10 mt-16 md:mt-24">
      <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-gg-taupe mb-10">
        Trusted by World-Class Brands
      </p>
      
      <div className="relative w-full overflow-hidden pause-on-hover group">
        {/* Gradient Masks for smooth fade out at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gg-cream to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gg-cream to-transparent z-10" />

        <div className="flex animate-marquee">
          {/* First Loop */}
          <div className="flex items-center gap-16 md:gap-32 px-8 md:px-16">
            {logos.map((logo, index) => (
              <img 
                key={`l1-${index}`}
                src={logo.url} 
                alt={logo.name}
                className="h-8 md:h-10 w-auto object-contain opacity-40 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100 cursor-pointer"
              />
            ))}
          </div>
          
          {/* Second Loop (Duplicate for seamless scroll) */}
          <div className="flex items-center gap-16 md:gap-32 px-8 md:px-16">
            {logos.map((logo, index) => (
              <img 
                key={`l2-${index}`}
                src={logo.url} 
                alt={logo.name}
                className="h-8 md:h-10 w-auto object-contain opacity-40 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100 cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
