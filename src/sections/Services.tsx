import {
  BadgePercent,
  GraduationCap,
  Laptop,
  MonitorCog,
  Smartphone,
  Tv,
} from "lucide-react";
import { useReveal } from "../utils/useReveal";

const services = [
  {
    title: "Ремонт ноутбуков",
    subtitle: "Диагностика, чистка и восстановление любой сложности",
    icon: Laptop,
    does: [
      "Чистка от пыли, замена термопасты, ремонт охлаждения",
      "Установка Windows, удаление вирусов",
      "Замена SSD / жёсткого диска, клавиатуры и матрицы",
    ],
    when: "Ноутбук шумит, греется, не заряжается, появились битые пиксели или сломалась клавиатура.",
  },
  {
    title: "Ремонт компьютеров",
    subtitle: "Настройка и апгрейд системных блоков для игр и работы",
    icon: MonitorCog,
    does: [
      "Чистка, термопаста, обслуживание блока питания и кулеров",
      "Установка Windows, удаление вирусов",
      "Замена диска, подбор комплектующих для апгрейда",
    ],
    when: "Зависания, синие экраны, перегрев или низкая производительность.",
  },
  {
    title: "Ремонт смартфонов iPhone / Android",
    subtitle: "Замена дисплея, аккумулятора, гнезда зарядки и прошивка ПО",
    icon: Smartphone,
    does: [
      "Замена АКБ, включая вздутые",
      "Дисплеи LCD / AMOLED — оригинал или копия",
      "Гнёзда зарядки MicroUSB / Type-C, проблемы со звуком",
      "Комплексная чистка, разблокировка FRP (Google, Mi, Samsung)",
    ],
    when: "Телефон быстро разряжается, разбит экран, пропал звук, зависает на логотипе или заблокирован после сброса.",
  },
  {
    title: "Ремонт телевизоров",
    subtitle: "Диагностика бесплатно при заказе ремонта — без скрытых сюрпризов",
    icon: Tv,
    does: [
      "Замена подсветки, блока питания, инвертора",
      "Лёгкий ремонт материнской платы",
      "Настройка каналов, Smart TV и цифровых приставок",
    ],
    when: "Пропало изображение, но звук есть; телевизор не включается или сам выключается.",
  },
  {
    title: "Обучение и настройка",
    subtitle: "Поможем освоить смартфон, ноутбук и планшет — с выездом на дом",
    icon: GraduationCap,
    badge: "Пенсионерам — скидка 20%",
    does: [
      "Обучение с подробной инструкцией, простым языком",
      "Настройка почты, мессенджеров и Госуслуг",
      "Консультация с демонстрацией до 30 минут",
    ],
    when: "Для тех, кто только осваивает цифровые устройства или хочет настроить важные сервисы.",
    centered: true,
  },
];

export default function Services() {
  const headerRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="services"
      className="relative scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24 lg:py-28"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <div ref={headerRef} className="reveal mb-8 max-w-2xl sm:mb-12">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-accent-soft">
            {"// сервис Ревенант"}
          </p>

          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-white min-[390px]:text-4xl sm:text-5xl">
            Ремонт техники с гарантией
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Понятная диагностика, аккуратная работа и решение, которое
            продлевает жизнь устройству.
          </p>
        </div>

        <div
          ref={gridRef}
          className="reveal grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className={`group relative flex flex-col rounded-card border border-hairline bg-surface-1 p-5 shadow-e1 transition duration-300 hover:-translate-y-1 hover:border-hairline-strong sm:p-6 ${
                  service.centered ? "md:col-span-2 md:mx-auto md:w-full md:max-w-2xl" : ""
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-control border border-accent/25 bg-accent/10 text-accent-soft">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <h3 className="text-pretty text-xl font-semibold leading-snug text-white sm:text-2xl">
                    {service.title}
                  </h3>
                </div>

                <p className="mt-3 text-[15px] leading-relaxed text-white/70 sm:text-base">
                  {service.subtitle}
                </p>

                {service.badge && (
                  <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.08em] text-amber-200">
                    <BadgePercent size={14} />
                    {service.badge}
                  </span>
                )}

                <ul className="mt-4 space-y-2">
                  {service.does.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-[15px] leading-relaxed text-white/85 sm:text-base"
                    >
                      {/* Квадратный «пиксель» — как звёзды на фоне */}
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] size-1.5 shrink-0 bg-accent/80"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5">
                  <div className="rounded-control border border-hairline bg-surface-2 p-3.5">
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
                      {"// когда обращаться"}
                    </p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-white/80">
                      {service.when}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
