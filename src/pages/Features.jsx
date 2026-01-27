import {
  Calendar,
  Clock,
  ShieldCheck,
  MessageSquare,
  QrCode,
  LayoutDashboard,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Online Booking Page",
    description:
      "Get a unique booking link for your clinic. Patients can book appointments 24/7 from any device.",
  },
  {
    icon: Clock,
    title: "Auto Slot Generation",
    description:
      "Set your availability and let the system generate 15, 20, or 30-minute slots automatically.",
  },
  {
    icon: ShieldCheck,
    title: "No Double Booking",
    description:
      "Smart conflict detection prevents overlapping appointments. Never double-book again.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Alerts",
    description:
      "Automated appointment reminders via WhatsApp reduce no-shows by up to 80%.",
  },
  {
    icon: QrCode,
    title: "QR Code Booking",
    description:
      "Generate a QR code for your clinic. Patients scan and book instantly from their phones.",
  },
  {
    icon: LayoutDashboard,
    title: "Doctor Dashboard",
    description:
      "View today's schedule, check patients in, and manage appointments from one simple dashboard.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-14 sm:py-20 bg-[#F6F8FC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* ✅ Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold tracking-widest uppercase
            bg-white border border-slate-200 text-[#12a588] shadow-sm">
            Features
          </span>

          <h2 className="mt-4 text-3xl sm:text-3xl md:text-3xl font-bold tracking-tight text-[#131720] leading-tight">
            Everything you need to manage appointments
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
            Powerful tools designed specifically for healthcare professionals.
            Save time, reduce no-shows, and delight your patients.
          </p>
        </div>

        {/* ✅ Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                group relative overflow-hidden rounded-3xl
                border border-slate-200 bg-white/80 backdrop-blur
                p-6 sm:p-7
                shadow-[0_18px_45px_-30px_rgba(0,0,0,0.25)]
                hover:shadow-[0_26px_60px_-36px_rgba(0,0,0,0.30)]
                transition-all duration-300
              "
            >
              {/* ✅ Soft Glow */}
              <div
                className="
                  pointer-events-none absolute -top-24 -right-24
                  h-44 w-44 rounded-full blur-3xl
                  bg-[#12a588]/15
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                "
              />

              {/* ✅ Top Strip Gradient */}
              <div
                className="
                  absolute inset-x-0 top-0 h-[3px]
                  bg-gradient-to-r from-[#12a588] to-[#18c4a1]
                  opacity-70
                "
              />

              {/* ✅ Icon */}
              <div
                className="
                  mb-5 inline-flex items-center justify-center
                  w-12 h-12 rounded-2xl
                  bg-[#12a588]/10 border border-[#12a588]/20
                  text-[#12a588]
                  group-hover:bg-gradient-to-r group-hover:from-[#12a588] group-hover:to-[#18c4a1]
                  group-hover:text-white
                  transition-all duration-300
                  shadow-sm
                "
              >
                <feature.icon className="w-6 h-6" />
              </div>

              {/* ✅ Title */}
              <h3 className="text-lg sm:text-xl font-bold text-[#131720] tracking-tight">
                {feature.title}
              </h3>

              {/* ✅ Description */}
              <p className="mt-2 text-sm sm:text-base text-gray-500 leading-relaxed">
                {feature.description}
              </p>

              {/* ✅ Hover underline */}
              <div className="mt-5 h-[2px] w-0 bg-gradient-to-r from-[#12a588] to-[#18c4a1] rounded-full group-hover:w-16 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
