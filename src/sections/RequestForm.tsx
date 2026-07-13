import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  ImagePlus,
  Phone,
  Plus,
  Sparkles,
  Upload,
  User,
  Wrench,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { usePrivacyPolicy } from "../context/privacyPolicy";
import { useReveal } from "../utils/useReveal";

type FormValues = {
  name: string;
  phone: string;
  device: string;
  description: string;
  contactTime: string;
};

type FormErrors = Partial<Record<keyof FormValues | "photos" | "privacy", string>>;

type FieldProps = {
  icon: LucideIcon;
  label: string;
  error?: string;
  multiline?: boolean;
  children: ReactNode;
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

function FieldError({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <span
      id={id}
      className="animate-pop mt-2 block px-1 text-sm font-medium text-rose-200/95"
    >
      {children}
    </span>
  );
}

function FieldShell({
  icon: Icon,
  label,
  error,
  multiline = false,
  children,
}: FieldProps) {
  return (
    <label className={`group block${error ? " animate-shake" : ""}`}>
      <span className="mb-2 block px-1 text-sm font-medium leading-none text-white/90">
        {label}
      </span>
      <span
        className={[
          "relative flex min-h-14 gap-3 rounded-control border bg-surface-input px-4 transition-colors duration-200",
          "focus-within:bg-surface-2",
          multiline ? "items-start" : "items-center",
          error
            ? "border-rose-300/55 ring-1 ring-rose-400/25"
            : "border-hairline focus-within:border-accent",
        ].join(" ")}
      >
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
      {error && <FieldError>{error}</FieldError>}
    </label>
  );
}

export default function RequestForm() {
  const { open: openPrivacyPolicy } = usePrivacyPolicy();
  const cardRef = useReveal<HTMLDivElement>();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [photos, setPhotos] = useState<File[]>([]);
  const [isDeviceOpen, setIsDeviceOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [hasPrivacyConsent, setHasPrivacyConsent] = useState(false);

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

    // Обязательны только телефон и описание проблемы
    if (phoneDigits.length < 11) {
      nextErrors.phone = "Введите номер телефона полностью.";
    }
    if (values.description.trim().length < 8) {
      nextErrors.description = "Опишите проблему хотя бы в пару слов.";
    }

    if (!hasPrivacyConsent) {
      nextErrors.privacy = "Подтвердите согласие с политикой конфиденциальности.";
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
    setHasPrivacyConsent(false);
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
      className="relative scroll-mt-24 px-3 py-12 pb-[calc(env(safe-area-inset-bottom)+124px)] sm:px-6 sm:py-8 sm:pb-36 lg:py-10"
    >
      <div className="relative mx-auto w-full max-w-3xl">
        <div
          ref={cardRef}
          className="reveal relative rounded-card border border-hairline bg-surface-1 px-4 py-5 shadow-e2 min-[390px]:px-5 sm:p-7"
        >
          <div className="relative mb-6">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-2 px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-blue-100/90">
              <Sparkles size={15} className="text-blue-300" />
              Заявка в сервис
            </div>
            <h2 className="text-balance text-3xl font-light leading-tight tracking-normal text-white min-[390px]:text-4xl sm:text-5xl">
              Расскажите, что случилось
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/80 min-[390px]:text-base sm:text-lg">
              Оставьте контакты и короткое описание. Мастер свяжется с вами,
              уточнит детали и подскажет следующий шаг.
            </p>
          </div>

          <form className="relative grid gap-4" onSubmit={submitRequest} noValidate>
            <FieldShell icon={Phone} label="Телефон" error={errors.phone}>
              <input
                value={values.phone}
                onChange={(event) => updatePhone(event.target.value)}
                placeholder="+7 (___) ___-__-__"
                inputMode="tel"
                autoComplete="tel"
                className="relative h-14 min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-white/45"
              />
            </FieldShell>

            <FieldShell
              icon={FileText}
              label="Что сломалось"
              error={errors.description}
              multiline
            >
              <textarea
                value={values.description}
                onChange={(event) => updateValue("description", event.target.value)}
                placeholder="Например: не включается, шумит, быстро разряжается..."
                rows={4}
                className="relative min-h-28 min-w-0 flex-1 resize-none bg-transparent py-4 text-[16px] leading-relaxed text-white outline-none placeholder:text-white/45"
              />
            </FieldShell>

            {/* Необязательные детали скрыты, чтобы первое обращение было коротким */}
            <button
              type="button"
              aria-expanded={showDetails}
              onClick={() => setShowDetails((value) => !value)}
              className="flex min-h-12 items-center justify-between rounded-control border border-hairline bg-surface-2 px-4 text-sm font-medium text-white/85 transition-colors hover:border-hairline-strong"
            >
              <span className="flex items-center gap-2">
                <Plus size={17} className="text-blue-300" />
                Добавить детали
                <span className="text-white/50">— имя, устройство, фото, время</span>
              </span>
              <ChevronDown
                size={18}
                className={[
                  "shrink-0 text-white/58 transition duration-300",
                  showDetails ? "rotate-180 text-blue-200" : "",
                ].join(" ")}
              />
            </button>

            {showDetails && (
              <div className="animate-pop grid gap-4">
                <FieldShell icon={User} label="Имя (необязательно)">
                  <input
                    value={values.name}
                    onChange={(event) => updateValue("name", event.target.value)}
                    placeholder="Например, Алексей"
                    autoComplete="name"
                    className="relative h-14 min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-white/45"
                  />
                </FieldShell>

                <div
                  className="relative"
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setIsDeviceOpen(false);
                    }
                  }}
                >
                  <span className="mb-2 block px-1 text-sm font-medium leading-none text-white/90">
                    Устройство (необязательно)
                  </span>
                  <button
                    type="button"
                    aria-expanded={isDeviceOpen}
                    aria-haspopup="listbox"
                    onClick={() => setIsDeviceOpen((value) => !value)}
                    className={[
                      "relative flex min-h-14 w-full items-center gap-3 rounded-control border bg-surface-input px-4 text-left transition-colors duration-200 active:scale-[0.99]",
                      isDeviceOpen ? "border-accent bg-surface-2" : "border-hairline",
                    ].join(" ")}
                  >
                    <Wrench size={20} strokeWidth={1.85} className="relative shrink-0 text-blue-200" />
                    <span
                      className={[
                        "relative min-w-0 flex-1 text-[16px]",
                        values.device ? "text-white" : "text-white/45",
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
                  </button>

                  {isDeviceOpen && (
                    <div
                      role="listbox"
                      className="animate-pop absolute inset-x-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-control border border-hairline-strong bg-surface-2 p-1.5 shadow-e2"
                    >
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
                              "relative flex min-h-11 w-full items-center justify-between rounded-control px-3.5 text-left text-[15px] font-medium transition",
                              isSelected
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                                : "text-white/80 hover:bg-white/[0.07] hover:text-white",
                            ].join(" ")}
                          >
                            <span>{option}</span>
                            {isSelected && (
                              <CheckCircle2 size={17} className="text-blue-100" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

            <div className={errors.photos ? "animate-shake" : undefined}>
              <span className="mb-2 block px-1 text-sm font-medium leading-none text-white/90">
                Фото проблемы (необязательно)
              </span>
              <label
                className={[
                  "relative flex min-h-20 cursor-pointer items-center gap-3 rounded-control border border-dashed bg-surface-input px-4 py-3 transition-colors duration-200 active:scale-[0.99]",
                  errors.photos
                    ? "border-rose-300/55"
                    : "border-hairline-strong hover:border-accent hover:bg-surface-2",
                ].join(" ")}
              >
                <span className="relative flex size-12 shrink-0 items-center justify-center rounded-control border border-hairline bg-surface-2 text-blue-200">
                  <ImagePlus size={22} strokeWidth={1.8} />
                </span>
                <span className="relative min-w-0 flex-1">
                  <span className="block text-base font-medium text-white">{photoLabel}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-white/75">
                    Опционально, JPG или PNG, до трёх изображений
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

              {photos.length > 0 && (
                <div className="mt-2 grid gap-2">
                  {photos.map((photo, index) => (
                    <div
                      key={`${photo.name}-${index}`}
                      className="flex min-h-10 items-center justify-between gap-3 rounded-control border border-hairline bg-surface-2 px-3 text-sm text-white/80"
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
                        className="flex size-7 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface-1 text-white/70 transition-colors hover:border-hairline-strong"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {errors.photos && <FieldError>{errors.photos}</FieldError>}
            </div>

                <FieldShell icon={Clock3} label="Удобное время для связи (необязательно)">
                  <input
                    value={values.contactTime}
                    onChange={(event) => updateValue("contactTime", event.target.value)}
                    placeholder="Сегодня после 18:00"
                    autoComplete="off"
                    className="relative h-14 min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-white/45"
                  />
                </FieldShell>
              </div>
            )}

            <div className={errors.privacy ? "animate-shake" : undefined}>
              <div className="rounded-control border border-hairline bg-surface-2 p-4 transition-colors hover:border-hairline-strong">
                <input
                  id="privacy-consent"
                  type="checkbox"
                  checked={hasPrivacyConsent}
                  onChange={(event) => {
                    setHasPrivacyConsent(event.target.checked);
                    setErrors((current) => ({ ...current, privacy: undefined }));
                  }}
                  className="privacy-consent sr-only"
                  aria-describedby={errors.privacy ? "privacy-consent-error" : undefined}
                />
                <label htmlFor="privacy-consent" className="flex cursor-pointer items-start gap-3">
                  <span
                    className={[
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[7px] border transition",
                      hasPrivacyConsent
                        ? "border-blue-200 bg-blue-400 text-slate-950"
                        : "border-white/30 bg-surface-input text-transparent",
                    ].join(" ")}
                  >
                    <CheckCircle2 size={14} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span className="text-[15px] leading-relaxed text-white/90">
                    Согласен с политикой конфиденциальности
                  </span>
                </label>
                <div className="ml-8 mt-2">
                  <button
                    type="button"
                    onClick={openPrivacyPolicy}
                    className="font-medium text-blue-100 underline decoration-blue-200/40 underline-offset-4 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                  >
                    Открыть политику
                  </button>
                </div>
              </div>
              {errors.privacy && (
                <FieldError id="privacy-consent-error">{errors.privacy}</FieldError>
              )}
            </div>

            <button
              type="submit"
              disabled={!hasPrivacyConsent}
              aria-disabled={!hasPrivacyConsent}
              className={[
                "group mt-1 flex min-h-16 w-full items-center justify-center rounded-control border px-5 text-[16px] font-semibold transition",
                hasPrivacyConsent
                  ? "border-hairline-strong bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-e1 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99]"
                  : "cursor-not-allowed border-hairline bg-surface-2 text-white/45 shadow-none",
              ].join(" ")}
            >
              <span className="flex items-center gap-2">
                Отправить заявку
                <ArrowRight
                  size={19}
                  className={[
                    "-rotate-45 transition-transform duration-300",
                    hasPrivacyConsent ? "group-hover:rotate-0" : "text-white/30",
                  ].join(" ")}
                />
              </span>
            </button>
          </form>
        </div>
      </div>

      {isSent && (
        <div className="animate-pop fixed inset-x-4 top-[calc(env(safe-area-inset-top)+16px)] z-[60] mx-auto flex max-w-sm items-center gap-3 rounded-control border border-hairline-strong bg-surface-2 p-3 text-white shadow-e2">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-400/16 text-emerald-200">
            <CheckCircle2 size={22} />
          </span>
          <span>
            <span className="block text-base font-semibold">Заявка отправлена</span>
            <span className="mt-0.5 block text-sm leading-relaxed text-white/80">
              Скоро свяжемся и уточним детали ремонта.
            </span>
          </span>
        </div>
      )}
    </section>
  );
}
