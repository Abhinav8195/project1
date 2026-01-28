import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  User2,
  Phone,
  CheckCircle2,
  Loader2,
  MapPin,
  Stethoscope,
  ShieldCheck,
  ChevronRight,
  Mail,
  AlertCircle,
} from "lucide-react";

const API = "http://localhost:4000/api/public";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
};

export default function PublicBookingPage() {
  const { slug } = useParams();

  const [doctor, setDoctor] = useState(null);

  // ✅ Default Today date
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [closedInfo, setClosedInfo] = useState({
  closed: false,
  message: "",
});


  // ✅ Email added
  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    email: "",
  });

  const [loadingDoctor, setLoadingDoctor] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // ✅ Pending confirmation UI
  const [pendingMsg, setPendingMsg] = useState(false);

  // ✅ Disable past dates
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const availableSlots = useMemo(() => {
    return slots.filter((s) => !bookedSlots.includes(s));
  }, [slots, bookedSlots]);

  // ✅ validations
  const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone.trim());
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const canConfirm =
    !!selectedSlot &&
    !!form.patientName.trim() &&
    !!form.phone.trim() &&
    !!form.email.trim() &&
    isValidPhone(form.phone) &&
    isValidEmail(form.email) &&
    !bookingLoading;

  // ✅ Fetch Doctor
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoadingDoctor(true);
        const res = await axios.get(`${API}/${slug}`);
        setDoctor(res.data.doctor);
      } catch (e) {
        console.error("Doctor not found!");
      } finally {
        setLoadingDoctor(false);
      }
    };
    fetchDoctor();
  }, [slug]);

  // ✅ Fetch Slots
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoadingSlots(true);
        const res = await axios.get(`${API}/${slug}/slots?date=${date}`);

          setSlots(res.data.slots || []);
          setBookedSlots(res.data.bookedSlots || []);
          setSelectedSlot("");

          // ✅ weekly off / closed day handling
          setClosedInfo({
            closed: Boolean(res.data.closed),
            message: res.data.message || "",
          });

      } catch (e) {
        console.error("Slots not available!");
        setSlots([]);
        setBookedSlots([]);
        setSelectedSlot("");
        setClosedInfo({ closed: true, message: "Slots not available" });

      } finally {
        setLoadingSlots(false);
      }
    };

    // ✅ extra guard (if somehow date < today)
    if (date < todayStr) {
      setDate(todayStr);
      return;
    }

    fetchSlots();
  }, [slug, date, todayStr]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ✅ Book Appointment (request - pending confirmation)
  const bookAppointment = async () => {
    if (!canConfirm) return;

    try {
      setBookingLoading(true);

      await axios.post(`${API}/${slug}/book`, {
        patientName: form.patientName,
        phone: form.phone,
        email: form.email,
        date,
        timeSlot: selectedSlot,
      });

      // ✅ Show pending state (not booked confirmed)
      setPendingMsg(true);

      // ✅ Refresh slots after request (to avoid double clicks)
      const res = await axios.get(`${API}/${slug}/slots?date=${date}`);
      setSlots(res.data.slots || []);
      setBookedSlots(res.data.bookedSlots || []);
      setSelectedSlot("");

      // ✅ clear form
      setForm({ patientName: "", phone: "", email: "" });

      setTimeout(() => setPendingMsg(false), 3500);
    } catch (err) {
      console.error(err?.response?.data?.message || "Booking failed");
      alert(err?.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC]">
      {/* ✅ Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0B5FFF] via-[#1B6BFF] to-[#6A5CFF]">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

        <div className="relative max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/90">
                <ShieldCheck className="h-4 w-4" />
                Secure Booking
              </div>

              <h1 className="mt-3 text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Request Appointment
              </h1>

              <p className="mt-1 text-sm md:text-base text-white/85">
                Your request will be confirmed by the doctor ✅
              </p>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="rounded-2xl bg-white/10 px-4 py-3 text-white">
                <p className="text-xs text-white/80">Selected Date</p>
                <p className="font-semibold">{formatDate(date)}</p>
              </div>

              <div className="rounded-2xl bg-white/10 px-4 py-3 text-white">
                <p className="text-xs text-white/80">Selected Slot</p>
                <p className="font-semibold">{selectedSlot || "—"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* ✅ Doctor Card */}
          <motion.div variants={fadeUp} className="lg:col-span-1">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
              {loadingDoctor ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                </div>
              ) : doctor ? (
                <>
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                      {doctor?.name?.[0] || "D"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-500">Doctor</p>
                      <h2 className="text-lg font-bold text-slate-900 truncate">
                        Dr. {doctor?.name}
                      </h2>

                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                        <Stethoscope className="h-4 w-4 text-blue-600" />
                        <span className="truncate">
                          {doctor?.specialization}
                        </span>
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="truncate">{doctor?.clinicName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-700">
                      <CalendarDays className="h-4 w-4 text-blue-600" />
                      <p className="text-sm font-semibold">Appointment Date</p>
                    </div>
                    <p className="mt-1 text-sm text-slate-900 font-bold">
                      {formatDate(date)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Choose a slot and submit request
                    </p>
                  </div>

                  <div className="mt-5 flex items-start gap-2 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                    <p className="text-xs text-blue-900 leading-relaxed">
                      <span className="font-bold">Note:</span> Appointment is{" "}
                      <span className="font-bold">not confirmed</span> until the
                      doctor approves it.
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Powered by Reserva
                  </div>
                </>
              ) : (
                <div className="py-10 text-center text-slate-500">
                  Doctor not found
                </div>
              )}
            </div>
          </motion.div>

          {/* ✅ Booking Card */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
              {/* Title row */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Select Date & Slot
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Submit request — doctor will confirm ✅
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2">
                  <Clock3 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-slate-600">
                    Slot:{" "}
                    <span className="font-bold text-slate-900">
                      {selectedSlot || "—"}
                    </span>
                  </span>
                </div>
              </div>

              {/* ✅ Pending confirmation banner */}
              <AnimatePresence>
                {pendingMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 flex gap-3 items-start"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-emerald-900">
                        Request Sent ✅
                      </p>
                      <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                        Your booking request is submitted. Doctor will verify and
                        confirm soon.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Date input */}
              <div className="mt-6">
                <label className="text-sm font-semibold text-slate-800">
                  Appointment Date
                </label>

                <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                  <CalendarDays className="h-4 w-4 text-slate-400" />
                  <input
                    type="date"
                    value={date}
                    min={todayStr}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm text-slate-900"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  ✅ You can only select today or future dates
                </p>
              </div>

              {/* Slots */}
              <div className="mt-7">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">
                    Available Slots
                  </p>

                  {loadingSlots && (
                    <span className="text-xs text-slate-500 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading...
                    </span>
                  )}
                </div>

                <AnimatePresence mode="wait">
                 {(slots.length === 0 || closedInfo.closed) && !loadingSlots ? (

                    <motion.div
                      key="no-slots"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center"
                    >
                      <p className="text-slate-700 font-semibold">
                      {closedInfo.closed ? "Clinic Closed" : "No slots available"}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {closedInfo.closed
                        ? closedInfo.message || "Doctor is not available on this day"
                        : "Try another date"}
                    </p>

                    </motion.div>
                  ) : (
                    <motion.div
                      key={date}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2"
                    >
                      {slots.map((slot, idx) => {
                        const isBooked = bookedSlots.includes(slot);
                        const isSelected = selectedSlot === slot;

                        return (
                          <motion.button
                            key={slot}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.01 }}
                            disabled={isBooked}
                            onClick={() => setSelectedSlot(slot)}
                            className={[
                              "rounded-2xl px-3 py-2 text-sm font-semibold border transition",
                              isBooked
                                ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                                : isSelected
                                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50 hover:border-blue-200",
                            ].join(" ")}
                          >
                            {slot}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="mt-3 text-xs text-slate-500">
                  ✅ Already booked slots are disabled automatically
                </p>
              </div>

              {/* Patient Form */}
              <div className="mt-8">
                <p className="text-sm font-semibold text-slate-800">
                  Patient Details
                </p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Full Name
                    </label>
                    <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                      <User2 className="h-4 w-4 text-slate-400" />
                      <input
                        value={form.patientName}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            patientName: e.target.value,
                          }))
                        }
                        className="w-full bg-transparent outline-none text-sm text-slate-900"
                        placeholder="Enter patient name"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Phone Number
                    </label>
                    <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <input
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, phone: e.target.value }))
                        }
                        className="w-full bg-transparent outline-none text-sm text-slate-900"
                        placeholder="9876543210"
                        inputMode="numeric"
                      />
                    </div>
                    {!!form.phone.trim() && !isValidPhone(form.phone) && (
                      <p className="mt-1 text-xs text-red-500">
                        Enter valid 10-digit Indian number
                      </p>
                    )}
                  </div>

                  {/* Email (full width) */}
                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Email Address
                    </label>
                    <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <input
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        className="w-full bg-transparent outline-none text-sm text-slate-900"
                        placeholder="example@gmail.com"
                      />
                    </div>
                    {!!form.email.trim() && !isValidEmail(form.email) && (
                      <p className="mt-1 text-xs text-red-500">
                        Enter a valid email address
                      </p>
                    )}

                    <p className="mt-2 text-xs text-slate-500">
                      ✅ Confirmation & updates will be sent on email
                    </p>
                  </div>
                </div>
              </div>

              {/* Confirm */}
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200 pt-6">
                <div className="text-sm text-slate-600">
                  Selected:{" "}
                  <span className="font-extrabold text-slate-900">
                    {selectedSlot || "—"}
                  </span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: canConfirm ? 1.02 : 1 }}
                  onClick={bookAppointment}
                  disabled={!canConfirm}
                  className={[
                    "w-full sm:w-auto rounded-2xl px-6 py-3 font-bold text-white transition flex items-center justify-center gap-2",
                    canConfirm
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-slate-300 cursor-not-allowed",
                  ].join(" ")}
                >
                  {bookingLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Booking Request
                      <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </motion.button>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                ⚠️ Booking is <span className="font-bold">pending</span> until doctor
                confirms it.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* bottom footer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Reserva • Professional booking for clinics
        </div>
      </main>
    </div>
  );
}
