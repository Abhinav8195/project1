import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Hospital,
  Stethoscope,
  Mail,
  Lock,
  Eye,
  EyeOff,
  BadgeCheck,
  QrCode,
  Link as LinkIcon,
} from "lucide-react";
import Navbar from "../components/Navbar";

const API = "http://localhost:4000/api/auth";

const easeOut = [0.16, 1, 0.3, 1];

const wrap = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, ease: easeOut } },
};

const card = {
  hidden: { opacity: 0, y: 14, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: easeOut },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

export default function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    name: "",
    clinicName: "",
    specialization: "",
    email: "",
    password: "",
  });

  const signup = async () => {
    const { name, clinicName, specialization, email, password } = form;

    if (!name || !clinicName || !specialization || !email || !password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API}/signup`, form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("✅ Account created! Your booking link is ready.");
      navigate("/dashboard");
    } catch (err) {
      alert(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={wrap}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-[#F6F8FC] overflow-x-hidden"
    >
      <Navbar />

      {/* ✅ Premium BG (lighter blur = smooth) */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-44 -right-44 w-[520px] h-[520px] rounded-full bg-[#12a588]/10 blur-2xl" />
        <div className="absolute -bottom-56 -left-56 w-[560px] h-[560px] rounded-full bg-[#18c4a1]/10 blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(18,165,136,0.07),transparent_55%)]" />
      </div>

      <div className="pt-28 pb-14">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          {/* ✅ MAIN CARD (one animation only) */}
          <motion.div
            variants={card}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/85 shadow-[0_20px_55px_-25px_rgba(0,0,0,0.25)]"
          >
            {/* Top strip */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#12a588] via-[#18c4a1] to-[#12a588]" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2">
              {/* ✅ Left Panel */}
              <div className="hidden lg:flex flex-col justify-between p-10">
                <div>
                  <motion.h1
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="text-3xl font-bold text-[#131720] leading-tight"
                  >
                    Start your{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#12a588] to-[#18c4a1]">
                      Free Trial
                    </span>
                  </motion.h1>

                  <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="text-slate-600 mt-3"
                  >
                    Create your doctor account and instantly get:
                  </motion.p>

                  <div className="mt-8 space-y-5">
                    {[
                      {
                        icon: <LinkIcon className="w-5 h-5 text-[#12a588]" />,
                        title: "Unique Booking URL",
                        desc: "Patients can book anytime from your link.",
                      },
                      {
                        icon: <QrCode className="w-5 h-5 text-[#12a588]" />,
                        title: "QR Code",
                        desc: "Put it on reception to enable quick booking.",
                      },
                      {
                        icon: <BadgeCheck className="w-5 h-5 text-[#12a588]" />,
                        title: "No Double Booking",
                        desc: "Same slot can’t be booked twice.",
                      },
                    ].map((f) => (
                      <div key={f.title} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#12a588]/10 flex items-center justify-center">
                          {f.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-[#131720]">
                            {f.title}
                          </p>
                          <p className="text-sm text-slate-500 mt-1">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate("/")}
                  className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold
                  border border-slate-200 bg-white text-slate-700 hover:text-[#12a588] hover:bg-green-50 transition-all duration-200 cursor-pointer"
                >
                  ← Back to Home
                </button>
              </div>

              {/* ✅ Form */}
              <div className="p-6 sm:p-8 md:p-10 border-t lg:border-t-0 lg:border-l border-slate-200">
                <div className="mx-auto w-full max-w-xl">
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="mb-7 text-center lg:text-left"
                  >
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#131720]">
                      Create Doctor Account
                    </h2>
                    <p className="text-sm sm:text-base text-slate-500 mt-2">
                      Fill basic info — you can update clinic timings later.
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Input Box Component style */}
                    {[
                      {
                        label: "Doctor Name",
                        icon: <User className="w-4 h-4 text-slate-400" />,
                        placeholder: "Ankit Sharma",
                        value: form.name,
                        onChange: (e) =>
                          setForm((p) => ({ ...p, name: e.target.value })),
                      },
                      {
                        label: "Clinic Name",
                        icon: <Hospital className="w-4 h-4 text-slate-400" />,
                        placeholder: "Smile Dental Care",
                        value: form.clinicName,
                        onChange: (e) =>
                          setForm((p) => ({
                            ...p,
                            clinicName: e.target.value,
                          })),
                      },
                      {
                        label: "Specialization",
                        icon: <Stethoscope className="w-4 h-4 text-slate-400" />,
                        placeholder: "Dentist / Skin / Ortho",
                        value: form.specialization,
                        onChange: (e) =>
                          setForm((p) => ({
                            ...p,
                            specialization: e.target.value,
                          })),
                      },
                      {
                        label: "Email",
                        icon: <Mail className="w-4 h-4 text-slate-400" />,
                        placeholder: "doctor@email.com",
                        value: form.email,
                        onChange: (e) =>
                          setForm((p) => ({ ...p, email: e.target.value })),
                      },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="text-sm font-semibold text-slate-700">
                          {field.label}
                        </label>
                        <div
                          className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm
                          focus-within:ring-4 focus-within:ring-[#12a588]/10 focus-within:border-[#12a588]
                          transition-all duration-200"
                        >
                          {field.icon}
                          <input
                            className="w-full bg-transparent outline-none text-sm text-[#131720]"
                            placeholder={field.placeholder}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </div>
                      </div>
                    ))}

                    {/* Password */}
                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold text-slate-700">
                        Password
                      </label>
                      <div
                        className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm
                        focus-within:ring-4 focus-within:ring-[#12a588]/10 focus-within:border-[#12a588]
                        transition-all duration-200"
                      >
                        <Lock className="w-4 h-4 text-slate-400" />
                        <input
                          className="w-full bg-transparent outline-none text-sm text-[#131720]"
                          placeholder="Create a strong password"
                          type={showPass ? "text" : "password"}
                          value={form.password}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, password: e.target.value }))
                          }
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="text-slate-400 hover:text-[#131720] transition cursor-pointer"
                        >
                          {showPass ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-slate-500 mt-2">
                        You’ll get a booking link like:{" "}
                        <span className="text-[#12a588] font-semibold">
                          reserva.com/dr-ankit-sharma
                        </span>
                      </p>
                    </div>

                    {/* ✅ Submit */}
                    <div className="md:col-span-2 mt-2">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={signup}
                        disabled={loading}
                        className="
                          w-full inline-flex items-center justify-center
                          rounded-2xl px-6 py-3.5 text-sm sm:text-base font-semibold text-white
                          bg-gradient-to-r from-[#12a588] to-[#18c4a1]
                          shadow-[0_14px_35px_-18px_rgba(18,165,136,0.7)]
                          hover:opacity-95 transition-all duration-200
                          disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {loading ? "Creating Account..." : "Create Account"}
                      </motion.button>
                    </div>

                    {/* ✅ Bottom link */}
                    <div className="md:col-span-2">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/login")}
                        className="
                          w-full inline-flex items-center justify-center
                          rounded-2xl px-6 py-3.5 text-sm sm:text-base font-semibold
                          border border-slate-200 bg-white text-slate-700
                          hover:bg-green-50 hover:text-[#12a588]
                          transition-all duration-200 cursor-pointer"
                      >
                        Already have an account? Login
                      </motion.button>

                      <p className="text-xs text-slate-500 text-center mt-4 leading-relaxed">
                        By continuing you agree to our Terms & Privacy Policy.
                      </p>
                    </div>
                  </div>

                  {/* ✅ Mobile Back */}
                  <div className="lg:hidden mt-6 flex justify-center">
                    <button
                      onClick={() => navigate("/")}
                      className="text-sm text-slate-500 hover:text-[#131720] transition cursor-pointer"
                    >
                      ← Back to Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
