import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../components/ui/Section';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    guestCount: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || '';

      const payload = {
        first_name: firstName,
        last_name: lastName,
        full_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        guest_count: formData.guestCount,
        message: formData.message,
        interest: "General Inquiry",
        budget: 0,
        // Add variations to match ContactSection.tsx
        fullName: formData.name,
        firstName: firstName,
        lastName: lastName,
      };

      const response = await fetch('https://feed.ohmylead.com/api/webhook/9fa8e014-82c7-4f9c-a5e9-97ad8666581c', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Webhook error:', response.status, errorText);
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }

      setShowSuccess(true);
      setFormData({ name: '', email: '', phone: '', city: '', guestCount: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, name, value } = e.target;
    const fieldId = id || name;

    if (fieldId === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({
        ...prev,
        [fieldId]: numericValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [fieldId]: value
      }));
    }
  };

  return (
    <main className="bg-[#fff7ef] text-gg-slate pt-32 md:pt-36 relative">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-gg-navy/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl relative text-center"
            >
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gg-slate/5 transition-colors"
              >
                <X className="w-5 h-5 text-gg-slate/40" />
              </button>
              
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              
              <h3 className="font-serif text-3xl text-gg-navy mb-4">Message Sent!</h3>
              <p className="text-gg-slate/70 mb-8 leading-relaxed">
                Thank you for reaching out. We have received your message and will get back to you shortly.
              </p>
              
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full py-4 rounded-full bg-gg-navy text-white font-semibold hover:bg-gold-400 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="px-6 md:px-12 lg:px-24 py-20 border-b border-gg-slate/10 bg-[#fff7ef]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-xs tracking-[0.5em] uppercase text-gg-taupe">Contact Us</p>
          <h1 className="font-serif text-4xl md:text-5xl text-gg-navy">We’d love to hear from you</h1>
          <div className="w-14 h-[2px] bg-gold-400 mx-auto" />
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-16 bg-[#fff7ef]">
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0.15}>
            <div className="w-full">
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 rounded-[32px] bg-white shadow-xl border border-gg-slate/10 p-8 md:p-10 w-full">
                
                <div className="w-full">
                  <label htmlFor="name" className="block text-[11px] font-semibold tracking-[0.4em] uppercase text-gg-taupe mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gg-slate/20 px-6 py-4 bg-white text-gg-slate placeholder:text-gg-slate/40 text-base focus:outline-none focus:ring-2 focus:ring-gold-400/40"
                    placeholder="Your name"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="email" className="block text-[11px] font-semibold tracking-[0.4em] uppercase text-gg-taupe mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gg-slate/20 px-6 py-4 bg-white text-gg-slate placeholder:text-gg-slate/40 text-base focus:outline-none focus:ring-2 focus:ring-gold-400/40"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="phone" className="block text-[11px] font-semibold tracking-[0.4em] uppercase text-gg-taupe mb-2">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gg-slate/20 px-6 py-4 bg-white text-gg-slate placeholder:text-gg-slate/40 text-base focus:outline-none focus:ring-2 focus:ring-gold-400/40"
                    placeholder="+1 212 555 0199"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="city" className="block text-[11px] font-semibold tracking-[0.4em] uppercase text-gg-taupe mb-2">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gg-slate/20 px-6 py-4 bg-white text-gg-slate placeholder:text-gg-slate/40 text-base focus:outline-none focus:ring-2 focus:ring-gold-400/40"
                    placeholder="Mumbai / Dubai / New York"
                  />
                </div>

                <div className="md:col-span-2 w-full">
                  <label htmlFor="guestCount" className="block text-[11px] font-semibold tracking-[0.4em] uppercase text-gg-taupe mb-2">
                    Guest Count
                  </label>
                  <input
                    id="guestCount"
                    name="guestCount"
                    type="text"
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gg-slate/20 px-6 py-4 bg-white text-gg-slate placeholder:text-gg-slate/40 text-base focus:outline-none focus:ring-2 focus:ring-gold-400/40"
                    placeholder="Approx. guests"
                  />
                </div>
                
                <div className="md:col-span-2 w-full">
                  <label htmlFor="message" className="block text-[11px] font-semibold tracking-[0.4em] uppercase text-gg-taupe mb-2">
                    Tell us about your event
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gg-slate/20 px-6 py-4 bg-white text-gg-slate placeholder:text-gg-slate/40 text-base focus:outline-none focus:ring-2 focus:ring-gold-400/40 resize-none"
                    placeholder="Date, style, cuisine preferences, venue, dietary needs..."
                  />
                </div>

                <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between pt-2">
                  <p className="text-sm text-gg-slate/70">We usually reply within one business day.</p>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={prefersReducedMotion || isSubmitting ? {} : { scale: 1.02 }}
                    whileTap={prefersReducedMotion || isSubmitting ? {} : { scale: 0.98 }}
                    className={`group inline-flex items-center justify-center gap-3 rounded-full bg-gg-navy text-white px-12 py-4 text-lg font-semibold transition-all hover:bg-gold-400 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
                  </motion.button>
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}

