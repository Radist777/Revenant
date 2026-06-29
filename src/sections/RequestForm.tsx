import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  ImagePlus,
  Phone,
  Sparkles,
  Upload,
  User,
  Wrench,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";

type FormValues = {
  name: string;
  phone: string;
  device: string;
  description: string;
  contactTime: string;
};

type FormErrors = Partial<Record<keyof FormValues | "photos", string>>;

type FieldProps = {
  icon: LucideIcon;
  label: string;
  error?: string;
  multiline?: boolean;
  children: ReactNode;
};

const buttonTap = {
  scale: 0.965,
  y: 1,
};

const initialValues: FormValues = {
  name: "",
  phone: "",
  device: "",
  description: "",
  contactTime: "",
};

const repairOptions = [
  "Ноутбук",
  "Компьютер",
  "Смартфон",
  "Телевизор",
  "Обучение и настройка",
  "Другое устройство",
  
];

function maskPhone(value: string) {
  const rawDigits = value.replace(/\D/g, "");
  const withoutCountry = rawDigits.startsWith("8")
    ? rawDigits.slice(1)
    : rawDigits.startsWith("7")
      ? rawDigits.slice(1)
      : rawDigits;
  const digits = withoutCountry.slice(0, 10);
  const parts = [
    digits.slice(0, 3),
    digits.slice(3, 6),
    digits.slice(6, 8),
    digits.slice(8, 10),
  ];

  let result = "+7";
  if (parts[0]) result += ` (${parts[0]}`;
  if (parts[0].length === 3) result += ")";
  if (parts[1]) result += ` ${parts[1]}`;
  if (parts[2]) result += `-${parts[2]}`;
  if (parts[3]) result += `-${parts[3]}`;

  return result;
}

function FieldShell({
  icon: Icon,
  label,
  error,
  multiline = false,
  children,
}: FieldProps) {
  return (
    <motion.label
      animate={error ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.28 }}
      className="group block"
    >
      <span className="mb-2 block px-1 text-[13px] font-medium leading-none text-white/78">
        {label}
      </span>
      <span
        className={[
          "relative flex min-h-14 gap-3 overflow-hidden rounded-[20px] border bg-white/[0.065] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl transition duration-300",
          "focus-within:-translate-y-0.5 focus-within:bg-white/[0.09] focus-within:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_14px_34px_rgba(59,130,246,0.16)]",
          multiline ? "items-start" : "items-center",
          error
            ? "border-rose-300/55 ring-1 ring-rose-400/25"
            : "border-white/12 focus-within:border-blue-300/55",
        ].join(" ")}
      >
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/9 via-transparent to-blue-400/8 opacity-0 transition duration-300 group-focus-within:opacity-100" />
        <Icon
          size={20}
          strokeWidth={1.85}
          className={
            error
              ? `relative shrink-0 text-rose-200 ${multiline ? "mt-4" : ""}`
              : `relative shrink-0 text-blue-200 ${multiline ? "mt-4" : ""}`
          }
        />
        {children}
      </span>
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 block px-1 text-xs font-medium text-rose-200/90"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.label>
  );
}

