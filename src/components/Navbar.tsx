import { ArrowRight, Phone, Wrench } from "lucide-react";
import { scrollToSection } from "../utils/smoothScroll";

/**
 * Нижняя мобильная панель. Три прямых действия без вложенного меню:
 * позвонить, оставить заявку, посмотреть услуги.
 */
export default function Navbar() {
  return (
    <header className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+14px)] sm:px-6 lg:hidden">
      <div className="mx-auto w-full max-w-md sm:max-w-lg">
        <div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-canvas/75 p-2 shadow-[0_16px_56px_rgba(0,0,0,0.44)] backdrop-blur-2xl">
          <div className="relative grid grid-cols-3 gap-2">
            <a
              href="tel:+73852000000"
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-[26px] border border-hairline bg-surface-2 text-white transition hover:border-hairline-strong active:scale-[0.97]"
            >
              <Phone size={21} strokeWidth={1.9} className="text-accent-soft" />
              <span className="text-[13px] font-medium leading-none">Позвонить</span>
            </a>

            <a
              href="#request"
              onClick={(event) => scrollToSection(event, "#request")}
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-[26px] bg-accent text-canvas transition hover:bg-accent-strong active:scale-[0.97]"
            >
              <ArrowRight size={21} strokeWidth={2} className="-rotate-45" />
              <span className="text-[13px] font-semibold leading-none">Записаться</span>
            </a>

            <a
              href="#services"
              onClick={(event) => scrollToSection(event, "#services")}
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-[26px] border border-hairline bg-surface-2 text-white transition hover:border-hairline-strong active:scale-[0.97]"
            >
              <Wrench size={21} strokeWidth={1.9} className="text-accent-soft" />
              <span className="text-[13px] font-medium leading-none">Услуги</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
