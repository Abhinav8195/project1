import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";

const API = "http://localhost:4000/api/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    if (!form.email || !form.password) {
      alert("Please fill email & password");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API}/login`, form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F6F8FC]">
        {/* ✅ Premium BG */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 w-[520px] h-[520px] rounded-full bg-teal-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,0.08),transparent_55%)]" />
        </div>

        {/* ✅ Center area */}
        <div className="pt-28 pb-14 min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[520px]"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white/80 backdrop-blur-xl shadow-[0_30px_90px_-35px_rgba(0,0,0,0.25)]">
              {/* ✅ Top gradient strip */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />

              <div className="p-6 sm:p-10">
                {/* ✅ Badge */}
                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-emerald-700 text-sm font-semibold border border-emerald-100">
                    <Sparkles className="w-4 h-4" />
                    Secure Doctor Login
                  </div>
                </div>

                {/* ✅ Title */}
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Welcome back 👋
                  </h2>
                  <p className="text-sm sm:text-base text-slate-500 mt-2">
                    Login to manage your appointments and clinic schedule.
                  </p>
                </div>

                {/* ✅ Form */}
                <div className="mt-8 space-y-5">
                  {/* Email */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Email
                    </label>
                    <div className="mt-2 relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        className="w-full rounded-2xl border border-slate-200 bg-white px-11 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-sm"
                        placeholder="doctor@email.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-slate-700">
                        Password
                      </label>

                      <button
                        type="button"
                        onClick={()=>navigate("/forgot-password")}
                        className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <div className="mt-2 relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        className="w-full rounded-2xl border border-slate-200 bg-white px-11 pr-12 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-sm"
                        placeholder="Enter your password"
                        type={showPass ? "text" : "password"}
                        value={form.password}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, password: e.target.value }))
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                      >
                        {showPass ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* ✅ Login button */}
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <button
                      onClick={login}
                      disabled={loading}
                      className="w-full h-12 rounded-2xl text-base font-bold text-white
                      bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600
                      hover:opacity-90 shadow-[0_18px_40px_-18px_rgba(16,185,129,0.7)]
                      transition-all duration-200 active:scale-[0.99]
                      disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "Logging in..." : "Sign In"}
                    </button>
                  </motion.div>

                  {/* Divider */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-xs text-slate-500">
                      New to Reserva?
                    </span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>

                  {/* ✅ Trial button */}
                  <button
                    onClick={() => navigate("/start-free-trial")}
                    className="w-full h-12 rounded-2xl font-semibold border border-slate-200 bg-white
                    hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200"
                  >
                    Start Your Free 14-Day Trial
                  </button>

                  {/* Terms */}
                  <p className="text-xs text-slate-500 text-center leading-relaxed">
                    By continuing, you agree to our{" "}
                    <span className="text-emerald-700 font-semibold cursor-pointer">
                      Terms
                    </span>{" "}
                    &{" "}
                    <span className="text-emerald-700 font-semibold cursor-pointer">
                      Privacy Policy
                    </span>
                    .
                  </p>

                  {/* Back */}
                  <div className="flex justify-center pt-1">
                    <button
                      onClick={() => navigate("/")}
                      className="text-sm text-slate-500 hover:text-slate-900 transition"
                    >
                      ← Back to Home
                    </button>
                  </div>
                </div>
              </div>
              {/* end */}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
