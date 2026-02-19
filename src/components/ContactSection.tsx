import { Section, FadeIn } from './ui/Section';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight, CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    guest_count: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Split name into first and last name
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const payload = {
        ...formData,
        // Snake case
        full_name: formData.name,
        first_name: firstName,
        last_name: lastName,
        // Camel case
        fullName: formData.name,
        firstName: firstName,
        lastName: lastName,
        // Lowercase
        fullname: formData.name,
        firstname: firstName,
        lastname: lastName,
      };

      console.log('Submitting form:', payload);
      const response = await fetch('https://feed.ohmylead.com/api/webhook/9fa8e014-82c7-4f9c-a5e9-97ad8666581c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      // Accept any 2xx status as success
      if (response.status >= 200 && response.status < 300) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', city: '', guest_count: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Section id="contact" dark className="relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-gg-navy/30 blur-[140px] rounded-full" />
        <div className="absolute -bottom-36 -right-40 w-[700px] h-[700px] bg-gold-400/15 blur-[150px] rounded-full" />
      </div>

      <div className="relative grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
        <div className="lg:col-span-5">
          <FadeIn>
            <span className="text-gold-400 font-medium tracking-widest uppercase text-sm mb-3 block">Invitation</span>
            <h2 className="font-serif text-4xl md:text-6xl text-gg-cream leading-tight mb-6">
              Let’s create something <span className="italic text-gold-400">unforgettable</span>
            </h2>
            <p className="text-gg-taupe text-lg leading-relaxed mb-10">
              Share your date, city, guest count, and the feeling you want. We’ll respond with a tailored approach and next steps.
            </p>

            <div className="space-y-4 text-gg-cream/90">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <div className="text-xs tracking-[0.22em] uppercase text-gg-taupe">Email</div>
                  <div className="font-medium">experience@globalgourmet.asia</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <div className="text-xs tracking-[0.22em] uppercase text-gg-taupe">Phone</div>
                  <div className="font-medium">+66 95-706-3377</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <div className="text-xs tracking-[0.22em] uppercase text-gg-taupe">Availability</div>
                  <div className="font-medium">Thailand • Vietnam • Dubai </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-7">
          <FadeIn delay={0.15}>
            <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-2xl">
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold tracking-[0.22em] uppercase text-gg-taupe mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-gg-cream placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold tracking-[0.22em] uppercase text-gg-taupe mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-gg-cream placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
                    placeholder="+66 XX XXX XXXX"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold tracking-[0.22em] uppercase text-gg-taupe mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-gg-cream placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold tracking-[0.22em] uppercase text-gg-taupe mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-gg-cream placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
                    placeholder="Mumbai / Dubai / New York"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold tracking-[0.22em] uppercase text-gg-taupe mb-2">Guest Count</label>
                  <input
                    type="text"
                    name="guest_count"
                    value={formData.guest_count}
                    onChange={(e) => handleChange('guest_count', e.target.value)}
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-gg-cream placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
                    placeholder="Approx. guests"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold tracking-[0.22em] uppercase text-gg-taupe mb-2">Tell us about your event</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className="w-full min-h-[120px] rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-gg-cream placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
                    placeholder="Date, style, cuisine preferences, venue, dietary needs..."
                    required
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="md:col-span-2 rounded-2xl bg-green-500/10 border border-green-500/30 p-5 flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-gg-cream font-semibold mb-1">Thank You!</h4>
                      <p className="text-gg-taupe text-sm">We have received your inquiry and will get back to you within 24–48 hours with a personalized proposal.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="md:col-span-2 rounded-2xl bg-red-500/10 border border-red-500/30 p-5">
                    <p className="text-red-300 text-sm">Something went wrong. Please try again or email us directly at <span className="underline">experience@globalgourmet.asia</span></p>
                  </div>
                )}

                <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between pt-2">
                  <p className="text-sm text-gg-taupe/80">
                    We typically respond within 24–48 hours.
                  </p>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={prefersReducedMotion ? {} : { scale: isSubmitting ? 1 : 1.03 }}
                    whileTap={prefersReducedMotion ? {} : { scale: isSubmitting ? 1 : 0.98 }}
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-gg-cream text-gg-navy px-7 py-4 font-semibold transition-all hover:bg-gold-400 hover:text-white disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Request a Proposal
                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
