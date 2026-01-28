import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";

const API = "http://localhost:4000/api/auth";

const easeOut = [0.16, 1, 0.3, 1];

const wrap = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3, ease: easeOut } },
};

const card = {
  hidden: { opacity: 0, y: 16, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendReset = async () => {
    if (!email) return alert("Please enter your email");

    try {
      setLoading(true);

      const res = await axios.post(`${API}/forgot-password`, { email });

      alert(res?.data?.message || "✅ Reset link sent to your email!");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={wrap}
      initial="hidden"
      animate="show"
      className="min-h-screen overflow-x-hidden "
    >
      <Navbar />

      {/* ✅ Premium Gradient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* soft base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F6F8FC] via-white to-[#F6F8FC]" />

        {/* green blob */}
        <div className="absolute -top-56 -right-56 w-[680px] h-[680px] rounded-full bg-[#12a588]/18 blur-3xl" />

        {/* teal blob */}
        <div className="absolute -bottom-64 -left-64 w-[720px] h-[720px] rounded-full bg-[#18c4a1]/14 blur-3xl" />

        {/* wave glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(18,165,136,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_75%,rgba(24,196,161,0.08),transparent_55%)]" />

        {/* tiny grain effect (premium look) */}
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="pt-28 pb-14 px-4">
        <div className="mx-auto w-full max-w-xl">
          <motion.div
            variants={card}
            className="
              relative overflow-hidden rounded-3xl
              border border-slate-200
              bg-white/80 backdrop-blur-xl
              shadow-[0_30px_90px_-45px_rgba(0,0,0,0.20)]
            "
          >
            {/* ✅ top strip */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#12a588] via-[#18c4a1] to-[#12a588]" />

            <div className="p-6 sm:p-10">
              {/* ✅ Badge */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 text-slate-700 text-sm font-semibold shadow-sm">
                  <Sparkles className="w-4 h-4 text-[#12a588]" />
                  Password Recovery
                </div>
              </div>

              {/* ✅ Title */}
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#131720] tracking-tight">
                  Forgot your password?
                </h2>
                <p className="text-sm sm:text-base text-gray-500 mt-2 leading-relaxed">
                  No worries! Enter your email and we’ll send you a reset link.
                </p>
              </div>

              {/* ✅ Form (SAME AS YOU GAVE) */}
              <div className="mt-8 space-y-5">
                {/* Email */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <div
                    className="
                      mt-2 flex items-center gap-2
                      rounded-2xl border border-slate-200
                      bg-white px-3 py-3 shadow-sm
                      transition-all duration-200
                      focus-within:border-[#12a588]
                      focus-within:ring-4 focus-within:ring-[#12a588]/10
                    "
                  >
                    <Mail className="w-4 h-4 text-slate-400" />
                    <input
                      className="w-full bg-transparent outline-none text-sm text-[#131720] placeholder:text-slate-400"
                      placeholder="doctor@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* ✅ Submit */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={sendReset}
                  disabled={loading}
                  className="
                    w-full inline-flex items-center justify-center
                    rounded-2xl px-6 py-3.5 text-sm sm:text-base font-semibold text-white
                    bg-gradient-to-r from-[#12a588] to-[#18c4a1]
                    shadow-[0_18px_45px_-22px_rgba(18,165,136,0.65)]
                    hover:shadow-[0_26px_75px_-30px_rgba(18,165,136,0.90)]
                    hover:opacity-95
                    transition-all duration-200
                    active:scale-[0.98]
                    disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer
                  "
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </motion.button>

                {/* ✅ Back to login */}
                <button
                  onClick={() => navigate("/login")}
                  className="
                    w-full inline-flex items-center justify-center gap-2
                    rounded-2xl px-6 py-3.5 text-sm sm:text-base font-semibold
                    border border-slate-200 bg-white
                    text-slate-700 hover:text-[#12a588]
                    hover:bg-green-50
                    transition-all duration-200 cursor-pointer
                  "
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </button>

                {/* ✅ Note */}
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  If you don’t receive the email within 2 minutes, check your spam
                  folder.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
