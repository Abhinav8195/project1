import { Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "₹0",
    period: "14-day trial",
    description: "Try Reserva free for your clinic",
    features: [
      "Online booking page + link",
      "Up to 50 bookings / month",
      "Email confirmations",
      "Basic dashboard",
      "1 doctor account",
      "Basic support",
    ],
    popular: false,
    buttonText: "Start Free Trial",
    variant: "outline",
  },
  {
    name: "Pro",
    price: "₹999",
    period: "/month",
    description: "Best for single doctor clinics",
    features: [
      "Unlimited bookings",
      "WhatsApp + Email alerts",
      "Auto slot generation",
      "QR code booking",
      "Patient details & notes",
      "No-show reduction tools",
      "Priority support",
    ],
    popular: true,
    buttonText: "Choose Pro",
    variant: "primary",
  },
  {
    name: "Clinic",
    price: "₹2,499",
    period: "/month",
    description: "Perfect for multi-doctor clinics",
    features: [
      "Everything in Pro",
      "Up to 10 doctors",
      "Team schedule calendar",
      "Advanced analytics",
      "Custom branding",
      "Multiple clinic staff access",
      "Dedicated support",
    ],
    popular: false,
    buttonText: "Contact Sales",
    variant: "outline",
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <section
      id="pricing"
      className="relative py-14 sm:py-20 bg-[#F6F8FC] overflow-hidden"
    >
      {/* ✅ Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[#12a588]/12 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-[#18c4a1]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* ✅ Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center justify-center rounded-full px-4 py-2 text-[11px] sm:text-xs font-semibold tracking-widest uppercase bg-white border border-slate-200 text-[#12a588] shadow-sm">
            Pricing
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#131720]">
            Simple pricing for Indian clinics
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
            WhatsApp reminders + smart booking = fewer no-shows.
            <span className="text-[#131720] font-semibold"> Cancel anytime.</span>
          </p>
        </div>

        {/* ✅ Cards */}
        <div
          className="
            grid gap-6 sm:gap-8
            md:grid-cols-3
            max-w-6xl mx-auto
            items-stretch
          "
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`
                relative w-full
                rounded-3xl border
                p-6 sm:p-8
                overflow-hidden
                transition-all duration-300
                ${
                  plan.popular
                    ? "bg-[#12a588] border-[#12a588] text-white shadow-[0_30px_80px_-50px_rgba(18,165,136,0.75)]"
                    : "bg-white/80 backdrop-blur-xl border-slate-200 text-[#131720] shadow-[0_20px_60px_-45px_rgba(0,0,0,0.25)]"
                }
              `}
            >
              {/* ✅ Popular Badge */}
              {plan.popular && (
                <div className="absolute top-5 right-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400 text-yellow-900 px-3 py-1 text-xs font-bold shadow-sm">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* ✅ Top gradient strip on normal cards */}
              {!plan.popular && (
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#12a588] to-[#18c4a1]" />
              )}

              {/* ✅ Header */}
              <div className="mb-6">
                <h3
                  className={`text-lg sm:text-xl font-extrabold tracking-tight ${
                    plan.popular ? "text-white" : "text-[#131720]"
                  }`}
                >
                  {plan.name}
                </h3>

                <p
                  className={`mt-2 text-sm ${
                    plan.popular ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mt-5 flex items-end gap-2">
                  <span
                    className={`text-4xl sm:text-5xl font-extrabold leading-none ${
                      plan.popular ? "text-white" : "text-[#131720]"
                    }`}
                  >
                    {plan.price}
                  </span>

                  <span
                    className={`text-sm font-semibold mb-1 ${
                      plan.popular ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* ✅ Divider */}
              <div
                className={`h-px w-full mb-6 ${
                  plan.popular ? "bg-white/25" : "bg-slate-200"
                }`}
              />

              {/* ✅ Features */}
              <ul className="space-y-3 sm:space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
                        plan.popular ? "bg-white/15" : "bg-[#12a588]/10"
                      }`}
                    >
                      <Check
                        className={`w-3.5 h-3.5 ${
                          plan.popular ? "text-white" : "text-[#12a588]"
                        }`}
                      />
                    </div>

                    <p
                      className={`text-sm leading-relaxed ${
                        plan.popular ? "text-white" : "text-gray-600"
                      }`}
                    >
                      {feature}
                    </p>
                  </li>
                ))}
              </ul>

              {/* ✅ Button */}
              <div className="mt-7">
                <button
                  onClick={() => navigate("/start-free-trial")}
                  className={`
                    w-full inline-flex items-center justify-center
                    rounded-2xl px-6 py-3.5
                    text-sm font-bold
                    transition-all duration-200
                    active:scale-[0.98]
                    cursor-pointer
                    ${
                      plan.variant === "primary"
                        ? "bg-white text-[#12a588] shadow-md hover:shadow-lg hover:opacity-95"
                        : plan.popular
                        ? "border border-white/45 text-white hover:bg-white/10"
                        : "border border-[#12a588]/25 text-[#12a588] bg-white hover:bg-gradient-to-r hover:bg-green-50 hover:text-[#12a588]"
                    }
                  `}
                >
                  {plan.buttonText}
                </button>

                {/* ✅ small note */}
                <p
                  className={`mt-3 text-[11px] text-center ${
                    plan.popular ? "text-white/70" : "text-gray-400"
                  }`}
                >
                  No credit card required
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ extra note */}
        <div className="text-center mt-10 text-sm text-gray-500">
          Need yearly pricing or enterprise?{" "}
          <span className="text-[#12a588] font-semibold cursor-pointer hover:underline">
            Talk to us
          </span>
        </div>
      </div>
    </section>
  );
}
