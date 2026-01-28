import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const doctors = [
  { id: 1, name: "Dr. Sarah Mitchell", specialty: "General Dentist", avatar: "SM" },
  { id: 2, name: "Dr. James Rodriguez", specialty: "Orthodontist", avatar: "JR" },
];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "02:00 PM", "02:30 PM", "03:00 PM",
];

const dates = [
  { day: "Mon", date: "27", available: true },
  { day: "Tue", date: "28", available: true },
  { day: "Wed", date: "29", available: false },
  { day: "Thu", date: "30", available: true },
  { day: "Fri", date: "31", available: true },
];

export default function DemoModal({ open, onOpenChange }) {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();

  const resetDemo = () => {
    setStep(1);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const closeModal = () => {
    resetDemo();
    onOpenChange(false);
   navigate("/start-free-trial")
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedDoctor !== null;
      case 2:
        return selectedDate !== null;
      case 3:
        return selectedTime !== null;
      default:
        return false;
    }
  };

  // ✅ ESC close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const stepVariants = {
    hidden: { opacity: 0, x: 18 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, x: -18, transition: { duration: 0.18 } },
  };

  const btnBase =
    "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* ✅ Overlay */}
          <motion.button
            aria-label="Close modal"
            className="absolute inset-0 bg-black/40"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* ✅ Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_90px_-35px_rgba(0,0,0,0.35)]"
          >
            {/* ✅ Header */}
            <div className="px-6 pt-6 pb-4 bg-gradient-to-r from-[#12a588] to-[#18c4a1]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Stethoscope className="w-5 h-5" />
                    Book an Appointment - Demo
                  </div>
                  <p className="text-white/80 text-sm mt-1">
                    Experience how patients book with Reserva
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="p-2 rounded-xl bg-white/15 hover:bg-white/25 transition"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* ✅ Progress */}
            <div className="px-6 pt-5">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        step >= s
                          ? "bg-[#12a588] text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                    </div>

                    {s < 4 && (
                      <div
                        className={`w-12 sm:w-16 h-1 mx-1 rounded transition-colors ${
                          step > s ? "bg-[#12a588]" : "bg-slate-100"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-xs text-slate-500">
                <span>Doctor</span>
                <span>Date</span>
                <span>Time</span>
                <span>Confirm</span>
              </div>
            </div>

            {/* ✅ Body */}
            <div className="px-6 py-6 min-h-[280px]">
              <AnimatePresence mode="wait">
                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#12a588]" />
                      Select a Doctor
                    </h3>

                    <div className="space-y-3">
                      {doctors.map((doctor) => (
                        <button
                          key={doctor.id}
                          onClick={() => setSelectedDoctor(doctor.id)}
                          className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 text-left ${
                            selectedDoctor === doctor.id
                              ? "border-[#12a588] bg-[#12a588]/5"
                              : "border-slate-200 hover:border-[#12a588]/50"
                          }`}
                        >
                          <div className="w-12 h-12 rounded-2xl bg-[#12a588]/10 flex items-center justify-center text-[#12a588] font-extrabold">
                            {doctor.avatar}
                          </div>

                          <div className="flex-1">
                            <p className="font-semibold text-slate-900">
                              {doctor.name}
                            </p>
                            <p className="text-sm text-slate-500">
                              {doctor.specialty}
                            </p>
                          </div>

                          {selectedDoctor === doctor.id && (
                            <CheckCircle2 className="w-5 h-5 text-[#12a588]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#12a588]" />
                      Select a Date
                    </h3>

                    <p className="text-sm text-slate-500 mb-4">January 2025</p>

                    <div className="flex gap-2 justify-between">
                      {dates.map((d) => (
                        <button
                          key={d.date}
                          onClick={() => d.available && setSelectedDate(d.date)}
                          disabled={!d.available}
                          className={`flex-1 p-3 rounded-2xl border-2 transition-all text-center ${
                            !d.available
                              ? "border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed"
                              : selectedDate === d.date
                              ? "border-[#12a588] bg-[#12a588]/5"
                              : "border-slate-200 hover:border-[#12a588]/50"
                          }`}
                        >
                          <p className="text-xs text-slate-500">{d.day}</p>
                          <p
                            className={`text-lg font-extrabold ${
                              selectedDate === d.date
                                ? "text-[#12a588]"
                                : "text-slate-900"
                            }`}
                          >
                            {d.date}
                          </p>
                        </button>
                      ))}
                    </div>

                    {selectedDate && (
                      <p className="text-sm text-[#12a588] mt-4 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        January {selectedDate}, 2025 selected
                      </p>
                    )}
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#12a588]" />
                      Select a Time Slot
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                            selectedTime === time
                              ? "border-[#12a588] bg-gradient-to-r from-[#12a588] to-[#18c4a1] text-white"
                              : "border-slate-200 hover:border-[#12a588]/50"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>

                    {selectedTime && (
                      <p className="text-sm text-[#12a588] mt-4 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        {selectedTime} selected
                      </p>
                    )}
                  </motion.div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 16 }}
                      className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </motion.div>

                    <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                      Booking Confirmed!
                    </h3>
                    <p className="text-slate-500 mb-6">
                      This is how easy it is for patients to book.
                    </p>

                    <div className="bg-slate-50 rounded-2xl p-4 text-left space-y-2 border border-slate-200">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-[#12a588]" />
                        <span className="text-slate-500">Doctor:</span>
                        <span className="font-semibold text-slate-900">
                          {doctors.find((d) => d.id === selectedDoctor)?.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-[#12a588]" />
                        <span className="text-slate-500">Date:</span>
                        <span className="font-semibold text-slate-900">
                          January {selectedDate}, 2025
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-[#12a588]" />
                        <span className="text-slate-500">Time:</span>
                        <span className="font-semibold text-slate-900">
                          {selectedTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-[#12a588]" />
                        <span className="text-slate-500">Reminder:</span>
                        <span className="font-semibold text-slate-900">
                          WhatsApp + Email
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ✅ Footer Buttons */}
            <div className="px-6 pb-6 flex justify-between gap-3">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className={`${btnBase} border border-slate-200 bg-white text-slate-700 hover:bg-slate-50`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </button>

              {step < 4 ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={`${btnBase} text-white bg-gradient-to-r from-[#12a588] to-[#18c4a1] hover:opacity-95 shadow-md hover:shadow-lg`}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              ) : (
                <button
                  onClick={closeModal}
                  className={`${btnBase} text-white bg-gradient-to-r from-[#12a588] to-[#18c4a1] hover:opacity-95 shadow-md hover:shadow-lg`}
                >
                  Start Free Trial
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
