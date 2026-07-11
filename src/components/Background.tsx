import { useEffect, useRef } from "react";

// Упрощенные интерфейсы только для статических данных
interface Color {
  r: number;
  g: number;
  b: number;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  color: Color;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: Color;
  alpha: number;
}

const stars: Star[] = []
// Приглушенные цвета для мягкого космоса (сделаны темнее и ненасыщеннее)
const colors = {
  blue: { r: 30, g: 100, b: 150 },      // Приглушенный синий
  violet: { r: 100, g: 50, b: 150 },     // Приглушенный фиолетовый
  warmYellow: { r: 180, g: 150, b: 80 }, // Бледный желтый
  turquoise: { r: 30, g: 130, b: 120 },  // Тусклая бирюза
  deepBlue: { r: 15, g: 40, b: 90 },     // Очень глубокий синий
};

// Функция ограничения значений
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

// Утилита для rgba (оставляем, так как удобна для градиентов)
const rgba = (color: Color, alpha: number) =>
  `rgba(${color.r},${color.g},${color.b},${clamp(alpha, 0, 1)})`;

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    // Константы конфигурации
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 80 : 160;

    // Сдвиг туманностей: определяем их позиции статично, не в draw
    // Значения от 0 до 1 (процент от ширины/высоты)
    const nebulaeData: Nebula[] = [
      { x: 0.15, y: 0.2, radius: 0.7, color: colors.deepBlue, alpha: 0.15 },
      { x: 0.8, y: 0.35, radius: 0.65, color: colors.violet, alpha: 0.12 },
      { x: 0.3, y: 0.8, radius: 0.6, color: colors.turquoise, alpha: 0.1 },
      { x: 0.75, y: 0.75, radius: 0.5, color: colors.warmYellow, alpha: 0.08 },
    ];

    // Функция отрисовки статического космоса
    const drawStaticCosmos = () => {
      // 1. Очистка и установка размеров (важно при ресайзе)
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Сброс трансформаций
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Учитываем pixelRatio
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      ctx.scale(pixelRatio, pixelRatio);

      // 2. Фон-градиент (очень темный, не отвлекающий)
      const background = ctx.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, "#020510"); // Почти черный
      background.addColorStop(0.5, "#04091a"); // Очень темный синий
      background.addColorStop(1, "#02040c"); // Снова почти черный
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      // 3. Рисуем туманности (мягкие градиенты)
      ctx.globalCompositeOperation = "screen"; // Для мягкого наложения
      const maxDim = Math.max(width, height);

      for (const nebula of nebulaeData) {
        const x = nebula.x * width;
        const y = nebula.y * height;
        const radius = maxDim * nebula.radius;

        const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
        // Мягкое затухание: центр -> край
        glow.addColorStop(0, rgba(nebula.color, nebula.alpha));
        glow.addColorStop(0.5, rgba(nebula.color, nebula.alpha * 0.4));
        glow.addColorStop(1, rgba(nebula.color, 0));

        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.globalCompositeOperation = "source-over"; // Сброс режима наложения

      // 4. Генерируем и рисуем звезды (один раз)
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const depth = Math.random(); // 0 (близко) до 1 (далеко)

        // Мягкое свечение: большинство звезд тусклые, маленькие
        const radius = Math.random() * (isMobile ? 0.6 : 0.8) + 0.1;
        // Альфа: чем глубже (меньше depth), тем тусклее. Максимальная альфа очень низкая.
        const alpha = Math.random() * 0.1 + (depth * 0.1) + 0.02;

        // Выбор цвета: 90% белые/холодные, 10% теплые
        const isWarm = Math.random() > 0.9;
        const color = isWarm ? colors.warmYellow : colors.turquoise;

        // Рисуем звезду
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = rgba(color, alpha);
        ctx.fill();

        // Необязательно: добавляем супер-легкое сияние для 5% самых ярких звезд
        if (!isMobile && depth > 0.95 && Math.random() > 0.9) {
          ctx.beginPath();
          ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = rgba(color, alpha * 0.2); // Очень прозрачное свечение
          ctx.fill();
        }
      }
    };

    // Функция обновления размеров окна
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);

      // После изменения размера нужно перерисовать всё
      drawStaticCosmos();
    };

    // Вешаем только один листенер — на изменение размера
    window.addEventListener("resize", resize);

    // Первичная инициализация
    resize();

    // Очистка при размонтировании
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // pointer-events-none важен, чтобы клики проходили сквозь фон на сайт
      className="fixed inset-0 z-0 h-screen w-screen pointer-events-none"
    />
  );
}
