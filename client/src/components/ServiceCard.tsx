import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
  index: number;
  onSelect: (serviceName: string) => void;
}

export function ServiceCard({ service, index, onSelect }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
      
      <div className="relative h-full glass-card p-6 md:p-8 rounded-xl flex flex-col items-start border border-white/5 hover:border-primary/50 transition-colors duration-300">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
          <Check className="w-6 h-6 text-primary group-hover:text-white" />
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{service.name}</h3>
        <p className="text-gray-400 text-sm mb-6 flex-grow">{service.description}</p>
        
        <div className="w-full flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
          <span className="text-2xl font-display font-bold text-primary">₹{service.price}</span>
          <button 
            onClick={() => onSelect(service.name)}
            className="text-xs uppercase tracking-widest font-bold text-white hover:text-primary transition-colors"
          >
            Select Service &rarr;
          </button>
        </div>
      </div>
    </motion.div>
  );
}
