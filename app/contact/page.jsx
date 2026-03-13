"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Cake, Truck, Utensils, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
const faqs = [
  {
    question: "Where do you source your luxury fragrances from?",
    answer:
      "We source our fragrances from renowned perfume houses and manufacturers around the world, including France, UAE, UK, and Saudi Arabia. We prioritize quality and authenticity to bring you the finest perfumes.",
  },
  {
    question: "Are your fragrances authentic and original?",
    answer:
      "Absolutely. Every fragrance in our collection is 100% authentic and original. We have zero tolerance for counterfeit products and verify every item before adding it to our collection.",
  },
  {
    question: "Do you offer fragrances for both men and women?",
    answer:
      "Yes, we curate a wide range of fragrances including For Her, For Him, Unisex, and Oud collections to suit every preference and personality.",
  },
  {
    question: "Can I find limited edition or exclusive fragrances at your store?",
    answer:
      "Absolutely! We frequently feature limited edition and exclusive fragrances not available elsewhere, including niche perfumes and collector editions.",
  },
  {
    question: "How do you ensure the quality of your fragrances?",
    answer:
      "All our fragrances are stored properly under strict conditions, and our inventory is regularly checked to ensure optimal quality and authenticity.",
  },
  {
    question: "Do you offer gift packaging for special occasions?",
    answer:
      "Yes, we offer beautiful gift packaging and customized gift sets for birthdays, weddings, and corporate events. Let us help you create the perfect fragrance gift.",
  },
  {
    question: "Can I request specific perfume brands or fragrances?",
    answer:
      "Certainly! We welcome requests for specific brands or fragrances. Contact us and we will do our best to source them for you.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy on unopened products. If you receive a damaged or incorrect item, please contact us immediately and we will resolve it promptly.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "We offer express delivery across Pakistan, typically within 2-3 business days. Same-day delivery is available in Islamabad and Rawalpindi.",
  },
];
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "general",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a]">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden bg-[#0a0a0a]">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=2000&q=80"
              alt="Luxury Perfume"
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#0a0a0a]/80" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-2xl">
              <span
                className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-4 block"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Get In Touch
              </span>
              <h1
                className="text-5xl md:text-7xl font-bold text-[#fafafa] mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Contact <span className="text-[#d4af37] italic">Us</span>
              </h1>
              <p
                className="text-lg text-[#a1a1a1] max-w-xl leading-relaxed mb-8"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Have questions about our fragrances, want to place a special order, or just want to connect? We are here to help.
              </p>
              <Link href="/products">
                <span
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    backgroundColor: "#d4af37",
                    color: "#0a0a0a",
                  }}
                >
                  Explore Collection
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Content Section */}
        <section className="py-20 bg-[#0d0d0d]">
          <div className="container">
            <div className="grid gap-10 md:grid-cols-3">
              {/* Contact Info Column */}
              <div className="md:col-span-1 space-y-6">
                <div>
                  <span
                    className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-3 block"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Reach Us
                  </span>
                  <h2
                    className="text-3xl font-bold text-[#fafafa] mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Let's <span className="text-[#d4af37] italic">Connect</span>
                  </h2>
                </div>

                  {[
                    {
                      icon: Mail,
                      title: "Email Us",
                      subtitle: "We respond within 24 hours",
                      content: <a href="mailto:thechocolatesfactory@icloud.com" className="mt-1 block text-[#d4af37] text-sm hover:underline" style={{ fontFamily: "'Montserrat', sans-serif" }}>thechocolatesfactory@icloud.com</a>,
                    },
                    {
                      icon: Phone,
                      title: "Call Us",
                      subtitle: "Mon-Sat, 8am to 10pm",
                      content: <a href="tel:+923165658165" className="mt-1 block text-[#d4af37] text-sm hover:underline" style={{ fontFamily: "'Montserrat', sans-serif" }}>+92 316 565 8165</a>,
                    },
                    {
                      icon: MapPin,
                      title: "Visit Us",
                      subtitle: "Our flagship location",
                      content: (
                        <address className="mt-1 not-italic text-[#a1a1a1] text-sm leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          Plaza no. 181, Shop no. 9<br />
                          Lower Ground, Civic Center<br />
                          Bahria Town, Phase 4<br />
                          Islamabad
                        </address>
                      ),
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-5 bg-[#111111] border border-[#262626] transition-all duration-300 hover:border-[#d4af37]/30" style={{ borderRadius: "8px" }}>
                      <div className="w-10 h-10 flex items-center justify-center bg-[#d4af37]/10 border border-[#d4af37]/20 flex-shrink-0" style={{ borderRadius: "50%" }}>
                        <item.icon className="h-4 w-4 text-[#d4af37]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#fafafa] text-sm mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h3>
                        <p className="text-xs text-[#a1a1a1] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.subtitle}</p>
                        {item.content}
                      </div>
                    </div>
                  ))}

                  <div className="pt-2">
                    <h3 className="font-semibold text-[#fafafa] text-sm mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Follow Us</h3>
                    <div className="flex gap-3">
                      {[
                        { icon: "facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                        { icon: "instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01" },
                        { icon: "twitter", path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
                      ].map((social, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="w-9 h-9 flex items-center justify-center bg-[#111111] border border-[#262626] text-[#a1a1a1] hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-300"
                          style={{ borderRadius: "4px" }}
                          aria-label={`Follow on ${social.icon}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {social.icon === "instagram" ? (
                              <>
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d={social.path}></path>
                              </>
                            ) : (
                              <path d={social.path}></path>
                            )}
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
              </div>

              {/* Form Column */}
              <div className="md:col-span-2">
                <div className="bg-[#111111] border border-[#262626] p-8 transition-all duration-300 hover:border-[#d4af37]/20" style={{ borderRadius: "8px" }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-[#d4af37]/10 border border-[#d4af37]/20" style={{ borderRadius: "50%" }}>
                      <MessageSquare className="h-5 w-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>Send Us a Message</h2>
                      <p className="text-[#a1a1a1] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>We are here to help with any fragrance inquiries!</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-1">
                        <Label htmlFor="name" className="text-[#fafafa] text-xs font-semibold tracking-wide uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-[#0a0a0a] border-[#262626] text-[#fafafa] placeholder-[#a1a1a1] focus:border-[#d4af37] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          style={{ fontFamily: "'Montserrat', sans-serif", borderRadius: "4px" }}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-[#fafafa] text-xs font-semibold tracking-wide uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-[#0a0a0a] border-[#262626] text-[#fafafa] placeholder-[#a1a1a1] focus:border-[#d4af37] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          style={{ fontFamily: "'Montserrat', sans-serif", borderRadius: "4px" }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="phone" className="text-[#fafafa] text-xs font-semibold tracking-wide uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Phone (Optional)</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+92 123 456 7890"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-[#0a0a0a] border-[#262626] text-[#fafafa] placeholder-[#a1a1a1] focus:border-[#d4af37] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        style={{ fontFamily: "'Montserrat', sans-serif", borderRadius: "4px" }}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="message" className="text-[#fafafa] text-xs font-semibold tracking-wide uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Your Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="How can we help you?"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="bg-[#0a0a0a] border-[#262626] text-[#fafafa] placeholder-[#a1a1a1] focus:border-[#d4af37] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                        style={{ fontFamily: "'Montserrat', sans-serif", borderRadius: "4px" }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        backgroundColor: "#d4af37",
                        color: "#0a0a0a",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                    >
                      {isSubmitting ? "Sending..." : (
                        <>Send Message <Send className="h-4 w-4" /></>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-[#0a0a0a]">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span
                className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-3 block"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Find Us
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#fafafa]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Visit <span className="text-[#d4af37] italic">Aslam Baig Fragrance</span>
              </h2>
              <div className="mt-4 h-px w-16 bg-[#d4af37] mx-auto" />
            </div>

            <div className="relative overflow-hidden border border-[#262626]" style={{ borderRadius: "8px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6649.262647492115!2d73.04488097256163!3d33.72599623077015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbffcd5f3ba2d%3A0xe8bba1398a19a04c!2sF-7%20Markaz%20F-7%2C%20Islamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) brightness(0.8)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Aslam Baig Fragrance Location"
              />
            </div>
          </div>
        </section>

        {/* FAQs */}
        <div className="py-20 bg-[#0d0d0d]">
          <div className="container">
            <div className="text-center mb-12">
              <span
                className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-3 block"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                FAQ
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#fafafa]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Frequently Asked <span className="text-[#d4af37] italic">Questions</span>
              </h2>
              <div className="mt-4 h-px w-16 bg-[#d4af37] mx-auto" />
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#111111] border border-[#262626] overflow-hidden transition-all duration-300 hover:border-[#d4af37]/30" style={{ borderRadius: "8px" }}>
                  <button
                    onClick={() => toggle(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 hover:bg-[#1a1a1a] transition-all duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <span className="text-sm font-medium text-[#fafafa]">{faq.question}</span>
                    <span className="text-[#d4af37] text-xl font-light flex-shrink-0">
                      {activeIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  {activeIndex === index && (
                    <div className="px-6 pb-4 text-[#a1a1a1] text-sm leading-relaxed border-t border-[#262626] pt-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>



   


        {/* CTA Section */}
        <section className="py-16 bg-[#111111] border-t border-[#262626]">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2
                className="text-3xl font-bold text-[#fafafa] mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Stay in the <span className="text-[#d4af37] italic">Fragrance Loop</span>
              </h2>
              <p
                className="text-[#a1a1a1] text-sm mb-8"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Subscribe to receive exclusive offers, new arrivals, and fragrance tips from Aslam Baig Fragrance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 text-sm bg-[#0a0a0a] border border-[#262626] text-[#fafafa] placeholder-[#a1a1a1] focus:outline-none focus:border-[#d4af37] transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif", borderRadius: "4px" }}
                />
                <button
                  className="px-6 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105 whitespace-nowrap"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    backgroundColor: "#d4af37",
                    color: "#0a0a0a",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}