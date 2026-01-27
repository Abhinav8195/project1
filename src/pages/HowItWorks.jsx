import { Settings, Link2, ClipboardCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Settings,
    step: "01",
    title: "Set Your Schedule",
    description:
      "Configure your clinic hours, break times, and appointment duration. It takes just 5 minutes.",
  },
  {
    icon: Link2,
    step: "02",
    title: "Share Your Booking Link",
    description:
      "Get a unique link or QR code. Share it on your website, social media, or print it for your clinic.",
  },
  {
    icon: ClipboardCheck,
    step: "03",
    title: "Manage & Confirm",
    description:
      "Review incoming bookings, confirm appointments, and manage your daily schedule from the dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 sm:py-20 bg-[#F6F8FC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* ✅ Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span
            className="
              inline-flex items-center justify-center
              rounded-full px-4 py-2
              text-xs font-semibold tracking-widest uppercase
              bg-white border border-slate-200 text-[#12a588]
              shadow-sm
            "
          >
            How It Works
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#131720] leading-tight">
            Get started in 3 simple steps
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
            From signup to your first booking in under 10 minutes. No technical
            skills required.
          </p>
        </div>

        {/* ✅ Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {/* ✅ Connecting line (Desktop only) */}
          <div
            className="
              hidden md:block absolute
              top-[46px] left-[14%] right-[14%]
              h-[2px]
              bg-gradient-to-r from-[#12a588]/10 via-[#12a588] to-[#12a588]/10
            "
          />

          {steps.map((step, index) => (
            <div
              key={index}
              className="
                group relative overflow-hidden
                rounded-3xl border border-slate-200
                bg-white/80 backdrop-blur
                shadow-[0_18px_45px_-30px_rgba(0,0,0,0.25)]
                hover:shadow-[0_26px_60px_-36px_rgba(0,0,0,0.30)]
                transition-all duration-300
                p-6 sm:p-7
              "
            >
              {/* ✅ Glow */}
              <div
                className="
                  pointer-events-none absolute -top-24 -right-24
                  h-44 w-44 rounded-full blur-3xl
                  bg-[#12a588]/15
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                "
              />

              {/* ✅ Top Strip */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#12a588] to-[#18c4a1] opacity-70" />

              {/* ✅ Icon + step */}
              <div className="flex items-center justify-between">
                <div
                  className="
                    w-12 h-12 rounded-2xl
                    bg-[#12a588]/10 border border-[#12a588]/20
                    text-[#12a588]
                    flex items-center justify-center
                    shadow-sm
                    group-hover:bg-gradient-to-r group-hover:from-[#12a588] group-hover:to-[#18c4a1]
                    group-hover:text-white
                    transition-all duration-300
                  "
                >
                  <step.icon className="w-6 h-6" />
                </div>

                <div
                  className="
                    px-3 py-1 rounded-full
                    text-xs font-bold tracking-widest
                    text-[#12a588]
                    bg-[#12a588]/10 border border-[#12a588]/15
                  "
                >
                  {step.step}
                </div>
              </div>

              {/* ✅ Content */}
              <h3 className="mt-5 text-lg sm:text-xl font-bold text-[#131720] tracking-tight">
                {step.title}
              </h3>

              <p className="mt-2 text-sm sm:text-base text-gray-500 leading-relaxed">
                {step.description}
              </p>

              {/* ✅ Mobile Arrow */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center mt-6">
                  <div
                    className="
                      w-10 h-10 rounded-full
                      bg-white border border-slate-200
                      flex items-center justify-center
                      shadow-sm
                    "
                  >
                    <ArrowRight className="w-5 h-5 text-[#12a588] rotate-90" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