export default function RequestForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [photos, setPhotos] = useState<File[]>([]);
  const [isDeviceOpen, setIsDeviceOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const photoLabel = useMemo(() => {
    if (photos.length === 0) return "Добавить фото";
    return `${photos.length} из 3 фото`;
  }, [photos.length]);

  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const updatePhone = (value: string) => {
    const digits = value.replace(/\D/g, "");

    if (value.trim() === "" || digits === "" || digits === "7" || digits === "8") {
      updateValue("phone", "");
      return;
    }

    updateValue("phone", maskPhone(value));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    const phoneDigits = values.phone.replace(/\D/g, "");

    if (values.name.trim().length < 2) {
      nextErrors.name = "Укажите имя, чтобы мастер знал, как к вам обратиться.";
    }
    if (phoneDigits.length < 11) {
      nextErrors.phone = "Введите номер телефона полностью.";
    }
    if (!values.device) {
      nextErrors.device = "Выберите устройство или тип ремонта.";
    }
    if (values.description.trim().length < 8) {
      nextErrors.description = "Опишите проблему хотя бы в пару слов.";
    }
    if (values.contactTime.trim().length < 2) {
      nextErrors.contactTime = "Подскажите удобное время для звонка.";
    }
    if (photos.length > 3) {
      nextErrors.photos = "Можно приложить до 3 изображений.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setIsSent(true);
    setValues(initialValues);
    setPhotos([]);
    window.setTimeout(() => setIsSent(false), 4200);
  };

  const selectPhotos = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.currentTarget.files ?? []).slice(0, 3);
    setPhotos(selected);
    setErrors((current) => ({ ...current, photos: undefined }));
  };

  return (
    <section
      id="request"
      data-scroll-shift="48"
      className="relative scroll-mt-4 overflow-hidden px-3 py-12 pb-[calc(env(safe-area-inset-bottom)+124px)] sm:px-6 sm:py-8 sm:pb-36 lg:py-10"
    >
      <div className="pointer-events-none absolute left-1/2 top-8 h-64 w-[min(92vw,720px)] -translate-x-1/2 rounded-full bg-blue-500/16 blur-[100px]" />
      <div className="pointer-events-none absolute -right-28 bottom-16 size-72 rounded-full bg-purple-500/18 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ type: "spring", stiffness: 150, damping: 24 }}
          className="relative isolate overflow-hidden rounded-[28px] border border-white/15 bg-slate-950/44 px-4 py-5 shadow-[0_30px_90px_rgba(0,0,0,0.52),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl supports-[backdrop-filter]:bg-slate-950/32 min-[390px]:px-5 sm:rounded-[34px] sm:p-7"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-blue-500/8 to-purple-500/14" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-white/40" />
          <div className="pointer-events-none absolute -left-24 top-10 size-52 rounded-full bg-blue-400/15 blur-[90px]" />
          <div className="pointer-events-none absolute -right-20 bottom-4 size-56 rounded-full bg-purple-500/14 blur-[100px]" />

          <div className="relative mb-6">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-blue-100/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
              <Sparkles size={14} className="text-blue-300" />
              Заявка в сервис
            </div>
            <h2 className="text-balance text-3xl font-light leading-tight tracking-normal text-white min-[390px]:text-4xl sm:text-5xl">
              Расскажите, что случилось
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 min-[390px]:text-[15px] sm:text-base">
              Оставьте контакты и короткое описание. Мастер свяжется с вами,
              уточнит детали и подскажет следующий шаг.
            </p>
          </div>

          <form className="relative grid gap-4" onSubmit={submitRequest} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <FieldShell icon={User} label="Имя" error={errors.name}>
                <input
                  value={values.name}
                  onChange={(event) => updateValue("name", event.target.value)}
                  placeholder="Например, Алексей"
                  autoComplete="name"
                  className="relative h-14 min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-white/35"
                />
              </FieldShell>

              <FieldShell icon={Phone} label="Телефон" error={errors.phone}>
                <input
                  value={values.phone}
                  onChange={(event) => updatePhone(event.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  inputMode="tel"
                  autoComplete="tel"
                  className="relative h-14 min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-white/35"
                />
              </FieldShell>
            </div>

            <motion.div
              animate={errors.device ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }}
              transition={{ duration: 0.28 }}
              className="relative"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setIsDeviceOpen(false);
                }
              }}
            >
              <span className="mb-2 block px-1 text-[13px] font-medium leading-none text-white/78">
                Что нужно починить/настроить
              </span>
              <motion.button
                type="button"
                whileTap={buttonTap}
                aria-expanded={isDeviceOpen}
                aria-haspopup="listbox"
                onClick={() => setIsDeviceOpen((value) => !value)}
                className={[
                  "group relative flex min-h-14 w-full items-center gap-3 overflow-hidden rounded-[20px] border bg-white/[0.065] px-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl transition duration-300",
                  isDeviceOpen
                    ? "-translate-y-0.5 border-blue-300/55 bg-white/[0.09] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_14px_34px_rgba(59,130,246,0.16)]"
                    : "",
                  errors.device
                    ? "border-rose-300/55 ring-1 ring-rose-400/25"
                    : "border-white/12",
                ].join(" ")}
              >
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/9 via-transparent to-blue-400/8 opacity-0 transition duration-300 group-hover:opacity-100" />
                <Wrench
                  size={20}
                  strokeWidth={1.85}
                  className={
                    errors.device
                      ? "relative shrink-0 text-rose-200"
                      : "relative shrink-0 text-blue-200"
                  }
                />
                <span
                  className={[
                    "relative min-w-0 flex-1 text-[16px]",
                    values.device ? "text-white" : "text-white/35",
                  ].join(" ")}
                >
                  {values.device || "Выберите устройство"}
                </span>
                <ChevronDown
                  size={19}
                  strokeWidth={1.85}
                  className={[
                    "relative shrink-0 text-white/58 transition duration-300",
                    isDeviceOpen ? "rotate-180 text-blue-200" : "",
                  ].join(" ")}
                />
              </motion.button>

              <AnimatePresence>
                {isDeviceOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -6, scale: 0.98, filter: "blur(8px)" }}
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    role="listbox"
                    className="absolute inset-x-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-[22px] border border-white/15 bg-slate-950/95 p-1.5 shadow-[0_18px_54px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl"
                    >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/16 via-blue-500/12 to-purple-500/18" />
                    {repairOptions.map((option) => {
                      const isSelected = values.device === option;

                      return (
                        <button
                          key={option}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            updateValue("device", option);
                            setIsDeviceOpen(false);
                          }}
                          className={[
                            "relative flex min-h-11 w-full items-center justify-between rounded-[17px] px-3.5 text-left text-[15px] font-medium transition",
                            isSelected
                              ? "bg-gradient-to-r from-blue-500/26 to-purple-500/22 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
                              : "text-white/68 hover:bg-white/[0.07] hover:text-white",
                          ].join(" ")}
                        >
                          <span>{option}</span>
                          {isSelected && (
                            <CheckCircle2 size={17} className="text-blue-200" />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {errors.device && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mt-2 block px-1 text-xs font-medium text-rose-200/90"
                  >
                    {errors.device}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            <FieldShell
              icon={FileText}
              label="Описание проблемы"
              error={errors.description}
              multiline
            >
              <textarea
                value={values.description}
                onChange={(event) => updateValue("description", event.target.value)}
                placeholder="Например: не включается, шумит, быстро разряжается..."
                rows={4}
                className="relative min-h-28 min-w-0 flex-1 resize-none bg-transparent py-4 text-[16px] leading-relaxed text-white outline-none placeholder:text-white/35"
              />
            </FieldShell>

            <motion.div
              animate={errors.photos ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }}
              transition={{ duration: 0.28 }}
            >
              <span className="mb-2 block px-1 text-[13px] font-medium leading-none text-white/78">
                Фото проблемы
              </span>
              <label
                className={[
                  "relative flex min-h-20 cursor-pointer items-center gap-3 overflow-hidden rounded-[22px] border border-dashed bg-white/[0.055] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition duration-300 active:scale-[0.99]",
                  errors.photos
                    ? "border-rose-300/55"
                    : "border-white/16 hover:border-blue-300/50 hover:bg-white/[0.075]",
                ].join(" ")}
              >
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-purple-400/10" />
                <span className="relative flex size-12 shrink-0 items-center justify-center rounded-[18px] border border-white/12 bg-white/[0.07] text-blue-200">
                  <ImagePlus size={22} strokeWidth={1.8} />
                </span>
                <span className="relative min-w-0 flex-1">
                  <span className="block text-[15px] font-medium text-white">{photoLabel}</span>
                  <span className="mt-1 block text-xs leading-snug text-white/48">
                    Опционально, JPG или PNG, до трех изображений
                  </span>
                </span>
                <Upload size={19} className="relative shrink-0 text-white/54" />
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  multiple
                  onChange={selectPhotos}
                  className="sr-only"
                />
              </label>
              <AnimatePresence>
                {photos.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mt-2 grid gap-2"
                  >
                    {photos.map((photo, index) => (
                      <div
                        key={`${photo.name}-${index}`}
                        className="flex min-h-10 items-center justify-between gap-3 rounded-[16px] border border-white/10 bg-white/[0.045] px-3 text-xs text-white/66"
                      >
                        <span className="truncate">{photo.name}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setPhotos((current) =>
                              current.filter((_, photoIndex) => photoIndex !== index)
                            )
                          }
                          aria-label="Удалить фото"
                          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-white/70 transition hover:bg-white/[0.12]"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {errors.photos && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mt-2 block px-1 text-xs font-medium text-rose-200/90"
                  >
                    {errors.photos}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            <FieldShell
              icon={Clock3}
              label="Удобное время для связи"
              error={errors.contactTime}
            >
              <input
                value={values.contactTime}
                onChange={(event) => updateValue("contactTime", event.target.value)}
                placeholder="Сегодня после 18:00"
                autoComplete="off"
                className="relative h-14 min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-white/35"
              />
            </FieldShell>

            <motion.button
              type="submit"
              whileTap={buttonTap}
              className="group relative mt-1 flex min-h-16 w-full items-center justify-center overflow-hidden rounded-[24px] border border-white/16 bg-gradient-to-r from-blue-600/48 to-purple-600/48 px-5 text-[16px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_18px_42px_rgba(59,130,246,0.24)] backdrop-blur-xl transition hover:from-blue-500/54 hover:to-purple-500/54"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/16 via-transparent to-white/10 opacity-90" />
              <span className="relative flex items-center gap-2">
                Оставить заявку
                <ArrowRight
                  size={19}
                  className="-rotate-45 transition-transform duration-300 group-hover:rotate-0"
                />
              </span>
            </motion.button>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {isSent && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 14, scale: 0.97, filter: "blur(8px)" }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className="fixed inset-x-4 top-[calc(env(safe-area-inset-top)+16px)] z-[60] mx-auto flex max-w-sm items-center gap-3 rounded-[24px] border border-white/15 bg-slate-950/66 p-3 text-white shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-400/16 text-emerald-200">
              <CheckCircle2 size={22} />
            </span>
            <span>
              <span className="block text-sm font-semibold">Заявка отправлена</span>
              <span className="mt-0.5 block text-xs leading-snug text-white/56">
                Скоро свяжемся и уточним детали ремонта.
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
