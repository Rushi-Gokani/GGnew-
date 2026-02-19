import { motion } from 'framer-motion';
import { Section } from '../../components/ui/Section';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Color Palette
// Background: #14233C
// Header: #B46A44
// Accents: #B9915F, #283C5A

const colors = {
  bg: '#14233C',
  header: '#B46A44',
  accent1: '#B9915F',
  accent2: '#283C5A',
  text: '#F5F5F5', // Assuming light text for dark background
  muted: '#94A3B8'
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function TheFifthCourse() {
  return (
    <main style={{ backgroundColor: colors.bg, color: colors.text }} className="min-h-screen font-sans selection:bg-[#14233C] selection:text-white">

      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <video
            src="https://video.gumlet.io/67489ec0dad6bb7514b3bf09/696f4999bcef432370c946fa/download.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Logo with subtle glow background for visibility */}
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-black/30 blur-2xl rounded-full scale-150" />
              <img
                src="/the-fifth-course-logo.png"
                alt="The Fifth Course"
                className="relative w-32 md:w-48 mx-auto"
              />
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 tracking-tight leading-tight">
              The Art of Curated <br /> Dining Experiences
            </h1>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#14233C] rounded-full hover:bg-[#14233C] hover:text-white border border-transparent hover:border-white transition-all duration-300 text-lg font-medium tracking-wide"
            >
              Enquire for an Experience
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. WHAT IS THE FIFTH COURSE */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl mb-8 text-[#14233C]">
                What is The Fifth Course?
              </motion.h2>
              <motion.div variants={fadeInUp} className="space-y-6 text-lg text-gray-800 leading-relaxed">
                <p>
                  In every celebration, there’s a moment that stays. A bite that lingers. A feeling that returns.
                </p>
                <p className="text-xl font-serif italic text-[#14233C]">
                  That’s The Fifth Course.
                </p>
                <p>
                  We were born from a question: <br />
                  <em>What happens after you think it’s all been served?</em>
                </p>
                <p>
                  The Fifth Course isn’t a course on a menu — it’s a philosophy. The unexpected flourish. The taste you didn’t see coming. The story you didn’t know you needed to tell.
                </p>
                <p className="font-medium text-black">
                  This is not catering. This is a curated sensory experience.
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] overflow-hidden rounded-sm"
            >
              <img
                src="/images/AV.png"
                alt="Plating Art"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 border border-[#14233C]/20 m-4 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* 3. THE FIFTH COURSE MOMENT */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/abc1.jpg"
            alt="The Moment"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[#14233C]/80" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h3 className="font-serif text-4xl md:text-6xl mb-8 text-white">
              The Fifth Course Moment
            </h3>
            <p className="text-2xl md:text-3xl font-light leading-normal text-gray-200">
              A final, breath-taking crescendo that elevates the event into an enduring shared bond.
            </p>
            <div className="w-24 h-1 bg-white mx-auto my-12" />
            <p className="text-xl text-gray-400 italic">
              A moment that arrives when you think everything has already been served — <br />
              and lingers long after the last exquisite bite.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. CORE OFFERINGS */}
      <Section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl mb-4 text-[#14233C]">Core Offerings</h2>
            <div className="w-full h-px bg-[#14233C]/30 max-w-xs mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
            {[
              { name: "Menu Curation", span: "md:col-span-2 md:row-span-2", size: "text-3xl", image: "/images/foodglaze/burger_11zon.jpg" },
              { name: "Sit Down Dinner Service", span: "md:col-span-2", size: "text-2xl", image: "/images/foodglaze/sit.jpg" },
              { name: "Live Canapé Trays", span: "", size: "text-lg", image: "/images/foodglaze/ive stat_11zon.jpg" },
              { name: "Canapé Trays", span: "", size: "text-lg", image: "/images/foodglaze/live canapé trays.png" },
              { name: "Buffet Styling", span: "", size: "text-lg", image: "/images/foodglaze/buffet.png" },
              { name: "Dessert Rooms", span: "", size: "text-lg", image: "/images/foodglaze/d room.png" },
              { name: "Grazing Tables", span: "md:col-span-2", size: "text-2xl", image: "/images/foodglaze/glz table.png" },
              { name: "Food Installations", span: "", size: "text-lg", image: "/images/foodglaze/Food Installations.png" },
              { name: "Pop-Up Restaurants", span: "", size: "text-lg", image: "/images/foodglaze/Pop-Up Restaurants.png" },
              { name: "Live Stations & Kiosks", span: "md:col-span-2", size: "text-2xl", image: "/images/foodglaze/ww.jpg" },
            ].map((item, idx) => (

              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                className={`group relative flex flex-col items-center justify-center p-6 border border-[#14233C]/10 bg-[#f8f9fa] hover:bg-transparent transition-all duration-500 rounded-sm cursor-default overflow-hidden ${item.span}`}
              >
                {/* Background Image on Hover */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100"
                  />
                  {/* Blue Overlay */}
                  <div className="absolute inset-0 bg-blue-900/80 transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100" />
                </div>

                {/* Decorative background gradient (optional, keeping for subtle depth if image fails or delays) */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#14233C]/0 via-transparent to-[#14233C]/0 group-hover:from-[#14233C]/10 group-hover:to-transparent transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100" />

                <div className="relative z-10 text-center">
                  <span className="block text-[#14233C] mb-3 opacity-60 group-hover:text-white group-hover:opacity-100 group-hover:rotate-180 transition-all duration-500 transform group-hover:-translate-y-1">✦</span>
                  <h3 className={`font-serif text-[#14233C]/75 group-hover:text-white transition-colors tracking-wide ${item.size}`}>
                    {item.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. CRAFTED FOR CONNECTION */}
      <Section className="py-32 flex items-center justify-center text-center bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="font-serif text-5xl md:text-7xl mb-12 text-[#14233C]">
              Crafted for Connection
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-2xl md:text-3xl font-light mb-8 leading-relaxed">
              We exist to bring people closer.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-2xl mx-auto">
              In an increasingly distracted world, we create moments of shared presence and profound connection.
              Our service is designed to foster conversation, create shared memories, and turn a gathering into a lasting bond.
            </motion.p>
          </motion.div>
        </div>
      </Section>

      {/* 6. WHAT SETS US APART */}
      <Section className="py-24 bg-[#0f1a2e]">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl mb-16 text-center text-white">What Sets Us Apart</h2>
          {/* Top Row - 3 items */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
            {[
              {
                title: "Storytelling & Narrative",
                desc: "Food is a powerful storytelling medium, with each menu crafted as a unique narrative that reflects the essence of the event."
              },
              {
                title: "Intentionality",
                desc: "Every element is rooted in meaning. Nothing is accidental."
              },
              {
                title: "Visual Spectacle",
                desc: "Our food is designed to be as visually striking as it is delicious — turning meals into moments of awe."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#14233C] p-8 border-l-2 border-white"
              >
                <h3 className="font-serif text-2xl text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          {/* Bottom Row - 2 items centered */}
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
            {[
              {
                title: "Theatrical Elements",
                desc: "Service becomes performance, designed to captivate and engage."
              },
              {
                title: "Connection",
                desc: "All our offerings are centred around increasing connection and interaction."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx + 3}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx + 3) * 0.1 }}
                className="bg-[#14233C] p-8 border-l-2 border-white md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
              >
                <h3 className="font-serif text-2xl text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* 7. THE POETRY OF PRECISION */}
      <Section className="py-0 bg-white">
        <div className="grid md:grid-cols-2 min-h-[80vh]">
          <div className="relative h-full min-h-[50vh]">
            <img
              src="/images/LAB.png"
              alt="Precision"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center p-12 md:p-24 bg-[#14233C]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl mb-8 text-white">
                The Poetry of Precision
              </motion.h2>
              <motion.div variants={fadeInUp} className="space-y-6 text-lg text-gray-300">
                <p>Every garnish is a deliberate sentence.<br />Every flavor, a chapter in your unique story.</p>
                <p className="text-white italic">No detail is accidental.</p>
                <p>We orchestrate sensory masterpieces designed to evoke emotion through minimalist elegance.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* 8. EXPERIENCE & IMMERSION */}
      <Section className="py-24 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2 md:order-1"
            >
              <h2 className="font-serif text-4xl md:text-5xl mb-8 text-[#14233C]">
                Experience & Immersion
              </h2>
              <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                By meticulously orchestrating scent, sound, and setting, we transform a meal into an immersive performance that challenges the obvious and celebrates the unforgettable.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed">
                We use organic textures and refined settings to turn a gathering into a shared, timeless experience.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2"
            >
              <img
                src="/images/xyz123.jpg"
                alt="Immersive Dining"
                className="rounded-sm shadow-2xl shadow-[#000000]/50"
              />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* 9. INFRASTRUCTURE & CAPABILITY */}
      <Section className="py-24 bg-[#0f1a2e]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-white">
              Where Culinary Craft Meets Operational Precision
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our infrastructure is purpose-built to deliver excellence at scale — seamlessly combining innovation, hygiene, and versatility.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Integrated Central Kitchen", "Dedicated Veg & Non-Veg Zones",
              "Bulk Production Capability", "Global Cuisine Readiness",
              "Cold Chain Management", "Hygiene & Compliance",
              "Tech-Integrated Operations"
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-[#14233C] p-6 text-center border border-[#283C5A] rounded-sm"
              >
                <div className="w-2 h-2 bg-white rounded-full mx-auto mb-4" />
                <span className="text-gray-300 text-sm md:text-base">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* 10. SUSTAINABILITY */}
      <Section className="py-24 bg-[#14233C]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto border border-white/30 p-8 md:p-12 relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center"
            >
              <motion.h2 variants={fadeInUp} className="font-serif text-3xl mb-8 text-white">
                Sustainability
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-white mb-8">
                Sustainability is not a trend — it’s a commitment woven into every aspect of our culinary and operational choices.
              </motion.p>
              <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6 text-left text-gray-400 text-sm md:text-base">
                <p>• We prioritize seasonal, locally sourced, and ethically farmed ingredients.</p>
                <p>• We minimize waste through intelligent portioning and live counters.</p>
                <p>• We use recyclable, biodegradable, and reusable materials.</p>
                <p>• We work with partners who share our commitment to responsible practices.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* 11. SERVING BEYOND THE PLATE */}
      <Section className="py-24 text-center bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-3xl mb-6 text-[#14233C]">Serving Beyond the Plate</h2>
            <p className="text-xl text-gray-300 mb-8">
              Giving back isn’t an initiative — it’s a value system.
            </p>
            <p className="text-2xl font-serif italic text-[#14233C]">
              Because true hospitality doesn’t end with service. <br />
              It begins with humanity.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* 12. CONTACT / ENQUIRY CTA */}
      <section id="contact" className="py-24 bg-[#0f1a2e] border-t border-[#283C5A]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Connect With Us</h2>
            <p className="text-xl text-white mb-12">Let's curate a moment that stays.</p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 text-lg text-gray-300">
              <a href="mailto:experience@globalgourmet.asia" className="hover:text-white transition-colors">
                <span className="block text-sm text-white uppercase tracking-widest mb-1">Email</span>
                experience@globalgourmet.asia
              </a>
              <a href="tel:+66922802121" className="hover:text-white transition-colors">
                <span className="block text-sm text-white uppercase tracking-widest mb-1">Phone</span>
                +66 922 802 121
              </a>
            </div>

            <div className="mt-16">
              <button className="bg-white text-[#14233C] px-10 py-4 rounded-sm uppercase tracking-widest hover:bg-gray-200 transition-colors duration-300">
                Start Your Journey
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}

