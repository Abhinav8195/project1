import { useEffect, useState } from "react";
import { Menu, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("#");
  const navigate = useNavigate();

  // ✅ active link (scroll spy lite)
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);

    const onScroll = () => {
      let current = "#";
      sections.forEach((sec) => {
        const top = sec.offsetTop - 120;
        const bottom = top + sec.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
          current = `#${sec.id}`;
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkVariants = {
    hidden: { opacity: 0, y: -8 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 + i * 0.06, duration: 0.35, ease: "easeOut" },
    }),
  };

  const mobileMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    show: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.35, ease: "easeInOut" },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeInOut" },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -12 },
    show: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.05 + i * 0.06, duration: 0.25 },
    }),
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* ✅ glass bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/70">
        <div className="mx-auto max-w-8xl px-4 sm:px-8 lg:px-12">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* ✅ Logo */}
            <motion.a
                 onClick={() => navigate("/")}
              className="flex items-center gap-3 group select-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
            >
              <motion.div
                className="w-10 h-10 rounded-2xl bg-[#12a588] flex items-center justify-center shadow-sm group-hover:shadow-md transition-all"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.35, ease: "easeOut" }}
              >
                <Calendar className="w-5 h-5 text-white" />
              </motion.div>

              <motion.span
                className="text-xl md:text-xl font-bold tracking-tight text-slate-900"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.35 }}
              >
                Reserva
              </motion.span>
            </motion.a>

            {/* ✅ Desktop Links */}
            <div className="hidden md:flex items-center gap-7 lg:gap-10">
              {navLinks.map((link, i) => {
                const isActive = active === link.href;

                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="show"
                    className={`relative text-[14px] font-semibold tracking-wide transition-colors group
                      ${
                        isActive
                          ? "text-[#12a588]"
                          : "text-slate-600 hover:text-[#12a588]"
                      }
                    `}
                  >
                    {link.label}

                    {/* underline animation */}
                    <span
                      className={`absolute left-0 -bottom-2 h-[2px] rounded-full bg-[#12a588] transition-all duration-300
                        ${
                          isActive
                            ? "w-full opacity-100"
                            : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                        }
                      `}
                    />
                  </motion.a>
                );
              })}
            </div>

            {/* ✅ Desktop Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {/* Login button (ghost) */}
              <motion.button
                whileHover={{ y: -1 }}
                   onClick={() => navigate("/login")}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold
                text-slate-700 hover:text-[#12a588] hover:bg-green-50 transition-all duration-200 cursor-pointer"
              >
                Login
              </motion.button>

              {/* Start Free Trial (primary gradient) */}
              <motion.button
                whileHover={{ y: -1, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={()=>navigate("/start-free-trial")}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white
                bg-gradient-to-r from-[#12a588] to-[#18c4a1]
                shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-200"
              >
                Start Free Trial
              </motion.button>
            </div>

            {/* ✅ Mobile Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-slate-800" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-slate-800" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* ✅ Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="md:hidden overflow-hidden pb-4"
              >
                <div className="flex flex-col gap-3 pt-2">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      custom={i}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="show"
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-2 rounded-xl font-semibold text-slate-700 
                      hover:bg-gradient-to-r hover:from-[#12a588] hover:to-[#18c4a1]
                      hover:text-white transition-all duration-300"
                    >
                      {link.label}
                    </motion.a>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.25 }}
                    className="pt-3 border-t border-slate-200 flex flex-col gap-2"
                  >
                    {/* Mobile login outline */}
                    <button
      onClick={() => navigate("/login")}
      className="w-full inline-flex items-center justify-center rounded-xl py-3 text-sm font-semibold
      border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 transition-all duration-200
      cursor-pointer"
    >
      Login
    </button>

                    {/* Mobile start trial primary */}
                    <button
                    onClick={()=>navigate("/start-free-trial")}
                      className="w-full inline-flex items-center justify-center rounded-xl py-3 text-sm font-semibold text-white
                      bg-gradient-to-r from-[#12a588] to-[#18c4a1]
                      shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-200 active:scale-[0.98]"
                    >
                      Start Free Trial
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* end mobile */}
        </div>
      </div>
    </motion.nav>
  );
}
