import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { toast, ToastContainer } from "react-toastify";
import {
  Copy,
  Check,
  Save,
  CalendarClock,
  Settings,
  User2,
  Building2,
  BadgeCheck,
  Crown,
  Image as ImageIcon,
  ExternalLink,
  Plus,
  Trash2,
} from "lucide-react";

const API = "http://localhost:4000/api/doctor";
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("overview");

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // ✅ Local settings state
  const [vacationMode, setVacationMode] = useState(false);
  const [allowOnlineBooking, setAllowOnlineBooking] = useState(true);
  const [requireConfirmation, setRequireConfirmation] = useState(true);

  // ✅ Weekly Off
  const [closedDays, setClosedDays] = useState([]);

  // ✅ Booking rules
  const [bookingWindowDays, setBookingWindowDays] = useState(30);
  const [bufferTimeMins, setBufferTimeMins] = useState(0);
  const [maxAppointmentsPerDay, setMaxAppointmentsPerDay] = useState(50);

  // ✅ Timing form (single slot default)
  const [timings, setTimings] = useState({
    start: "10:00",
    end: "14:00",
    durationMins: 15,
  });

  // ✅ Optional: Multiple slots (UI ready)
  const [extraSlots, setExtraSlots] = useState([
    // { start: "17:00", end: "20:00", durationMins: 15 }
  ]);

  // ✅ Profile fields
  const [profile, setProfile] = useState({
    clinicPhone: "",
    googleMapLink: "",
    aboutDoctor: "",
    services: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
  });

  // ✅ Branding fields (simple URL approach)
  const [branding, setBranding] = useState({
    logoUrl: "",
    profilePhoto: "",
  });

  // ✅ subscription view
  const subscription = useMemo(() => {
    return {
      planName: user?.planName || "STARTER",
      subscriptionStatus: user?.subscriptionStatus || "TRIAL",
      trialEndDate: user?.trialEndDate?.$date || user?.trialEndDate,
    };
  }, [user]);

  // ✅ Load doctor fresh
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const loadMe = async () => {
      try {
        const res = await axios.get(`${API}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        if (!res.data.user.profileCompleted) {
          navigate("/onboarding");
          return;
        }

        // ✅ states from backend
        setVacationMode(Boolean(res.data.user.vacationMode));
        setAllowOnlineBooking(Boolean(res.data.user.allowOnlineBooking));
        setRequireConfirmation(Boolean(res.data.user.requireConfirmation));

        setBookingWindowDays(Number(res.data.user.bookingWindowDays || 30));
        setBufferTimeMins(Number(res.data.user.bufferTimeMins || 0));
        setMaxAppointmentsPerDay(Number(res.data.user.maxAppointmentsPerDay || 50));

        // ✅ profile data
        setProfile({
          clinicPhone: res.data.user.clinicPhone || "",
          googleMapLink: res.data.user.googleMapLink || "",
          aboutDoctor: res.data.user.aboutDoctor || "",
          services: (res.data.user.services || []).join(", "),
          state: res.data.user.state || "",
          city: res.data.user.city || "",
          address: res.data.user.address || "",
          pincode: res.data.user.pincode || "",
        });

        // ✅ branding
        setBranding({
          logoUrl: res.data.user.logoUrl || "",
          profilePhoto: res.data.user.profilePhoto || "",
        });

        // ✅ businessHours
        const savedBH = res.data.user.businessHours || [];

        const closed = savedBH
          .filter((d) => d?.isOpen === false)
          .map((d) => d.day);

        setClosedDays(closed);

        // ✅ load timings from first open day
        const firstOpenDay = savedBH.find((d) => d?.isOpen !== false);
        const slot = firstOpenDay?.slots?.[0];

        if (slot) {
          setTimings({
            start: slot.start,
            end: slot.end,
            durationMins: slot.durationMins,
          });
        }
      } catch (err) {
        navigate("/login");
      }
    };

    loadMe();
  }, [token, navigate]);

  const bookingUrl = useMemo(() => {
    return `${window.location.origin}/${user?.slug}`;
  }, [user?.slug]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(bookingUrl);
      setCopied(true);
      toast.success("✅ Booking link copied!");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("❌ Copy failed! Please copy manually.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.info("Logged out ✅");
    setTimeout(() => navigate("/"), 400);
  };

  const toggleClosedDay = (day) => {
    setClosedDays((prev) => {
      if (prev.includes(day)) return prev.filter((d) => d !== day);
      return [...prev, day];
    });
  };

  const validateTimings = () => {
    if (!timings.start || !timings.end) {
      toast.error("❌ Please select start & end time");
      return false;
    }
    if (timings.start >= timings.end) {
      toast.error("❌ End time must be after start time");
      return false;
    }
    const dur = Number(timings.durationMins);
    if (![5, 10, 15, 20, 30].includes(dur)) {
      toast.error("❌ Invalid slot duration");
      return false;
    }
    return true;
  };

  const validateBookingRules = () => {
    const w = Number(bookingWindowDays);
    const b = Number(bufferTimeMins);
    const m = Number(maxAppointmentsPerDay);

    if (w < 1 || w > 365) {
      toast.error("❌ Booking window days must be between 1 and 365");
      return false;
    }
    if (![0, 5, 10, 15, 20, 30].includes(b)) {
      toast.error("❌ Buffer time invalid");
      return false;
    }
    if (m < 1 || m > 500) {
      toast.error("❌ Max appointments should be between 1 and 500");
      return false;
    }
    return true;
  };

  const validateProfile = () => {
    if (profile.pincode && !/^\d{6}$/.test(profile.pincode.trim())) {
      toast.error("❌ Pincode must be 6 digits");
      return false;
    }
    if (profile.clinicPhone && !/^[6-9]\d{9}$/.test(profile.clinicPhone.trim())) {
      toast.error("❌ Clinic phone must be valid Indian number");
      return false;
    }
    return true;
  };

  const saveSettings = async () => {
    if (!validateTimings()) return;
    if (!validateBookingRules()) return;
    if (!validateProfile()) return;

    try {
      setLoading(true);

      // ✅ businessHours as per backend
      const businessHours = days.map((d) => {
        const isClosed = closedDays.includes(d);

        return {
          day: d,
          isOpen: !isClosed,
          slots: isClosed
            ? []
            : [
                {
                  start: timings.start,
                  end: timings.end,
                  durationMins: Number(timings.durationMins),
                },
              ],
        };
      });

      const payload = {
        // ✅ Phase 1
        vacationMode,
        allowOnlineBooking,
        requireConfirmation,
        businessHours,

        // ✅ Phase 2
        bookingWindowDays: Number(bookingWindowDays),
        bufferTimeMins: Number(bufferTimeMins),
        maxAppointmentsPerDay: Number(maxAppointmentsPerDay),

        // ✅ Profile
        clinicPhone: profile.clinicPhone,
        googleMapLink: profile.googleMapLink,
        aboutDoctor: profile.aboutDoctor,
        services: profile.services
          ? profile.services.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        state: profile.state,
        city: profile.city,
        address: profile.address,
        pincode: profile.pincode,

        // ✅ Branding
        logoUrl: branding.logoUrl,
        profilePhoto: branding.profilePhoto,
      };

      const res = await axios.put(`${API}/profile`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("✅ Settings saved successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "❌ Save failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ trial countdown
  const trialLeftText = useMemo(() => {
    if (!subscription.trialEndDate) return null;

    const end = new Date(subscription.trialEndDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return "Trial ended";
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `${daysLeft} days left`;
  }, [subscription.trialEndDate]);

  return (
    <div className="min-h-screen bg-[#F6F8FC] overflow-x-hidden">
      <Navbar />

      {/* ✅ Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={2200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <div className="pt-28 mx-auto max-w-7xl px-4 md:px-8 pb-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#131720]">
              Welcome, Dr. {user?.name}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage booking, timings, profile & subscription.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={saveSettings}
              disabled={loading}
              className="
                inline-flex items-center justify-center gap-2
                rounded-2xl px-5 py-2.5 text-sm font-semibold text-white
                bg-gradient-to-r from-[#12a588] to-[#18c4a1]
                shadow-[0_16px_45px_-22px_rgba(18,165,136,0.75)]
                hover:shadow-[0_24px_70px_-28px_rgba(18,165,136,0.95)]
                hover:opacity-95 transition-all duration-200
                active:scale-[0.98]
                disabled:opacity-60 disabled:cursor-not-allowed
                cursor-pointer
              "
            >
              <Save className="w-4 h-4" />
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={logout}
              className="
                inline-flex items-center justify-center
                rounded-2xl px-5 py-2.5 text-sm font-semibold
                border border-slate-200 bg-white text-slate-700
                hover:bg-slate-50 hover:text-[#12a588]
                transition-all duration-200
                active:scale-[0.98]
                cursor-pointer
              "
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { key: "overview", label: "Overview", icon: <BadgeCheck className="w-4 h-4" /> },
            { key: "rules", label: "Booking Rules", icon: <Settings className="w-4 h-4" /> },
            { key: "profile", label: "Profile", icon: <User2 className="w-4 h-4" /> },
            { key: "branding", label: "Branding", icon: <ImageIcon className="w-4 h-4" /> },
            { key: "subscription", label: "Subscription", icon: <Crown className="w-4 h-4" /> },
          ].map((t) => {
            const active = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`
                  inline-flex items-center gap-2
                  px-4 py-2.5 rounded-2xl text-sm font-semibold border
                  transition-all duration-200 cursor-pointer
                  ${active
                    ? "bg-[#12a588]/10 text-[#12a588] border-[#12a588]/30"
                    : "bg-white text-slate-700 border-slate-200 hover:text-[#12a588] hover:border-[#12a588]/25"}
                `}
              >
                {t.icon}
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Overview always visible */}
          <div className="lg:col-span-1 space-y-6">
            {/* Booking URL */}
            <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.25)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-[#131720]">Booking Link</h2>
                  <p className="text-xs text-slate-500">Share with patients</p>
                </div>

                <button
                  onClick={copyLink}
                  className="
                    inline-flex items-center justify-center
                    rounded-2xl px-4 py-2 text-sm font-semibold
                    border border-slate-200 bg-white text-slate-700
                    hover:bg-slate-50 hover:text-[#12a588]
                    transition-all duration-200
                    active:scale-[0.98]
                    cursor-pointer
                  "
                >
                  {copied ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Copy className="w-4 h-4" /> Copy
                    </span>
                  )}
                </button>
              </div>

              <div className="mt-4 p-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <p className="text-sm text-slate-600 break-all">{bookingUrl}</p>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => window.open(bookingUrl, "_blank")}
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-2xl px-5 py-2.5 text-sm font-semibold text-white
                    bg-gradient-to-r from-[#12a588] to-[#18c4a1]
                    shadow-[0_16px_45px_-22px_rgba(18,165,136,0.75)]
                    hover:shadow-[0_24px_70px_-28px_rgba(18,165,136,0.95)]
                    hover:opacity-95 transition-all duration-200
                    active:scale-[0.98]
                    cursor-pointer
                  "
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Booking Page
                </button>

                <p className="text-xs text-slate-500">
                  ✅ Patients can request slots from here
                </p>
              </div>
            </div>

            {/* QR */}
            <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.25)]">
              <h2 className="text-lg font-bold text-[#131720]">QR Code</h2>
              <p className="text-xs text-slate-500">Print & place on reception</p>

              <div className="mt-4 flex justify-center">
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <QRCodeCanvas value={bookingUrl} size={180} />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500 text-center">
                Scan → Booking opens instantly ✅
              </p>
            </div>
          </div>

          {/* RIGHT: Tab based */}
          <div className="lg:col-span-2 space-y-6">
            {/* ✅ Overview Tab */}
            {activeTab === "overview" && (
              <>
                <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.25)]">
                  <h2 className="text-lg font-bold text-[#131720]">
                    Quick Controls (Phase 1 ✅)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Fast toggle settings for booking
                  </p>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Vacation */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-sm font-bold text-[#131720]">Vacation Mode</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Disable booking temporarily
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-600">
                          {vacationMode ? "ON" : "OFF"}
                        </span>
                        <button
                          onClick={() => setVacationMode((p) => !p)}
                          className={`w-14 h-8 rounded-full relative transition ${
                            vacationMode ? "bg-red-500" : "bg-green-500"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-6 h-6 rounded-full bg-white transition ${
                              vacationMode ? "left-7" : "left-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Allow Online Booking */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-sm font-bold text-[#131720]">
                        Online Booking
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Show slots to patients
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-600">
                          {allowOnlineBooking ? "Enabled" : "Disabled"}
                        </span>
                        <button
                          onClick={() => setAllowOnlineBooking((p) => !p)}
                          className={`w-14 h-8 rounded-full relative transition ${
                            allowOnlineBooking ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-6 h-6 rounded-full bg-white transition ${
                              allowOnlineBooking ? "left-7" : "left-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Require Confirmation */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-sm font-bold text-[#131720]">
                        Doctor Confirmation
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Requests → Pending approval
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-600">
                          {requireConfirmation ? "Required" : "Auto Confirm"}
                        </span>
                        <button
                          onClick={() => setRequireConfirmation((p) => !p)}
                          className={`w-14 h-8 rounded-full relative transition ${
                            requireConfirmation ? "bg-green-500" : "bg-slate-400"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-6 h-6 rounded-full bg-white transition ${
                              requireConfirmation ? "left-7" : "left-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    ✅ Don’t forget to click <b>Save Changes</b> on top.
                  </p>
                </div>
              </>
            )}

            {/* ✅ Booking Rules Tab */}
            {activeTab === "rules" && (
              <>
                <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.25)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-[#131720]">
                        Clinic Timings (Phase 1 ✅)
                      </h2>
                      <p className="text-xs text-slate-500">
                        Set open days + timing and slot duration
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 whitespace-nowrap">
                      <CalendarClock className="w-4 h-4" /> Slots auto-generate
                    </div>
                  </div>

                  {/* Weekly off */}
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-slate-700 mb-2">
                      Weekly Off (Closed days)
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {days.map((d) => {
                        const active = closedDays.includes(d);
                        return (
                          <button
                            key={d}
                            onClick={() => toggleClosedDay(d)}
                            className={`
                              px-4 py-2 rounded-2xl text-sm font-semibold border
                              transition-all duration-200 cursor-pointer
                              ${
                                active
                                  ? "bg-red-50 text-red-600 border-red-200"
                                  : "bg-white text-slate-700 border-slate-200 hover:text-[#12a588] hover:border-[#12a588]/30"
                              }
                            `}
                          >
                            {d} {active ? "Off" : "Open"}
                          </button>
                        );
                      })}
                    </div>

                    <p className="mt-2 text-xs text-slate-500">
                      ✅ Closed days will show no slots to patients.
                    </p>
                  </div>

                  {/* Time + duration */}
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Start Time
                      </label>
                      <input
                        type="time"
                        className="
                          mt-2 w-full px-4 py-3 rounded-2xl
                          border border-slate-200 bg-white text-sm text-[#131720]
                          outline-none shadow-sm
                          focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition
                        "
                        value={timings.start}
                        onChange={(e) =>
                          setTimings((p) => ({ ...p, start: e.target.value }))
                        }
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        End Time
                      </label>
                      <input
                        type="time"
                        className="
                          mt-2 w-full px-4 py-3 rounded-2xl
                          border border-slate-200 bg-white text-sm text-[#131720]
                          outline-none shadow-sm
                          focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition
                        "
                        value={timings.end}
                        onChange={(e) =>
                          setTimings((p) => ({ ...p, end: e.target.value }))
                        }
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Slot Duration
                      </label>
                      <select
                        className="
                          mt-2 w-full px-4 py-3 rounded-2xl
                          border border-slate-200 bg-white text-sm text-[#131720]
                          outline-none shadow-sm cursor-pointer
                          focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition
                        "
                        value={timings.durationMins}
                        onChange={(e) =>
                          setTimings((p) => ({
                            ...p,
                            durationMins: Number(e.target.value),
                          }))
                        }
                      >
                        <option value={5}>5 minutes</option>
                        <option value={10}>10 minutes</option>
                        <option value={15}>15 minutes</option>
                        <option value={20}>20 minutes</option>
                        <option value={30}>30 minutes</option>
                      </select>
                    </div>
                  </div>

                  {/* Multiple Slots UI (Phase 2) */}
                  <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-[#131720]">
                          Extra Slots (Phase 2 ⭐)
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Example: Evening clinic slot (UI ready)
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          setExtraSlots((prev) => [
                            ...prev,
                            { start: "17:00", end: "20:00", durationMins: timings.durationMins },
                          ])
                        }
                        className="
                          inline-flex items-center justify-center gap-2
                          rounded-2xl px-4 py-2 text-sm font-semibold
                          border border-slate-200 bg-white text-slate-700
                          hover:bg-slate-50 hover:text-[#12a588]
                          transition-all duration-200 active:scale-[0.98]
                          cursor-pointer
                        "
                      >
                        <Plus className="w-4 h-4" />
                        Add Slot
                      </button>
                    </div>

                    {extraSlots.length === 0 ? (
                      <p className="mt-4 text-xs text-slate-500">
                        No extra slots added.
                      </p>
                    ) : (
                      <div className="mt-4 space-y-3">
                        {extraSlots.map((s, idx) => (
                          <div
                            key={idx}
                            className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center"
                          >
                            <input
                              type="time"
                              value={s.start}
                              onChange={(e) => {
                                setExtraSlots((prev) =>
                                  prev.map((x, i) =>
                                    i === idx ? { ...x, start: e.target.value } : x
                                  )
                                );
                              }}
                              className="
                                w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm
                                outline-none shadow-sm focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition
                              "
                            />

                            <input
                              type="time"
                              value={s.end}
                              onChange={(e) => {
                                setExtraSlots((prev) =>
                                  prev.map((x, i) =>
                                    i === idx ? { ...x, end: e.target.value } : x
                                  )
                                );
                              }}
                              className="
                                w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm
                                outline-none shadow-sm focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition
                              "
                            />

                            <select
                              value={s.durationMins}
                              onChange={(e) => {
                                setExtraSlots((prev) =>
                                  prev.map((x, i) =>
                                    i === idx
                                      ? { ...x, durationMins: Number(e.target.value) }
                                      : x
                                  )
                                );
                              }}
                              className="
                                w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm
                                outline-none shadow-sm cursor-pointer
                                focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition
                              "
                            >
                              <option value={5}>5 min</option>
                              <option value={10}>10 min</option>
                              <option value={15}>15 min</option>
                              <option value={20}>20 min</option>
                              <option value={30}>30 min</option>
                            </select>

                            <button
                              onClick={() =>
                                setExtraSlots((prev) => prev.filter((_, i) => i !== idx))
                              }
                              className="
                                inline-flex items-center justify-center gap-2
                                rounded-2xl px-4 py-3 text-sm font-semibold
                                border border-red-200 bg-red-50 text-red-600
                                hover:bg-red-100 transition-all duration-200 cursor-pointer
                              "
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="mt-3 text-xs text-slate-500">
                      ⚠️ Backend needs support to save multiple slots per day (we’ll add next).
                    </p>
                  </div>
                </div>

                {/* Booking Rules Phase 2 */}
                <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.25)]">
                  <h2 className="text-lg font-bold text-[#131720]">
                    Booking Rules (Phase 2 ⭐)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Control how patients can book appointments
                  </p>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Booking Window (Days)
                      </label>
                      <select
                        value={bookingWindowDays}
                        onChange={(e) => setBookingWindowDays(Number(e.target.value))}
                        className="
                          mt-2 w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm
                          outline-none shadow-sm cursor-pointer
                          focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition
                        "
                      >
                        <option value={7}>7 days</option>
                        <option value={14}>14 days</option>
                        <option value={30}>30 days</option>
                        <option value={60}>60 days</option>
                        <option value={90}>90 days</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Buffer Time (mins)
                      </label>
                      <select
                        value={bufferTimeMins}
                        onChange={(e) => setBufferTimeMins(Number(e.target.value))}
                        className="
                          mt-2 w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm
                          outline-none shadow-sm cursor-pointer
                          focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition
                        "
                      >
                        <option value={0}>0 mins</option>
                        <option value={5}>5 mins</option>
                        <option value={10}>10 mins</option>
                        <option value={15}>15 mins</option>
                        <option value={20}>20 mins</option>
                        <option value={30}>30 mins</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Max Appointments / Day
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={500}
                        value={maxAppointmentsPerDay}
                        onChange={(e) => setMaxAppointmentsPerDay(Number(e.target.value))}
                        className="
                          mt-2 w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm
                          outline-none shadow-sm
                          focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition
                        "
                      />
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    ✅ These will control the slots shown on public booking page.
                  </p>
                </div>
              </>
            )}

            {/* ✅ Profile Tab */}
            {activeTab === "profile" && (
              <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.25)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-[#131720]">
                      Clinic Profile (Phase 1 ✅)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Update details visible to patients
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs text-slate-500">
                    <Building2 className="w-4 h-4" />
                    Public Booking Page
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-[#131720]
                    outline-none shadow-sm focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition"
                    placeholder="Clinic Phone (optional)"
                    value={profile.clinicPhone}
                    onChange={(e) => setProfile((p) => ({ ...p, clinicPhone: e.target.value }))}
                  />

                  <input
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-[#131720]
                    outline-none shadow-sm focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition"
                    placeholder="Google Map Link (optional)"
                    value={profile.googleMapLink}
                    onChange={(e) => setProfile((p) => ({ ...p, googleMapLink: e.target.value }))}
                  />

                  <input
                    className="md:col-span-2 w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-[#131720]
                    outline-none shadow-sm focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition"
                    placeholder="Clinic Address"
                    value={profile.address}
                    onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
                  />

                  <input
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-[#131720]
                    outline-none shadow-sm focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition"
                    placeholder="City"
                    value={profile.city}
                    onChange={(e) => setProfile((p) => ({ ...p, city: e.target.value }))}
                  />

                  <input
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-[#131720]
                    outline-none shadow-sm focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition"
                    placeholder="State"
                    value={profile.state}
                    onChange={(e) => setProfile((p) => ({ ...p, state: e.target.value }))}
                  />

                  <input
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-[#131720]
                    outline-none shadow-sm focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition"
                    placeholder="Pincode"
                    value={profile.pincode}
                    onChange={(e) => setProfile((p) => ({ ...p, pincode: e.target.value }))}
                  />

                  <textarea
                    rows={3}
                    className="md:col-span-2 w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-[#131720]
                    outline-none shadow-sm focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition"
                    placeholder="About Doctor (short intro)"
                    value={profile.aboutDoctor}
                    onChange={(e) => setProfile((p) => ({ ...p, aboutDoctor: e.target.value }))}
                  />

                  <input
                    className="md:col-span-2 w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-[#131720]
                    outline-none shadow-sm focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition"
                    placeholder="Services (comma separated) e.g. Root Canal, Braces"
                    value={profile.services}
                    onChange={(e) => setProfile((p) => ({ ...p, services: e.target.value }))}
                  />
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  ✅ Click <b>Save Changes</b> to update profile.
                </p>
              </div>
            )}

            {/* ✅ Branding Tab */}
            {activeTab === "branding" && (
              <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.25)]">
                <h2 className="text-lg font-bold text-[#131720]">
                  Branding (Phase 3 💎)
                </h2>
                <p className="text-xs text-slate-500">
                  Add photos/logo for premium public page
                </p>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-[#131720]
                    outline-none shadow-sm focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition"
                    placeholder="Logo URL (optional)"
                    value={branding.logoUrl}
                    onChange={(e) =>
                      setBranding((p) => ({ ...p, logoUrl: e.target.value }))
                    }
                  />

                  <input
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-[#131720]
                    outline-none shadow-sm focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10 transition"
                    placeholder="Doctor Profile Photo URL (optional)"
                    value={branding.profilePhoto}
                    onChange={(e) =>
                      setBranding((p) => ({ ...p, profilePhoto: e.target.value }))
                    }
                  />
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  ✅ Later we can add real upload using Cloudinary.
                </p>
              </div>
            )}

            {/* ✅ Subscription Tab */}
            {activeTab === "subscription" && (
              <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.25)]">
                <h2 className="text-lg font-bold text-[#131720]">
                  Subscription (Phase 3 💸)
                </h2>
                <p className="text-xs text-slate-500">
                  Plan details + trial status
                </p>

                <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-500">Current Plan</p>
                      <p className="text-xl font-extrabold text-[#131720] mt-1">
                        {subscription.planName}
                      </p>
                      <p className="text-sm text-slate-600 mt-2">
                        Status:{" "}
                        <span className="font-bold text-[#12a588]">
                          {subscription.subscriptionStatus}
                        </span>
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#12a588]/10 border border-[#12a588]/20 px-4 py-3">
                      <p className="text-xs text-slate-500">Trial</p>
                      <p className="text-sm font-bold text-[#12a588]">
                        {trialLeftText || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => toast.info("Upgrade feature coming soon ✅")}
                      className="
                        inline-flex items-center justify-center
                        rounded-2xl px-5 py-2.5 text-sm font-semibold text-white
                        bg-gradient-to-r from-[#131720] to-[#1f2937]
                        shadow-sm hover:opacity-95 transition-all duration-200
                        active:scale-[0.98] cursor-pointer
                      "
                    >
                      Upgrade Plan
                    </button>

                    <button
                      onClick={() => toast.info("Billing page coming soon ✅")}
                      className="
                        inline-flex items-center justify-center
                        rounded-2xl px-5 py-2.5 text-sm font-semibold
                        border border-slate-200 bg-white text-slate-700
                        hover:bg-slate-50 hover:text-[#12a588]
                        transition-all duration-200
                        active:scale-[0.98]
                        cursor-pointer
                      "
                    >
                      View Billing
                    </button>
                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    ✅ We’ll connect Razorpay later for payments.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Reserva • Professional booking for clinics
        </div>
      </div>
    </div>
  );
}
