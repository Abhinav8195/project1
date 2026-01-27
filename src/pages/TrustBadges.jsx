import { Building2, Stethoscope, Heart, Activity } from "lucide-react";

const brands = [
  { name: "HealthFirst Clinic", icon: Building2 },
  { name: "Dr. Smith Practice", icon: Stethoscope },
  { name: "City Dental Care", icon: Heart },
  { name: "MedCenter Plus", icon: Activity },
];

export default function TrustBadges() {
  return (
    <section className="py-12 md:py-16 border-y border-slate-300 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <p className="text-center text-gray-500 text-xs sm:text-sm font-semibold tracking-widest mb-8 font-[Inter]">
          TRUSTED BY CLINICS & DOCTORS WORLDWIDE
        </p>

        {/* ✅ Mobile = 2 col grid | Desktop = flex row */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-x-10 sm:gap-y-8">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3
              text-gray-500 hover:text-[#12a588] hover:border-[#12a588]/30 hover:bg-[#12a588]/5
              transition-all duration-200 font-[Inter]"
            >
              <brand.icon className="w-5 h-5" />
              <span className="text-sm sm:text-base font-semibold">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
