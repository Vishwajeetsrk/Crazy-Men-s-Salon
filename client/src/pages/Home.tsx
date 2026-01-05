import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Scissors, ShieldCheck, Home as HomeIcon, Star } from "lucide-react";
import { useServices, useGallery } from "@/hooks/use-shop";
import { Navigation } from "@/components/Navigation";
import { ServiceCard } from "@/components/ServiceCard";
import { BookingForm } from "@/components/BookingForm";
import { FloatingActions } from "@/components/FloatingActions";

export default function Home() {
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: gallery, isLoading: galleryLoading } = useGallery();
  const [selectedService, setSelectedService] = useState<string>("");

  const scrollToBooking = (serviceName?: string) => {
    if (serviceName) setSelectedService(serviceName);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <Navigation />
      <FloatingActions />

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Unsplash: Barber shop interior dark moody */}
          <img 
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop" 
            alt="Barber Shop Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-black/60" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 border border-primary/50 rounded-full text-primary text-sm font-bold tracking-widest uppercase mb-6 bg-black/30 backdrop-blur-sm">
              Established 2024
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white mb-6 uppercase tracking-tight text-shadow">
              Style That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">Defines You</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
              Premium grooming services for the modern gentleman. Experience the art of traditional barbering with a contemporary twist.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              <button 
                onClick={() => scrollToBooking()}
                className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 min-w-[200px] clip-path-slant"
                style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)" }}
              >
                Book Appointment
              </button>
              <button 
                onClick={() => document.getElementById("visit")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 min-w-[200px]"
              >
                Visit Location
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section id="services" className="py-24 bg-background relative">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-2">Our Menu</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white uppercase">Services & Pricing</h3>
          </motion.div>

          {servicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-white/5 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services?.map((service, idx) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  index={idx} 
                  onSelect={scrollToBooking} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section id="about" className="py-24 bg-secondary relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-2">Why Choose Us</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-white uppercase mb-6">
                More Than Just <br /> A Haircut
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We believe that grooming is an essential part of a man's character. Our shop isn't just a place to get a haircut; it's a sanctuary where you can relax, unwind, and leave feeling your absolute best.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: Scissors, title: "Master Barbers", desc: "Expertly trained professionals with years of experience." },
                  { icon: Star, title: "Premium Products", desc: "We use only top-tier grooming products for your skin and hair." },
                  { icon: ShieldCheck, title: "Hygienic Tools", desc: "Sterilized equipment for every single client, guaranteed." },
                  { icon: HomeIcon, title: "Relaxing Vibe", desc: "A modern, comfortable atmosphere to unwind in." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                      <item.icon className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold uppercase mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 border-2 border-primary/30 rounded-2xl z-0 transform translate-x-4 translate-y-4"></div>
              {/* Unsplash: Barber cutting hair close up */}
              <img 
                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop" 
                alt="Barber at work" 
                className="relative z-10 w-full h-auto rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALLERY SECTION ================= */}
      <section id="gallery" className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-2">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white uppercase">Our Masterpieces</h3>
          </div>

          {galleryLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-64 bg-white/5 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {gallery?.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="break-inside-avoid relative group overflow-hidden rounded-xl"
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title || "Gallery image"} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <h4 className="text-white font-bold">{item.title}</h4>
                      <p className="text-primary text-sm">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Placeholder images if gallery is empty */}
              {(!gallery || gallery.length === 0) && (
                <>
                  {/* Unsplash: Stylish haircut man */}
                  <img src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&auto=format&fit=crop" className="w-full rounded-xl mb-4 grayscale hover:grayscale-0 transition-all duration-500" alt="Style 1" />
                  {/* Unsplash: Beard trim */}
                  <img src="https://images.unsplash.com/photo-1503951914875-452162b7f30a?w=800&auto=format&fit=crop" className="w-full rounded-xl mb-4 grayscale hover:grayscale-0 transition-all duration-500" alt="Style 2" />
                  {/* Unsplash: Barber tools */}
                  <img src="https://images.unsplash.com/photo-1599351431202-6e0005079746?w=800&auto=format&fit=crop" className="w-full rounded-xl mb-4 grayscale hover:grayscale-0 transition-all duration-500" alt="Style 3" />
                  {/* Unsplash: Man in barber chair */}
                  <img src="https://images.unsplash.com/photo-1532710093739-9470acff878f?w=800&auto=format&fit=crop" className="w-full rounded-xl mb-4 grayscale hover:grayscale-0 transition-all duration-500" alt="Style 4" />
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ================= BOOKING & VISIT SECTION ================= */}
      <section id="booking" className="py-24 bg-secondary relative">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Booking Form */}
            <div>
              <BookingForm selectedService={selectedService} />
            </div>

            {/* Location Info */}
            <div id="visit" className="space-y-8">
              <div>
                <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-2">Visit Us</h2>
                <h3 className="text-4xl font-display font-bold text-white uppercase mb-6">Our Location</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-primary w-6 h-6 mt-1" />
                    <div>
                      <h4 className="text-white font-bold mb-1">Blade & Fade Barbershop</h4>
                      <p className="text-gray-400">123 Grooming Street, Downtown District<br />City, State 560001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock className="text-primary w-6 h-6 mt-1" />
                    <div>
                      <h4 className="text-white font-bold mb-1">Opening Hours</h4>
                      <p className="text-gray-400">Mon - Sat: 9:00 AM - 9:00 PM<br />Sun: 10:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8093766779443!2d77.5912993!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
                
                <a 
                  href="https://maps.app.goo.gl/vPA2ETFNxgQXhRvh6" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="absolute bottom-4 right-4 bg-white text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <Scissors size={16} />
            </div>
            <span className="text-xl font-display font-bold tracking-widest text-white uppercase">
              Blade & <span className="text-primary">Fade</span>
            </span>
          </div>
          
          <div className="text-gray-500 text-sm">
            © 2024 Blade & Fade Barbershop. All rights reserved.
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
