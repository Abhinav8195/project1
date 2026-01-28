import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = "http://localhost:4000/api/doctor";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    whatsappNumber: "",
    address: "",
    city: "",
    pincode: "",
    defaultSlotDurationMins: 15,
    services: "",
  });

  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // ✅ Helpers
  const onlyDigits = (val) => val.replace(/\D/g, "");

  const validate = (values) => {
    const errors = {};

    // ✅ Phone (required, 10 digits)
    const phoneDigits = onlyDigits(values.phone);
    if (!phoneDigits) {
      errors.phone = "Phone number is required";
    } else if (phoneDigits.length !== 10) {
      errors.phone = "Phone number must be 10 digits";
    }

    // ✅ WhatsApp (optional, 10 digits if provided)
    const whatsappDigits = onlyDigits(values.whatsappNumber);
    if (values.whatsappNumber && whatsappDigits.length !== 10) {
      errors.whatsappNumber = "WhatsApp number must be 10 digits";
    }

    // ✅ Address (required)
    if (!values.address.trim()) {
      errors.address = "Clinic address is required";
    } else if (values.address.trim().length < 8) {
      errors.address = "Address looks too short";
    }

    // ✅ City (required)
    if (!values.city.trim()) {
      errors.city = "City is required";
    } else if (values.city.trim().length < 2) {
      errors.city = "Enter a valid city name";
    }

    // ✅ Pincode (required 6 digits)
    const pinDigits = onlyDigits(values.pincode);
    if (!pinDigits) {
      errors.pincode = "Pincode is required";
    } else if (pinDigits.length !== 6) {
      errors.pincode = "Pincode must be 6 digits";
    }

    // ✅ Slot duration (required)
    const allowedSlots = [10, 15, 20, 30];
    if (!allowedSlots.includes(Number(values.defaultSlotDurationMins))) {
      errors.defaultSlotDurationMins = "Select a valid slot duration";
    }

    // ✅ Services (optional)
    // Example: "Root Canal, Braces" -> ["Root Canal", "Braces"]
    // We'll just validate length if user enters too much
    if (values.services && values.services.length > 200) {
      errors.services = "Services text is too long";
    }

    return errors;
  };

  const errors = useMemo(() => validate(form), [form]);

  const isFormValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const markAllTouched = () => {
    setTouched({
      phone: true,
      whatsappNumber: true,
      address: true,
      city: true,
      pincode: true,
      defaultSlotDurationMins: true,
      services: true,
    });
  };

  const saveProfile = async () => {
    setServerError("");

    // ✅ show all errors on submit
    markAllTouched();

    if (!isFormValid) return;

    try {
      setLoading(true);

      const payload = {
        ...form,
        phone: onlyDigits(form.phone),
        whatsappNumber: form.whatsappNumber ? onlyDigits(form.whatsappNumber) : "",
        pincode: onlyDigits(form.pincode),
        services: form.services
          ? form.services
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
      };

      const res = await axios.put(`${API}/profile`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("✅ Profile completed successfully!");
      navigate("/dashboard");
    } catch (err) {
      setServerError(err?.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Input base classes
  const inputBase =
    "w-full px-4 py-3 rounded-2xl border bg-white text-sm text-[#131720] outline-none shadow-sm transition";

  const inputFocus =
    "focus:border-[#12a588] focus:ring-4 focus:ring-[#12a588]/10";

  const inputError =
    "border-red-300 focus:border-red-500 focus:ring-red-500/10";

  const inputNormal = "border-slate-200";

  const errorText = "text-xs text-red-500 mt-1 font-medium";

  return (
    <div className="min-h-screen bg-[#F6F8FC] overflow-x-hidden">
      <Navbar />

      <div className="pt-28 mx-auto max-w-7xl px-4 md:px-8 flex justify-center">
        <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl p-6 sm:p-8 shadow-[0_25px_70px_-40px_rgba(0,0,0,0.25)]">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#131720]">
            Complete Your Profile
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Dashboard unlock karne ke liye ye details required hain ✅
          </p>

          {/* ✅ server error */}
          {serverError && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600 font-semibold">{serverError}</p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ✅ Phone */}
            <div>
              <input
                className={`${inputBase} ${
                  touched.phone && errors.phone ? inputError : inputNormal
                } ${inputFocus}`}
                placeholder="Phone Number *"
                value={form.phone}
                onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
                onChange={(e) => {
                  setForm({ ...form, phone: onlyDigits(e.target.value).slice(0, 10) });
                }}
              />
              {touched.phone && errors.phone && (
                <p className={errorText}>{errors.phone}</p>
              )}
            </div>

            {/* ✅ WhatsApp */}
            <div>
              <input
                className={`${inputBase} ${
                  touched.whatsappNumber && errors.whatsappNumber
                    ? inputError
                    : inputNormal
                } ${inputFocus}`}
                placeholder="WhatsApp Number (optional)"
                value={form.whatsappNumber}
                onBlur={() => setTouched((p) => ({ ...p, whatsappNumber: true }))}
                onChange={(e) => {
                  setForm({
                    ...form,
                    whatsappNumber: onlyDigits(e.target.value).slice(0, 10),
                  });
                }}
              />
              {touched.whatsappNumber && errors.whatsappNumber && (
                <p className={errorText}>{errors.whatsappNumber}</p>
              )}
            </div>

            {/* ✅ Address */}
            <div className="md:col-span-2">
              <input
                className={`${inputBase} ${
                  touched.address && errors.address ? inputError : inputNormal
                } ${inputFocus}`}
                placeholder="Clinic Address *"
                value={form.address}
                onBlur={() => setTouched((p) => ({ ...p, address: true }))}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              {touched.address && errors.address && (
                <p className={errorText}>{errors.address}</p>
              )}
            </div>

            {/* ✅ City */}
            <div>
              <input
                className={`${inputBase} ${
                  touched.city && errors.city ? inputError : inputNormal
                } ${inputFocus}`}
                placeholder="City *"
                value={form.city}
                onBlur={() => setTouched((p) => ({ ...p, city: true }))}
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value.replace(/\s{2,}/g, " ") })
                }
              />
              {touched.city && errors.city && (
                <p className={errorText}>{errors.city}</p>
              )}
            </div>

            {/* ✅ Pincode */}
            <div>
              <input
                className={`${inputBase} ${
                  touched.pincode && errors.pincode ? inputError : inputNormal
                } ${inputFocus}`}
                placeholder="Pincode *"
                value={form.pincode}
                onBlur={() => setTouched((p) => ({ ...p, pincode: true }))}
                onChange={(e) =>
                  setForm({
                    ...form,
                    pincode: onlyDigits(e.target.value).slice(0, 6),
                  })
                }
              />
              {touched.pincode && errors.pincode && (
                <p className={errorText}>{errors.pincode}</p>
              )}
            </div>

            {/* ✅ Slot duration */}
            <div>
              <select
                className={`${inputBase} ${
                  touched.defaultSlotDurationMins && errors.defaultSlotDurationMins
                    ? inputError
                    : inputNormal
                } ${inputFocus} cursor-pointer`}
                value={form.defaultSlotDurationMins}
                onBlur={() =>
                  setTouched((p) => ({ ...p, defaultSlotDurationMins: true }))
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    defaultSlotDurationMins: Number(e.target.value),
                  })
                }
              >
                <option value={10}>10 mins</option>
                <option value={15}>15 mins</option>
                <option value={20}>20 mins</option>
                <option value={30}>30 mins</option>
              </select>

              {touched.defaultSlotDurationMins && errors.defaultSlotDurationMins && (
                <p className={errorText}>{errors.defaultSlotDurationMins}</p>
              )}
            </div>

            {/* ✅ Services */}
            <div className="md:col-span-2">
              <input
                className={`${inputBase} ${
                  touched.services && errors.services ? inputError : inputNormal
                } ${inputFocus}`}
                placeholder="Services (comma separated) e.g. Root Canal, Braces"
                value={form.services}
                onBlur={() => setTouched((p) => ({ ...p, services: true }))}
                onChange={(e) => setForm({ ...form, services: e.target.value })}
              />
              {touched.services && errors.services && (
                <p className={errorText}>{errors.services}</p>
              )}
              <p className="text-[11px] text-slate-400 mt-1">
                Example: Root Canal, Braces, Teeth Cleaning
              </p>
            </div>

            {/* ✅ Save Button */}
            <div className="md:col-span-2">
              <button
                onClick={saveProfile}
                disabled={loading || !isFormValid}
                className="
                  w-full inline-flex items-center justify-center
                  rounded-2xl px-6 py-3.5 text-sm sm:text-base font-semibold text-white
                  bg-gradient-to-r from-[#12a588] to-[#18c4a1]
                  shadow-[0_18px_45px_-22px_rgba(18,165,136,0.70)]
                  hover:shadow-[0_26px_75px_-30px_rgba(18,165,136,0.95)]
                  hover:opacity-95 transition-all duration-200
                  active:scale-[0.98]
                  disabled:opacity-60 disabled:cursor-not-allowed
                  cursor-pointer
                "
              >
                {loading ? "Saving..." : "Save & Continue"}
              </button>

              {!loading && !isFormValid && (
                <p className="text-xs text-slate-500 mt-2 text-center">
                  ⚠️ Please fill all required fields correctly
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
