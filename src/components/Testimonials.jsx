import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Mitchell",
    role: "General Dentist",
    clinic: "Smile Dental Clinic",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Reserva has completely transformed how we manage appointments. Our no-show rate dropped by 70% thanks to the WhatsApp reminders. Patients love the easy booking experience.",
  },
  {
    name: "Dr. James Rodriguez",
    role: "Family Physician",
    clinic: "HealthFirst Medical",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "The setup was incredibly easy. Within 15 minutes, I had my booking page live. My staff spends 80% less time on phone calls now. Best investment for our practice.",
  },
  {
    name: "Dr. Emily Chen",
    role: "Orthodontist",
    clinic: "Perfect Smile Orthodontics",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Managing multiple doctors' schedules used to be a nightmare. Reserva's team calendar view gives us complete visibility. Our efficiency has improved dramatically.",
  },
];

const easeOut = [0.16, 1, 0.3, 1];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardAnim = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-14 sm:py-20 bg-[#F6F8FC] overflow-hidden"
    >
      {/* ✅ Premium background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[#12a588]/12 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-[#18c4a1]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* ✅ Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center justify-center rounded-full px-4 py-2 text-[11px] sm:text-xs font-semibold tracking-widest uppercase bg-white border border-slate-200 text-[#12a588] shadow-sm">
            Testimonials
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#131720]">
            Loved by healthcare professionals
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
            See what doctors and clinic owners are saying about Reserva.
          </p>
        </motion.div>

        {/* ✅ Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid md:grid-cols-3 gap-6 sm:gap-8"
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              variants={cardAnim}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="
                relative rounded-3xl border border-slate-200
                bg-white/80 backdrop-blur-xl
                p-6 sm:p-8
                shadow-[0_20px_60px_-45px_rgba(0,0,0,0.25)]
                hover:shadow-[0_30px_90px_-55px_rgba(0,0,0,0.35)]
                transition-all duration-300
                overflow-hidden
                will-change-transform transform-gpu
              "
              style={{ translateZ: 0 }}
            >
              {/* ✅ top strip */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#12a588] to-[#18c4a1]" />

              {/* ✅ big quote icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#12a588]/10" />

              {/* ✅ glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#12a588]/10 blur-3xl" />

              {/* ✅ Stars */}
              <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* ✅ Text */}
              <p className="text-sm sm:text-[15px] leading-relaxed text-gray-600 mb-6 relative z-10">
                “{t.text}”
              </p>

              {/* ✅ Author */}
              <div className="flex items-center gap-4 relative z-10">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-sm"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[#131720] truncate">
                    {t.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">{t.role}</p>
                  <p className="text-xs font-semibold text-[#12a588] truncate">
                    {t.clinic}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
