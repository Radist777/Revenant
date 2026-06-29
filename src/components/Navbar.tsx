import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircle, Phone, ShieldCheck, Sparkles, Wrench, X } from "lucide-react";
import { useState } from "react";
import { scrollToSection } from "../utils/smoothScroll";

const menuItems = [
  {
    href: "#services",
    label: "Услуги",
    icon: Wrench,
  },
  {
    href: "#advantages",
    label: "Преимущества",
    icon: ShieldCheck,
  },
  {
    href: "#request",
    label: "Заявка",
    icon: Sparkles,
  },
];

const buttonTap = {
  scale: 0.94,
  y: 1,
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+14px)] sm:px-6">
      <div className="mx-auto flex w-full max-w-md flex-col items-stretch gap-2 sm:max-w-lg">
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, y: 18, scale: 0.96, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 14, scale: 0.97, filter: "blur(8px)" }}
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
              className="overflow-hidden rounded-[30px] border border-white/15 bg-slate-950/45 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl supports-[backdrop-filter]:bg-slate-950/35"
            >
              <div className="grid gap-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      whileTap={buttonTap}
                      onClick={(event) => {
                        scrollToSection(event, item.href);
                        setIsOpen(false);
                      }}
                      className="flex min-h-12 items-center gap-3 rounded-[22px] px-4 text-[15px] font-medium text-white transition hover:bg-white/10"
                    >
                      <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/25 to-purple-500/20 text-blue-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                        <Icon size={18} strokeWidth={1.9} />
                      </span>
                      <span>{item.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        <motion.div
          layout
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
          className="relative overflow-hidden rounded-[34px] border border-white/15 bg-slate-950/45 p-2 shadow-[0_18px_70px_rgba(0,0,0,0.48)] backdrop-blur-2xl supports-[backdrop-filter]:bg-slate-950/35"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-blue-500/10 to-purple-500/15" />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-white/35" />

          <div className="relative grid grid-cols-3 gap-2">
            <motion.a
              href="tel:+73852000000"
              whileTap={buttonTap}
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-[26px] border border-blue-400/20 bg-blue-500/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_6px_18px_rgba(59,130,246,0.14)] transition hover:bg-blue-500/15"
            >
              <Phone size={21} strokeWidth={1.9} className="text-blue-300" />
              <span className="text-[12px] font-medium leading-none">Позвонить</span>
            </motion.a>

            <motion.a
              href="#request"
              whileTap={buttonTap}
              onClick={(event) => scrollToSection(event, "#request")}
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-[26px] border border-purple-400/20 bg-purple-500/10 text-white transition hover:bg-purple-500/15"
            >
              <MessageCircle size={21} strokeWidth={1.9} className="text-purple-300" />
              <span className="text-[12px] font-medium leading-none">Написать</span>
            </motion.a>

            <motion.button
              type="button"
              whileTap={buttonTap}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
              onClick={() => setIsOpen((value) => !value)}
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-[26px] bg-gradient-to-r from-blue-600/70 to-purple-600/70 text-white shadow-[0_10px_24px_rgba(59,130,246,0.22)] transition hover:from-blue-500/75 hover:to-purple-500/75"
            >
              {isOpen ? (
                <X size={22} strokeWidth={1.9} />
              ) : (
                <Menu size={22} strokeWidth={1.9} />
              )}
              <span className="text-[12px] font-medium leading-none">Меню</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
