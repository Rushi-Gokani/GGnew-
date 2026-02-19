import { Section, FadeIn } from './ui/Section';

const menuItems = [
  {
    category: "Appetizer",
    name: "Seared Scallops",
    desc: "Cauliflower purée, crispy pancetta, truffle oil drizzle.",
    price: "$18",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=2070&auto=format&fit=crop"
  },
  {
    category: "Main Course",
    name: "Herb-Crusted Lamb",
    desc: "Fondant potatoes, seasonal greens, red wine reduction.",
    price: "$34",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    category: "Dessert",
    name: "Dark Chocolate Tart",
    desc: "Sea salt caramel, raspberry coulis, gold leaf.",
    price: "$14",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1964&auto=format&fit=crop"
  },
  {
    category: "Cocktail",
    name: "Rosemary Gin Fizz",
    desc: "Botanical gin, fresh lemon, rosemary syrup, egg white.",
    price: "$12",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function MenuPreview() {
  return (
    <Section id="menu" dark className="relative">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-2">Seasonal Highlights</h2>
            <p className="text-stone-400">A glimpse into our current favorite creations.</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a href="#" className="text-gold-400 hover:text-gold-500 transition-colors border-b border-gold-400 pb-1">
              View Full Menu PDF
            </a>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, index) => (
            <FadeIn key={index} delay={index * 0.12}>
              <div className="flex flex-col gap-4">
                <article className="group relative h-full min-h-[420px] rounded-[32px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.45)] bg-gradient-to-b from-white/10 to-white/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 transition-colors duration-500 bg-gradient-to-t ${
                      index % 2 === 0
                        ? 'from-emerald-900/90 via-emerald-700/40 to-transparent'
                        : 'from-purple-900/90 via-purple-700/40 to-transparent'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90" />

                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 gap-3">
                    <div className="space-y-3">
                      <span className="text-white/80 text-xs tracking-[0.35em] uppercase block">
                        {item.category}
                      </span>
                      <p className="text-white/85 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                      <div className="flex items-center justify-between pt-3">
                        <span className="text-white font-semibold text-lg">
                          {item.price}
                        </span>
                        <button className="inline-flex items-center gap-2 text-white text-sm font-semibold tracking-wide uppercase border border-white/40 rounded-full px-5 py-2 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                          Explore Now
                          <span className="text-base leading-none">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
                <h3 className="text-white text-2xl font-serif leading-tight px-2">
                  {item.name}
                </h3>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
