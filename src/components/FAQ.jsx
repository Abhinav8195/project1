import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Can patients book from their mobile phones?",
    answer:
      "Absolutely! Our booking page is fully responsive and works seamlessly on smartphones, tablets, and desktops. Patients can book appointments in just a few taps.",
  },
  {
    question: "How does slot generation work?",
    answer:
      "You set your working hours and appointment duration (15, 20, or 30 minutes), and our system automatically generates available time slots. It also accounts for breaks and lunch hours you configure.",
  },
  {
    question: "Can I disable booking temporarily (Vacation Mode)?",
    answer:
      "Yes! You can enable Vacation Mode to block all bookings during specific dates. You can also block specific days or hours without affecting your regular schedule.",
  },
  {
    question: "Do you support WhatsApp reminders?",
    answer:
      "Yes, our Pro and Clinic plans include automated WhatsApp reminders. Patients receive a booking confirmation and a reminder 24 hours before their appointment, reducing no-shows significantly.",
  },
  {
    question: "Can I manage multiple doctors in one clinic?",
    answer:
      "With our Clinic plan, you can add up to 10 doctors, each with their own schedule and booking page. The team calendar view lets you see everyone's appointments at a glance.",
  },
  {
    question: "Is patient data secure?",
    answer:
      "Security is our top priority. All data is encrypted in transit and at rest. We're fully GDPR compliant and offer HIPAA compliance on our Clinic plan. Your patient data is never shared with third parties.",
  },
];

const easeOut = [0.16, 1, 0.3, 1];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-14 sm:py-20 bg-[#F6F8FC] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* ✅ Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-[#12a588]/10 text-[#12a588] border border-[#12a588]/15">
            FAQ
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#131720]">
            Frequently asked questions
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            Got questions? We’ve got answers. If you can’t find what you’re
            looking for, feel free to contact our support team.
          </p>
        </motion.div>

        {/* ✅ FAQ Grid */}
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  ease: easeOut,
                  delay: index * 0.03,
                }}
                className={`
                  relative overflow-hidden rounded-3xl border
                  ${isOpen ? "border-[#12a588]/25" : "border-slate-200"}
                  bg-white/85 backdrop-blur-xl
                  shadow-[0_18px_55px_-45px_rgba(0,0,0,0.35)]
                  transition-all duration-300
                `}
              >
                {/* ✅ Left glow line */}
                <div
                  className={`
                    absolute left-0 top-0 h-full w-[3px]
                    ${
                      isOpen
                        ? "bg-gradient-to-b from-[#12a588] to-[#18c4a1]"
                        : "bg-transparent"
                    }
                    transition-all duration-300
                  `}
                />

                {/* ✅ Top Row */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-5 sm:px-6 py-5 flex items-start gap-4 cursor-pointer"
                >
                  {/* ✅ Minimal Dot */}
                  <div
                    className={`
                      mt-2 w-3 h-3 rounded-full shrink-0
                      ${isOpen ? "bg-[#12a588]" : "bg-slate-300"}
                    `}
                  />

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`
                        text-[14px] sm:text-[15px] font-semibold leading-snug
                        ${isOpen ? "text-[#12a588]" : "text-[#131720]"}
                        transition-colors duration-200
                      `}
                    >
                      {faq.question}
                    </p>

                    <p className="text-[12px] sm:text-[13px] text-gray-500 mt-1">
                      Tap to view answer
                    </p>
                  </div>

                  {/* ✅ Toggle (+ / -) without icons */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: easeOut }}
                    className={`
                      w-10 h-10 rounded-2xl flex items-center justify-center shrink-0
                      ${isOpen ? "bg-[#12a588] text-white" : "bg-slate-100 text-slate-700"}
                      transition-colors duration-200
                      text-xl font-bold
                    `}
                  >
                    {isOpen ? "−" : "+"}
                  </motion.div>
                </button>

                {/* ✅ Smooth Expand */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: easeOut }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-0">
                        <p className="text-[13px] sm:text-[14px] leading-relaxed text-gray-600">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
