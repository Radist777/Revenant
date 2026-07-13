import {
  ArrowRight,
  BadgePercent,
  Computer,
  Laptop,
  MapPin,
  Phone,
  ShieldCheck,
  Smartphone,
  Tv,
} from "lucide-react";
import { scrollToSection } from "../utils/smoothScroll";
import { useReveal } from "../utils/useReveal";

const devices = [
  { label: "Смартфоны", icon: Smartphone },
  { label: "Компьютеры", icon: Computer },
  { label: "Телевизоры", icon: Tv },
  { label: "Ноутбуки", icon: Laptop },
];

export default function Hero() {
  const cardRef = useReveal<HTMLDivElement>();

  return (
    <section id="hero" className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="relative z-10 flex min-h-[100svh] items-start justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+120px)] pt-[calc(env(safe-area-inset-top)+16px)] sm:items-center sm:px-6 sm:py-16 lg:py-12">
        <div ref={cardRef} className="reveal w-full max-w-md sm:max-w-3xl">
          <div className="relative w-full overflow-hidden rounded-card border border-hairline bg-surface-1 px-5 py-6 shadow-e2 min-[390px]:px-6 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            {/* Один тонкий акцент сверху вместо стеклянных слоёв */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

            <div className="flex items-center justify-between gap-3">
              <div className="flex min-h-10 items-center gap-2 rounded-full border border-hairline bg-surface-2 px-3 font-mono text-xs uppercase tracking-[0.18em] text-white/85">
                <MapPin size={14} className="text-accent-soft" />
                <span>Барнаул</span>
              </div>

              <div className="flex shrink-0 gap-1.5 rounded-full border border-hairline bg-surface-2 p-1.5" aria-hidden="true">
                {devices.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    title={label}
                    className="flex size-8 items-center justify-center rounded-full bg-surface-1 text-white/70"
                  >
                    <Icon size={15} />
                  </span>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-2xl text-center sm:mt-10">
              <p className="font-mono text-sm font-medium uppercase tracking-[0.3em] text-accent-soft">
                Revenant
                <span
                  aria-hidden="true"
                  className="animate-cursor ml-1.5 inline-block h-[0.95em] w-[0.5em] translate-y-[0.14em] bg-accent"
                />
              </p>

              <h1 className="mt-4 text-balance text-[clamp(2.35rem,10vw,3.3rem)] font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Вернём технику к&nbsp;жизни
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/80 min-[390px]:text-[17px] sm:mt-6 sm:text-lg">
                Ремонт компьютеров, ноутбуков, смартфонов и телевизоров
                в&nbsp;Барнауле. Диагностика и понятная цена — до начала работ.
              </p>
            </div>

            <div className="relative mt-7 sm:mt-10">
              {/* На мобильных эти же действия всегда видны в нижней панели —
                  дублировать их в карточке не нужно */}
              <div className="hidden w-full max-w-xl grid-cols-[1fr_auto] gap-2.5 lg:mx-auto lg:grid">
                <a
                  href="#request"
                  onClick={(event) => scrollToSection(event, "#request")}
                  className="group flex min-h-14 items-center justify-center rounded-control bg-accent px-5 text-base font-semibold text-canvas shadow-e1 transition hover:bg-accent-strong active:scale-[0.98]"
                >
                  <span className="flex items-center gap-2">
                    Записаться
                    <ArrowRight
                      size={18}
                      className="-rotate-45 transition-transform duration-300 group-hover:rotate-0"
                    />
                  </span>
                </a>

                <a
                  href="tel:+73852000000"
                  className="flex min-h-14 items-center justify-center gap-2 rounded-control border border-hairline bg-surface-2 px-5 text-base font-medium text-white transition-colors hover:border-hairline-strong active:scale-[0.97]"
                >
                  <Phone size={20} strokeWidth={1.9} className="text-accent-soft" />
                  Позвонить
                </a>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:mt-3">
                <div className="flex min-h-16 items-start gap-3 rounded-control border border-hairline bg-surface-2 p-3">
                  <ShieldCheck size={21} className="mt-0.5 shrink-0 text-accent-soft" />
                  <div>
                    <p className="text-base font-medium leading-tight text-white">
                      Честный ремонт
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-white/75">
                      Озвучиваем цену до ремонта — никаких «сюрпризов».
                    </p>
                  </div>
                </div>

                <div className="flex min-h-16 items-start gap-3 rounded-control border border-hairline bg-surface-2 p-3">
                  <BadgePercent size={21} className="mt-0.5 shrink-0 text-amber-300" />
                  <div>
                    <p className="text-base font-medium leading-tight text-white">
                      Пенсионерам скидка 20%
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-white/75">
                      Мы ценим ваш бюджет.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
