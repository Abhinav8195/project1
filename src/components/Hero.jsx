import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock, Users, CheckCircle2 } from "lucide-react";
import DemoModal from "./DemoModal";
import { useNavigate } from "react-router-dom";

const appointments = [
  { time: "09:00 AM", patient: "Sarah Johnson", type: "Dental Checkup", status: "confirmed" },
  { time: "10:30 AM", patient: "Michael Chen", type: "Root Canal", status: "confirmed" },
  { time: "12:00 PM", patient: "Emily Davis", type: "Teeth Cleaning", status: "pending" },
  { time: "02:30 PM", patient: "Robert Wilson", type: "Consultation", status: "confirmed" },
];

const easeOut = [0.16, 1, 0.3, 1];

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export default function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />

      {/* ✅ overflow-x-hidden MUST */}
      <section className="relative overflow-x-hidden overflow-hidden pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-20 bg-[#F6F8FC]">
  

        {/* ✅ container = full width safe */}
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* ✅ LEFT */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="text-center lg:text-left w-full min-w-0"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-green-50 backdrop-blur border border-green-300 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#12a588] animate-pulse" />
                <span className="text-[12px] sm:text-sm font-medium text-slate-400">
                  Trusted by{" "}
                  <span className="font-bold text-slate-600">2,800+</span> clinics across India
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-5 sm:mt-6 text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#131720] leading-[1.08]"
              >
                Smart Appointment Booking for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#12a588] to-[#18c4a1]">
                  Doctors & Clinics
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-[14px] sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Let patients book online, avoid double-booking, and manage your day in minutes.
                The modern way to run your practice.
              </motion.p>

              {/* ✅ Buttons */}
              <motion.div
                variants={fadeUp}
                className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full"
              >
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={()=>navigate("/start-free-trial")}
                  className="
                    w-full sm:w-auto
                    inline-flex items-center justify-center rounded-2xl
                    px-7 sm:px-8 py-3.5 sm:py-4
                    text-[15px] sm:text-base font-semibold text-white
                    bg-gradient-to-r from-[#12a588] to-[#18c4a1]
                    shadow-[0_12px_30px_-14px_rgba(18,165,136,0.65)]
                    hover:shadow-[0_16px_45px_-18px_rgba(18,165,136,0.85)]
                    transition-all duration-200 cursor-pointer
                  "
                >
                  Start Free Trial
                </motion.button>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDemoOpen(true)}
                  className="
                    w-full sm:w-auto
                    inline-flex items-center justify-center gap-2 rounded-2xl
                    px-7 sm:px-8 py-3.5 sm:py-4
                    text-[15px] sm:text-base font-semibold
                    border border-[#12a588]/25 text-[#12a588]
                    bg-white/85 backdrop-blur
                    shadow-sm hover:shadow-md
                    transition-all duration-200
                    hover:bg-green-50
                  "
                >
                  <Play className="w-4 h-4" />
                  View Demo
                </motion.button>
              </motion.div>

              {/* ✅ Stats (mobile safe) */}
              <motion.div
                variants={fadeUp}
                className="mt-9 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0"
              >
                {[
                  { value: "50K+", label: "Appointments/Month" },
                  { value: "98%", label: "Satisfaction Rate" },
                  { value: "15min", label: "Setup Time" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl bg-white/75 border border-slate-200 px-4 py-4 shadow-sm"
                  >
                    <p className="text-[17px] sm:text-xl font-semibold tracking-tight text-[#131720]">
                      {s.value}
                    </p>
                    <p className="text-[11px] sm:text-xs font-medium text-slate-500 mt-1">
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ✅ RIGHT */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: easeOut, delay: 0.2 }}
              className="relative w-full min-w-0"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="
                  w-full
                  relative overflow-hidden rounded-3xl
                  border border-slate-200 bg-white/90 backdrop-blur-xl
                  shadow-[0_28px_70px_-44px_rgba(0,0,0,0.25)]
                "
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#12a588] to-[#18c4a1]" />

                <div className="relative p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4 sm:mb-5">
                    <div className="min-w-0">
                      <h3 className="text-[15px] sm:text-base font-extrabold text-[#131720] truncate">
                        Today’s Appointments
                      </h3>
                      <p className="text-[12px] sm:text-sm text-slate-500 mt-1">
                        Tuesday, Jan 28, 2025
                      </p>
                    </div>

                    {/* ✅ small chip */}
                    <div className="shrink-0 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                      <Users className="w-4 h-4 text-[#12a588]" />
                      <span className="text-[12px] sm:text-sm font-semibold text-slate-800">
                        {appointments.length}
                      </span>
                    </div>
                  </div>

                  {/* ✅ List */}
                  <div className="space-y-3">
                    {appointments.map((apt, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.18 + index * 0.07,
                          duration: 0.5,
                          ease: easeOut,
                        }}
                        whileHover={{ y: -1, scale: 1.01 }}
                        className="
                          w-full
                          flex items-center gap-3
                          p-3 sm:p-4 rounded-2xl
                          border border-slate-200 bg-white/65
                          hover:bg-white hover:border-[#12a588]/25
                          hover:shadow-[0_18px_35px_-26px_rgba(0,0,0,0.45)]
                          transition-all duration-300
                          min-w-0
                        "
                      >
                        <div className="shrink-0 w-9 h-9 rounded-xl bg-[#12a588]/10 flex items-center justify-center">
                          <Clock className="w-4 h-4 text-[#12a588]" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[13px] sm:text-sm font-bold text-[#131720] truncate">
                              {apt.patient}
                            </p>
                            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap">
                              {apt.time}
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-2 mt-0.5">
                            <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                              {apt.type}
                            </p>

                            <span
                              className={`
                                inline-flex items-center gap-1
                                px-2 py-0.5 rounded-full text-[11px] font-bold
                                whitespace-nowrap
                                ${
                                  apt.status === "confirmed"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }
                              `}
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              {apt.status}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom Action */}
                  <div className="mt-5 pt-4 border-t border-slate-200">
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="
                        w-full inline-flex items-center justify-center
                        rounded-2xl px-4 py-3 text-sm font-semibold
                        text-[#12a588] bg-[#12a588]/10
                        hover:bg-gradient-to-r hover:from-[#12a588] hover:to-[#18c4a1]
                        hover:text-white
                        transition-all duration-250
                      "
                    >
                      View Full Schedule →
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* glow */}
              <motion.div
                className="absolute -top-6 -right-4 w-16 h-16 rounded-full bg-[#12a588]/20 blur-2xl"
                animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.75, 0.35] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
