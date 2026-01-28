import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const easeOut = [0.16, 1, 0.3, 1];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#131720] text-white">
      {/* ✅ Soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-[#12a588]/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-[#18c4a1]/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(18,165,136,0.12),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* ✅ Top Section */}
        <div className="py-14 sm:py-16 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="grid gap-10 md:grid-cols-2"
          >
            {/* Left */}
            <div>
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-2xl bg-gradient-to-r from-[#12a588] to-[#18c4a1] flex items-center justify-center shadow-[0_18px_45px_-22px_rgba(18,165,136,0.9)]"
                >
                  <Calendar className="w-5 h-5 text-white" />
                </motion.div>

                <p className="text-xl font-extrabold tracking-tight">
                  Reserva
                </p>
              </div>

              <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed max-w-md">
                Modern appointment booking for doctors & clinics.  
                Reduce no-shows, save time and manage schedules effortlessly.
              </p>

              {/* ✅ Mini badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                {["Secure", "Fast Setup", "WhatsApp Alerts"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
                    bg-white/5 border border-white/10 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <p className="text-sm font-bold text-white">Product</p>
                <div className="mt-4 space-y-3">
                  {["Features", "How it Works", "Pricing"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block text-sm text-white/65 hover:text-[#12a588] transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-white">Support</p>
                <div className="mt-4 space-y-3">
                  {["FAQ", "Help Center", "Contact"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block text-sm text-white/65 hover:text-[#12a588] transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="text-sm font-bold text-white">Newsletter</p>
                <p className="mt-4 text-sm text-white/65 leading-relaxed">
                  Get product updates and tips for clinic growth.
                </p>

                {/* ✅ Smooth Input + Button */}
                <div className="mt-4 flex items-center gap-2">
                  <input
                    placeholder="your@email.com"
                    className="
                      w-full rounded-2xl px-4 py-3 text-sm
                      bg-white/5 border border-white/10
                      text-white placeholder:text-white/40
                      outline-none
                      focus:ring-4 focus:ring-[#12a588]/20 focus:border-[#12a588]/50
                      transition
                    "
                  />

                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      rounded-2xl px-4 py-3 text-sm font-semibold text-white
                      bg-gradient-to-r from-[#12a588] to-[#18c4a1]
                      shadow-[0_18px_45px_-22px_rgba(18,165,136,0.9)]
                      hover:opacity-95 transition-all
                      whitespace-nowrap
                    "
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ✅ Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="py-6 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <p className="text-xs sm:text-sm text-white/55">
            © {new Date().getFullYear()} Reserva. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs sm:text-sm text-white/55">
            <a href="#" className="hover:text-[#12a588] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#12a588] transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-[#12a588] transition-colors">
              Security
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
