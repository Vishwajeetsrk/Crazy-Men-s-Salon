import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Scissors } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#services", label: "Services" },
    { href: "#gallery", label: "Gallery" },
    { href: "#about", label: "Why Us" },
    { href: "#visit", label: "Visit" },
  ];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-colors duration-300">
            <Scissors size={20} />
          </div>
          <span className="text-2xl font-display font-bold tracking-widest text-white uppercase group-hover:text-primary transition-colors">
            Blade & <span className="text-primary group-hover:text-white">Fade</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => handleScrollTo(link.href)}
              className="text-sm font-medium uppercase tracking-widest text-gray-300 hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:-bottom-1 hover:after:w-full after:transition-all duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleScrollTo("#booking")}
            className="px-6 py-2 bg-primary text-white text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-primary transition-all duration-300 clip-path-slant"
            style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)" }}
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center space-y-8"
          >
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => handleScrollTo(link.href)}
                className="text-2xl font-display font-bold uppercase tracking-widest text-white hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleScrollTo("#booking")}
              className="mt-8 px-8 py-3 bg-primary text-white text-xl font-bold uppercase tracking-wider"
            >
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
