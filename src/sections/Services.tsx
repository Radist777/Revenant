import {
  BatteryCharging,
  Cpu,
  Laptop,
  MonitorCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tv,
} from "lucide-react";
import { useReveal } from "../utils/useReveal";

const services = [
  {
    title: "Ремонт ноутбуков",
    subtitle: "Диагностика, чистка и восстановление любой сложности",
    benefit: "Чистка от пыли, замена термопасты, обслуживание системы охлаждения — продлим жизнь вашему ноутбуку.",
    value: "Установка Windows, удаление вирусов, замена жёсткого диска / SSD, клавиатуры и матрицы экрана.",
    useful: "Идеально, если ноутбук шумит, греется, не заряжается, появились битые пиксели или сломалась клавиатура.",
    icon: Laptop,
    iconColor: "text-blue-200",
    accent: { chip: "border-blue-400/30 bg-blue-500/12", bar: "bg-blue-400/70" },
  },
  {
    title: "Ремонт компьютеров",
    subtitle: "Настройка и апгрейд системных блоков для игр и работы",
    benefit: "Чистка от пыли, замена термопасты, обслуживание блока питания и кулеров.",
    value: "Установка Windows, удаление вирусов, замена диска, подбор комплектующих для апгрейда.",
    useful: "Поможем при зависаниях, синих экранах, низкой производительности или перегреве.",
    icon: MonitorCog,
    iconColor: "text-purple-200",
    accent: { chip: "border-purple-400/30 bg-purple-500/12", bar: "bg-purple-400/70" },
  },
  {
    title: "Ремонт смартфонов iPhone/Android",
    subtitle: "Замена дисплея, аккумулятора, гнезда зарядки и прошивка ПО",
    benefit: "Заменяем АКБ (включая вздутые), дисплеи (LCD/AMOLED, оригинал или копия), гнёзда зарядки (MicroUSB/Type‑C), устраняем проблемы со звуком, а также проводим комплексную чистку и разблокировку FRP (Google, Mi, Samsung).",
    value: "Вы получаете полностью рабочий телефон с гарантией, чистотой внутри и оптимизированной системой — готовой к повседневной эксплуатации.",
    useful: "Обращайтесь, если телефон быстро разряжается, не заряжается, разбит экран, пропал звук, зависает на логотипе или заблокирован после сброса до заводских настроек.",
    icon: Smartphone,
    iconColor: "text-cyan-200",
    accent: { chip: "border-cyan-400/30 bg-cyan-500/12", bar: "bg-cyan-400/70" },
  },
  {
    title: "Телевизоры",
    subtitle: "Бесплатная диагностика и ремонт без скрытых сюрпризов",
    benefit: "Замена подсветки (LED‑ленты), блока питания, инвертора, легкий ремонт материнской платы, настройка каналов, звука, изображения, обновление прошивки Smart TV и настройка цифровых приставок.",
    value: "Диагностика – бесплатно при заказе ремонта. Вы получаете рабочий телевизор с понятным счётом и гарантией на выполненные работы.",
    useful: "Поможем, если пропало изображение, но звук есть, телевизор не включается или сам выключается.",
    icon: Tv,
    iconColor: "text-amber-200",
    accent: { chip: "border-amber-400/30 bg-amber-500/12", bar: "bg-amber-400/70" },
  },
  {
    title: "Обучение и настройка",
    subtitle: "Поможем освоить смартфон, ноутбук и планшет — с выездом на дом",
    benefit: "Обучение пользованию смартфоном, ноутбуком/планшетом c подробной инструкцией. Настройка почты, мессенджеров, портала Госуслуги (1 устройство). Консультация с демонстрацией до 30 минут.",
    value: "Выезд на дом, индивидуальный подход, объясняем простым языком. Для пенсионеров — скидка 20% на ремонт при заказе в тот же день.",
    useful: "Отлично подходит для пожилых людей и тех, кто только начинает осваивать цифровые устройства или хочет настроить важные сервисы.",
    icon: ShieldCheck,
    iconColor: "text-emerald-200",
    accent: { chip: "border-emerald-400/30 bg-emerald-500/12", bar: "bg-emerald-400/70" },
    centered: true,
  },
];

export default function Services() {
  const headerRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="services"
      className="relative scroll-mt-24 px-4 py-16 pb-[calc(env(safe-area-inset-bottom)+92px)] sm:px-6 sm:py-24 sm:pb-36 lg:py-28 lg:pb-40"
    >
      <div className="relative mx-auto w-full max-w-7xl">
        <div ref={headerRef} className="reveal mb-6 max-w-2xl sm:mb-9">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-1 px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-blue-100/90">
            <Sparkles size={15} className="text-blue-300" />
            Сервис Ревенант
          </div>

          <h2 className="text-balance text-3xl font-light leading-tight tracking-normal text-white min-[390px]:text-4xl sm:text-5xl">
            Ремонт техники с гарантией
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Понятная диагностика, аккуратная работа и решение, которое продлевает жизнь устройству.
          </p>
        </div>

        <div
          ref={gridRef}
          className="reveal grid grid-cols-1 gap-3 min-[390px]:gap-4 md:grid-cols-2"
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className={`
                  group relative flex min-h-[330px] flex-col rounded-card border border-hairline bg-surface-1 p-4 shadow-e1 transition duration-300 hover:-translate-y-1 hover:border-hairline-strong active:scale-[0.99] min-[390px]:p-5 sm:min-h-[360px]
                  ${service.centered ? 'md:col-span-2 md:mx-auto md:max-w-2xl' : ''}
                `}
              >
                <div className="relative flex items-start justify-between gap-3">
                  <div className={`flex size-12 shrink-0 items-center justify-center rounded-control border ${service.accent.chip}`}>
                    <Icon size={24} strokeWidth={1.75} className={service.iconColor} />
                  </div>

                  <span className="rounded-full border border-hairline bg-surface-2 px-2.5 py-1 text-xs font-medium text-white/75">
                    0{index + 1}
                  </span>
                </div>

                <div className="relative mt-4">
                  <h3 className="text-balance text-2xl font-semibold leading-tight text-white">
                    {service.title}
                  </h3>
                  <div className={`mt-2.5 h-[3px] w-12 rounded-full ${service.accent.bar}`} />
                  <p className="mt-2.5 text-base font-medium leading-relaxed text-blue-100/90">
                    {service.subtitle}
                  </p>
                </div>

                <div className="relative mt-4 grid gap-2.5">
                  {[
                    {
                      icon: Cpu,
                      label: "Что делаем",
                      text: service.benefit,
                      tone: "text-blue-300",
                      edge: "border-l-blue-400/60",
                    },
                    {
                      icon: ShieldCheck,
                      label: "Результат",
                      text: service.value,
                      tone: "text-purple-300",
                      edge: "border-l-purple-400/60",
                    },
                    {
                      icon: BatteryCharging,
                      label: "Когда обращаться",
                      text: service.useful,
                      tone: "text-amber-300",
                      edge: "border-l-amber-400/60",
                    },
                  ].map((block) => {
                    const BlockIcon = block.icon;

                    return (
                      <div
                        key={block.label}
                        className={`rounded-control border border-hairline border-l-2 ${block.edge} bg-surface-2 p-3.5`}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <BlockIcon size={16} className={`shrink-0 ${block.tone}`} />
                          <span className={`text-xs font-semibold uppercase tracking-[0.08em] ${block.tone}`}>
                            {block.label}
                          </span>
                        </div>
                        <p className="text-base leading-relaxed text-white/85">
                          {block.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
