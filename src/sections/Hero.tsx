import { motion } from "framer-motion";
import {
  ArrowRight,
  Computer,
  Laptop,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smartphone,
  Tv,
  Zap,
} from "lucide-react";
import { scrollToSection } from "../utils/smoothScroll";

const buttonTap = {
  scale: 0.96,
  y: 1,
};

const deviceIcons = [Smartphone, Computer, Tv, Laptop];

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="relative z-10 flex min-h-[100svh] items-start justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+120px)] pt-[calc(env(safe-area-inset-top)+10px)] sm:items-center sm:px-6 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 130, damping: 22 }}
          className="w-full max-w-md sm:max-w-4xl"
        >
          <div className="relative flex min-h-[min(74svh,680px)] w-full flex-col justify-between overflow-hidden rounded-[28px] border border-white/15 bg-slate-950/45 px-5 py-5 shadow-[0_34px_110px_rgba(0,0,0,0.72)] backdrop-blur-2xl supports-[backdrop-filter]:bg-slate-950/35 min-[390px]:px-6 min-[390px]:py-6 sm:min-h-[620px] sm:px-8 sm:py-8">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-blue-500/8 to-purple-500/14" />
            <div className="pointer-events-none absolute inset-x-7 top-0 h-px bg-white/35" />
            <div className="pointer-events-none absolute -left-24 -top-24 size-64 rounded-full bg-blue-500/15 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 size-64 rounded-full bg-purple-500/15 blur-[110px]" />

            <div className="relative">
              <div className="mb-5 flex items-center justify-between gap-3 min-[390px]:mb-6 sm:mb-8">
                <div className="flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 text-[10px] uppercase tracking-[0.18em] text-white/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl min-[390px]:text-xs">
                  <MapPin size={14} className="text-blue-300" />
                  <span>Барнаул</span>
                </div>

                <div className="flex shrink-0 gap-1.5 rounded-full border border-white/10 bg-white/[0.05] p-1.5 backdrop-blur-xl">
                  {deviceIcons.map((Icon) => (
                    <span
                      key={Icon.displayName}
                      className="flex size-8 items-center justify-center rounded-full bg-white/[0.06] text-white/55"
                    >
                      <Icon size={15} />
                    </span>
                  ))}
                </div>
              </div>

              <div className="mx-auto max-w-2xl text-center">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.6 }}
                  className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-blue-200/70"
                >
                  Ремонт цифровой техники
                </motion.p>

                <h1 className="text-[clamp(3.05rem,17vw,4.65rem)] font-light leading-[0.9] tracking-tight text-white sm:text-7xl">
                  <motion.span
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12, duration: 0.65 }}
                    className="inline-block"
                  >
                    RE
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.86 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.65 }}
                    className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {" "}VENANT
                  </motion.span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.65 }}
                  className="mx-auto mt-4 max-w-xl text-balance text-[15px] leading-snug text-white/72 min-[390px]:text-base sm:text-lg sm:leading-relaxed"
                >
                  Профессиональный ремонт ПК, телефонов и цифровой техники.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36, duration: 0.65 }}
                  className="mx-auto mt-1 max-w-lg text-balance text-sm leading-snug text-white/48 min-[390px]:text-[15px] sm:text-base"
                >
                  Диагностика, замена комплектующих и понятная цена до начала работ.
                </motion.p>
              </div>
            </div>

            <div className="relative mt-6 min-[390px]:mt-7 sm:mt-10">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.46, duration: 0.65 }}
                className="grid grid-cols-[1fr_auto_auto] gap-2.5"
              >
                <motion.a
                  href="#request"
                  whileTap={buttonTap}
                  onClick={(event) => scrollToSection(event, "#request")}
                  className="group relative flex min-h-14 items-center justify-center overflow-hidden rounded-[24px] border border-white/15 bg-gradient-to-r from-blue-600/35 to-purple-600/35 px-5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_14px_34px_rgba(59,130,246,0.2)] backdrop-blur-xl transition hover:from-blue-500/40 hover:to-purple-500/40 min-[390px]:text-base"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/12 via-transparent to-white/8 opacity-80" />
                  <span className="relative flex items-center gap-2">
                    Записаться
                    <ArrowRight
                      size={18}
                      className="-rotate-45 transition-transform duration-300 group-hover:rotate-0"
                    />
                  </span>
                </motion.a>

                <motion.a
                  href="tel:+73852000000"
                  whileTap={buttonTap}
                  aria-label="Позвонить"
                  className="flex size-14 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-blue-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl transition hover:bg-blue-500/15"
                >
                  <Phone size={22} strokeWidth={1.9} />
                </motion.a>

                <motion.a
                  href="#request"
                  whileTap={buttonTap}
                  aria-label="Написать"
                  onClick={(event) => scrollToSection(event, "#request")}
                  className="flex size-14 items-center justify-center rounded-full border border-purple-400/20 bg-purple-500/10 text-purple-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl transition hover:bg-purple-500/15"
                >
                  <MessageCircle size={22} strokeWidth={1.9} />
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.58, duration: 0.7 }}
                className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3"
              >
                <div className="flex min-h-16 items-start gap-3 rounded-[20px] border border-blue-400/20 bg-blue-500/8 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
                  <ShieldCheck size={21} className="mt-0.5 shrink-0 text-blue-300" />
                  <div>
                    <h3 className="text-sm font-medium leading-tight text-white">
                      Честный ремонт
                    </h3>
                    <p className="mt-1 text-xs leading-snug text-white/50">
                      Озвучиваем цену до ремонта - никаких "сюрпризов"
                    </p>
                  </div>
                </div>

                <div className="flex min-h-16 items-start gap-3 rounded-[20px] border border-amber-400/20 bg-amber-500/8 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
                  <Zap size={21} className="mt-0.5 shrink-0 text-amber-300" />
                  <div>
                    <h3 className="text-sm font-medium leading-tight text-white">
                      Пенсионерам скидка 20%
                    </h3>
                    <p className="mt-1 text-xs leading-snug text-white/50">
                      Мы ценим ваш бюджет
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
