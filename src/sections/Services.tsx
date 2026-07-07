import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight,
  BatteryCharging,
  CheckCircle2,
  Cpu,
  Laptop,
  MonitorCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tv,
} from "lucide-react";
import { useRef } from "react";
import { scrollToSection } from "../utils/smoothScroll";

const buttonTap = {
  scale: 0.96,
  y: 1,
};

const services = [
  {
    title: "Ремонт ноутбуков",
    subtitle: "Диагностика, чистка и восстановление любой сложности",
    benefit: "Чистка от пыли, замена термопасты, обслуживание системы охлаждения — продлим жизнь вашему ноутбуку.",
    value: "Установка Windows, удаление вирусов, замена жёсткого диска / SSD, клавиатуры и матрицы экрана.",
    useful: "Идеально, если ноутбук шумит, греется, не заряжается, появились битые пиксели или сломалась клавиатура.",
    icon: Laptop,
    accent: "from-blue-500/25 to-cyan-400/12",
    iconColor: "text-blue-200",
  },
  {
    title: "Ремонт компьютеров",
    subtitle: "Настройка и апгрейд системных блоков для игр и работы",
    benefit: "Чистка от пыли, замена термопасты, обслуживание блока питания и кулеров.",
    value: "Установка Windows, удаление вирусов, замена диска, подбор комплектующих для апгрейда.",
    useful: "Поможем при зависаниях, синих экранах, низкой производительности или перегреве.",
    icon: MonitorCog,
    accent: "from-purple-500/24 to-blue-500/12",
    iconColor: "text-purple-200",
  },
  {
    title: "Ремонт смартфонов iPhone/Android",
    subtitle: "Замена дисплея, аккумулятора, гнезда зарядки и прошивка ПО",
    benefit: "Заменяем АКБ (включая вздутые), дисплеи (LCD/AMOLED, оригинал или копия), гнёзда зарядки (MicroUSB/Type‑C), устраняем проблемы со звуком, а также проводим комплексную чистку и разблокировку FRP (Google, Mi, Samsung).",
    value: "Вы получаете полностью рабочий телефон с гарантией, чистотой внутри и оптимизированной системой — готовой к повседневной эксплуатации.",
    useful: "Обращайтесь, если телефон быстро разряжается, не заряжается, разбит экран, пропал звук, зависает на логотипе или заблокирован после сброса до заводских настроек.",
    icon: Smartphone,
    accent: "from-cyan-400/22 to-teal-400/10",
    iconColor: "text-cyan-200",
  },
  {
    title: "Телевизоры",
    subtitle: "Бесплатная диагностика и ремонт без скрытых сюрпризов",
    benefit: "Замена подсветки (LED‑ленты), блока питания, инвертора, легкий ремонт материнской платы, настройка каналов, звука, изображения, обновление прошивки Smart TV и настройка цифровых приставок.",
    value: "Диагностика – бесплатно при заказе ремонта. Вы получаете рабочий телевизор с понятным счётом и гарантией на выполненные работы.",
    useful: "Поможем, если пропало изображение, но звук есть, телевизор не включается или сам выключается.",
    icon: Tv,
    accent: "from-amber-400/20 to-purple-500/10",
    iconColor: "text-amber-200",
  },
  {
    title: "Обучение и настройка",
    subtitle: "Поможем освоить смартфон, ноутбук и планшет — с выездом на дом",
    benefit: "Обучение пользованию смартфоном, ноутбуком/планшетом c подробной инструкцией. Настройка почты, мессенджеров, портала Госуслуги (1 устройство). Консультация с демонстрацией до 30 минут.",
    value: "Выезд на дом, индивидуальный подход, объясняем простым языком. Для пенсионеров — скидка 20% на ремонт при заказе в тот же день.",
    useful: "Отлично подходит для пожилых людей и тех, кто только начинает осваивать цифровые устройства или хочет настроить важные сервисы.",
    icon: ShieldCheck,
    accent: "from-amber-400/20 to-purple-500/10",
    iconColor: "text-amber-200",
    centered: true  
  },
];

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
    scale: 0.98,
    filter: "blur(10px)",
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 170,
      damping: 24,
      delay: index * 0.08,
    },
  }),
};

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["-8%", "10%"]);
  const shineY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-visible px-4 py-16 pb-[calc(env(safe-area-inset-bottom)+92px)] sm:px-6 sm:py-24 sm:pb-36 lg:py-28 lg:pb-40"
    >
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute left-1/2 top-6 h-56 w-[min(86vw,680px)] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[90px]"
      />
      <motion.div
        style={{ y: shineY }}
        className="pointer-events-none absolute -right-20 top-36 size-56 rounded-full bg-purple-500/15 blur-[100px]"
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ type: "spring", stiffness: 160, damping: 24 }}
          className="mb-6 max-w-2xl sm:mb-9"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-blue-100/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
            <Sparkles size={14} className="text-blue-300" />
            Сервис Ревенант
          </div>

          <h2 className="text-balance text-3xl font-light leading-tight tracking-normal text-white min-[390px]:text-4xl sm:text-5xl">
            Ремонт техники с гарантией
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/58 min-[390px]:text-[15px] sm:text-base">
            Понятная диагностика, аккуратная работа и решение, которое продлевает жизнь устройству.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 min-[390px]:gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.22 }}
                whileHover={{ y: -8, scale: 1.015 }}
                whileTap={buttonTap}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                className={`
                  group relative isolate flex min-h-[330px] flex-col overflow-hidden rounded-[24px] border border-white/15 bg-slate-950/34 p-4 shadow-[0_18px_54px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl supports-[backdrop-filter]:bg-slate-950/26 min-[390px]:p-5 sm:min-h-[360px]
                  ${service.centered ? 'md:col-span-2 xl:col-start-2 xl:col-span-2 justify-self-center w-full max-w-2xl' : ''}
                `}
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.accent} opacity-90`} />
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-white/35" />
                <div className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-white/8 blur-3xl transition duration-500 group-hover:bg-white/12" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-blue-500/6 to-purple-500/10 opacity-70 transition duration-500 group-hover:opacity-95" />

                <div className="relative flex items-start justify-between gap-3">
                  <motion.div
                    whileHover={{ rotate: -4, scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 360, damping: 18 }}
                    className="flex size-12 shrink-0 items-center justify-center rounded-[18px] border border-white/14 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_24px_rgba(59,130,246,0.12)] backdrop-blur-xl"
                  >
                    <Icon size={24} strokeWidth={1.75} className={service.iconColor} />
                  </motion.div>

                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-white/54 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                    0{index + 1}
                  </span>
                </div>

                <div className="relative mt-4">
                  <h3 className="text-balance text-[22px] font-semibold leading-tight text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-snug text-blue-100/72">
                    {service.subtitle}
                  </p>
                </div>

                <div className="relative mt-4 grid gap-2.5 text-[13px] leading-snug text-white/60">
                  <div className="flex gap-2.5 rounded-[18px] border border-white/10 bg-white/[0.045] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <Cpu size={16} className="mt-0.5 shrink-0 text-blue-300/85" />
                    <p>{service.benefit}</p>
                  </div>

                  <div className="flex gap-2.5 rounded-[18px] border border-white/10 bg-white/[0.035] p-3">
                    <ShieldCheck size={16} className="mt-0.5 shrink-0 text-purple-300/85" />
                    <p>{service.value}</p>
                  </div>

                  <div className="flex gap-2.5 rounded-[18px] border border-white/10 bg-white/[0.03] p-3">
                    <BatteryCharging size={16} className="mt-0.5 shrink-0 text-amber-300/85" />
                    <p>{service.useful}</p>
                  </div>
                </div>

                <div className="relative mt-auto pt-4">
                  <motion.a
                    href="#request"
                    whileTap={buttonTap}
                    onClick={(event) => scrollToSection(event, "#request")}
                    className="flex min-h-12 items-center justify-between rounded-[20px] border border-white/14 bg-gradient-to-r from-blue-600/32 to-purple-600/32 px-4 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_12px_28px_rgba(59,130,246,0.16)] backdrop-blur-xl transition hover:from-blue-500/38 hover:to-purple-500/38"
                  >
                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={17} className="text-blue-200" />
                      Оставить заявку
                    </span>
                    <ArrowRight
                      size={18}
                      className="-rotate-45 text-white/80 transition-transform duration-300 group-hover:rotate-0"
                    />
                  </motion.a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}