import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const easeOut = [0.16, 1, 0.3, 1];

export default function CTA() {
  return (
    <section className="py-14 sm:py-20 bg-[#F6F8FC] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="
            relative overflow-hidden rounded-3xl
            bg-gradient-to-r from-[#12a588] to-[#18c4a1]
            px-6 py-12 sm:px-10 sm:py-16
            text-center
            shadow-[0_40px_90px_-55px_rgba(18,165,136,0.8)]
          "
        >
          {/* ✅ Background Blobs */}
          <motion.div
            aria-hidden
            className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/12 blur-3xl"
            animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.7, 0.45] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            aria-hidden
            className="absolute -bottom-28 -right-28 w-[420px] h-[420px] rounded-full bg-white/8 blur-3xl"
            animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ✅ Content */}
          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white text-sm font-semibold border border-white/20 shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              No credit card required
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: easeOut, delay: 0.05 }}
              className="
                mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                font-extrabold tracking-tight text-white
                max-w-3xl mx-auto leading-[1.1]
              "
            >
              Start accepting appointments in{" "}
              <span className="text-white/95">10 minutes</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: easeOut, delay: 0.1 }}
              className="mt-4 text-sm sm:text-base md:text-lg text-white/85 max-w-xl mx-auto leading-relaxed"
            >
              Join{" "}
              <span className="font-bold text-white">2,000+</span> healthcare
              professionals who trust Reserva to manage appointments efficiently.
            </motion.p>

            {/* ✅ Custom Button */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: easeOut, delay: 0.16 }}
              className="mt-8 flex justify-center"
            >
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-2xl px-8 py-4
                  text-sm sm:text-base font-semibold
                  bg-white text-[#12a588]
                  shadow-[0_18px_45px_-28px_rgba(0,0,0,0.45)]
                  hover:shadow-[0_22px_60px_-30px_rgba(0,0,0,0.55)]
                  transition-all duration-200
                  active:scale-[0.98]
                  cursor-pointer
                  group
                  will-change-transform transform-gpu
                "
                style={{ translateZ: 0 }}
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
