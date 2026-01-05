import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { useCreateBooking } from "@/hooks/use-shop";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Calendar, User, Phone as PhoneIcon, Scissors } from "lucide-react";
import { motion } from "framer-motion";

interface BookingFormProps {
  selectedService?: string;
}

export function BookingForm({ selectedService }: BookingFormProps) {
  const { toast } = useToast();
  const createBooking = useCreateBooking();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      serviceName: selectedService || "",
    },
  });

  // Update form if selectedService prop changes
  if (selectedService && form.getValues("serviceName") !== selectedService) {
    form.setValue("serviceName", selectedService);
  }

  const onSubmit = async (data: InsertBooking) => {
    try {
      await createBooking.mutateAsync(data);
      setIsSubmitted(true);
      toast({
        title: "Booking Request Received",
        description: "Redirecting you to WhatsApp to confirm your slot...",
      });

      // Redirect to WhatsApp
      const message = `Hello, I would like to book an appointment.\n\nName: ${data.name}\nService: ${data.serviceName}\nPhone: ${data.phone}`;
      const whatsappUrl = `https://wa.me/918310622250?text=${encodeURIComponent(message)}`;
      
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      <h3 className="text-3xl font-display font-bold text-white mb-2">Book Appointment</h3>
      <p className="text-gray-400 mb-8">Secure your spot with our master barbers.</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <User size={14} className="text-primary" /> Full Name
          </label>
          <input
            {...form.register("name")}
            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            placeholder="John Doe"
          />
          {form.formState.errors.name && (
            <span className="text-xs text-red-500">{form.formState.errors.name.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <PhoneIcon size={14} className="text-primary" /> Phone Number
          </label>
          <input
            {...form.register("phone")}
            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            placeholder="+91 98765 43210"
          />
          {form.formState.errors.phone && (
            <span className="text-xs text-red-500">{form.formState.errors.phone.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Scissors size={14} className="text-primary" /> Service
          </label>
          <input
            {...form.register("serviceName")}
            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            placeholder="e.g. Haircut & Beard Trim"
          />
          {form.formState.errors.serviceName && (
            <span className="text-xs text-red-500">{form.formState.errors.serviceName.message}</span>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={createBooking.isPending || isSubmitted}
          className="w-full bg-primary hover:bg-red-600 text-white font-bold py-4 rounded-lg uppercase tracking-wider shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
        >
          {createBooking.isPending ? (
            <>
              <Loader2 className="animate-spin" /> Processing...
            </>
          ) : isSubmitted ? (
            "Opening WhatsApp..."
          ) : (
            <>
              <Calendar size={18} /> Confirm Booking
            </>
          )}
        </motion.button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          By booking, you agree to our terms. We'll confirm your slot via WhatsApp.
        </p>
      </form>
    </div>
  );
}
