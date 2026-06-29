import { useEffect, useRef } from "react";

interface Color {
  r: number;
  g: number;
  b: number;
}

interface Particle {
  theta: number;
  phi: number;
  psi: number;
  chi: number;
  r: number;

  vt: number;
  vp: number;
  vw: number;
  vu: number;
  vr: number;

  offsetX: number;
  offsetY: number;
  velocityX: number;
  velocityY: number;

  radius: number;
  color: Color;
  isBlue: boolean;
  baseAlpha: number;
}

interface ProjectedParticle {
  x: number;
  y: number;
  z: number;
  d: number;
  burst: number;
  trail: number;
  trailDistance: number;
  color: Color;
  isBlue: boolean;
}

interface Star {
  x: number;
  y: number;
  depth: number;
  radius: number;
  alpha: number;
  phase: number;
  isWarm: boolean;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: Color;
  alpha: number;
  phase: number;
  drift: number;
}

const blue: Color = { r: 56, g: 189, b: 248 };
const deepBlue: Color = { r: 37, g: 99, b: 235 };
const violet: Color = { r: 168, g: 85, b: 247 };
const warmYellow: Color = { r: 245, g: 198, b: 92 };
const turquoise: Color = { r: 45, g: 212, b: 191 };

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const rgba = (color: Color, alpha: number) =>
  `rgba(${color.r},${color.g},${color.b},${clamp(alpha, 0, 1)})`;

const rotatePair = (
  a: number,
  b: number,
  angle: number
): [number, number] => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [a * c - b * s, a * s + b * c];
};

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId = 0;
    let lastFrame = performance.now();

    const isMobile = window.innerWidth < 768;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    const particleCount = isMobile ? 76 : 142;
    const starCount = isMobile ? 64 : 96;

    const particles: Particle[] = [];
    const stars: Star[] = [];
    const nebulae: Nebula[] = [
      {
        x: 0.18,
        y: 0.16,
        radius: 0.8,
        color: deepBlue,
        alpha: 0.22,
        phase: 0.1,
        drift: 0.8,
      },
      {
        x: 0.86,
        y: 0.3,
        radius: 0.72,
        color: violet,
        alpha: 0.2,
        phase: 1.9,
        drift: 1.1,
      },
      {
        x: 0.34,
        y: 0.84,
        radius: 0.68,
        color: turquoise,
        alpha: 0.12,
        phase: 3.1,
        drift: 0.7,
      },
      {
        x: 0.78,
        y: 0.78,
        radius: 0.56,
        color: warmYellow,
        alpha: 0.1,
        phase: 4.4,
        drift: 0.55,
      },
    ];

    const camera = {
      z: 0,
      targetZ: 0,
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
    };

    const input = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      strength: 0,
      targetStrength: 0,
      isTouch: false,
    };

    const fabric = {
      lastScrollY: window.scrollY || 0,
      rot4: 0,
      targetRot4: 0,
      rot5: 0,
      targetRot5: 0,
      warp: 0,
      targetWarp: 0,
    };

    const baseRadius = () =>
      Math.min(width, height) * (isMobile ? 0.62 : 0.72);

    const center = () => ({
      x: width / 2,
      y: isMobile ? height * 0.48 : height * 0.46,
    });

    for (let i = 0; i < particleCount; i++) {
      const isBlue = Math.random() > 0.42;

      particles.push({
        theta: Math.random() * Math.PI * 2,
        phi: Math.acos(2 * Math.random() - 1),
        psi: Math.random() * Math.PI,
        chi: Math.random() * Math.PI,
        r: 0.86 + Math.random() * 0.26,

        vt: (Math.random() - 0.5) * (isMobile ? 0.00095 : 0.00075),
        vp: (Math.random() - 0.5) * (isMobile ? 0.0009 : 0.0007),
        vw: (Math.random() - 0.5) * (isMobile ? 0.0008 : 0.00065),
        vu: (Math.random() - 0.5) * (isMobile ? 0.00075 : 0.0006),
        vr: (Math.random() - 0.5) * (isMobile ? 0.00045 : 0.00038),

        offsetX: 0,
        offsetY: 0,
        velocityX: 0,
        velocityY: 0,

        radius: isMobile
          ? Math.random() * 0.8 + 0.55
          : Math.random() * 1.3 + 0.65,
        color: isBlue ? blue : warmYellow,
        isBlue,
        baseAlpha: isMobile
          ? Math.random() * 0.26 + 0.16
          : Math.random() * 0.2 + 0.12,
      });
    }

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        depth: Math.random() * 0.8 + 0.2,
        radius: Math.random() * (isMobile ? 0.75 : 0.95) + 0.25,
        alpha: Math.random() * 0.22 + 0.08,
        phase: Math.random() * Math.PI * 2,
        isWarm: Math.random() > 0.72,
      });
    }

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(pixelRatio, pixelRatio);
    };

    const setInput = (
      x: number,
      y: number,
      strength: number,
      isTouch: boolean
    ) => {
      input.targetX = x;
      input.targetY = y;
      input.targetStrength = strength;
      input.isTouch = isTouch;

      camera.tx = (x / width - 0.5) * (isMobile ? 30 : 44);
      camera.ty = (y / height - 0.5) * (isMobile ? 30 : 44);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (input.isTouch) return;

      setInput(e.clientX, e.clientY, isMobile ? 0.26 : 0.36, false);
    };

    const onMouseLeave = () => {
      if (input.isTouch) return;

      input.targetStrength = 0;
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      setInput(touch.clientX, touch.clientY, 1, true);
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      setInput(touch.clientX, touch.clientY, 1, true);
    };

    const onTouchEnd = (e: TouchEvent) => {
      const touch = e.touches[0];

      if (touch) {
        setInput(touch.clientX, touch.clientY, 1, true);
        return;
      }

      input.targetStrength = 0;
      input.isTouch = false;
    };

    const onScroll = () => {
      const scrollY = window.scrollY || 0;
      const delta = scrollY - fabric.lastScrollY;

      camera.targetZ = scrollY * (isMobile ? 0.014 : 0.024);

      if (delta > 0) {
        fabric.targetRot4 += delta * (isMobile ? 0.0026 : 0.0018);
      } else if (delta < 0) {
        fabric.targetRot5 += -delta * (isMobile ? 0.003 : 0.0021);
      }

      fabric.targetWarp = clamp(
        fabric.targetWarp + Math.min(Math.abs(delta) / 260, 0.34),
        0,
        1
      );
      fabric.lastScrollY = scrollY;
    };

    const onDeviceTilt = (e: DeviceOrientationEvent) => {
      if (!e.gamma || !e.beta) return;

      camera.tx = (e.gamma / 45) * (isMobile ? 26 : 34);
      camera.ty = (e.beta / 45) * (isMobile ? 26 : 34);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    if (typeof window !== "undefined") {
      window.addEventListener("deviceorientation", onDeviceTilt);
    }

    resize();
    onScroll();

    const smooth = (
      current: number,
      target: number,
      speed: number,
      delta: number
    ) => current + (target - current) * clamp(speed * delta, 0, 1);

    const project = (p: Particle, time: number) => {
      const R = baseRadius();
      const scrollTwist4 = fabric.rot4 * 0.42;
      const scrollTwist5 = fabric.rot5 * 0.52;
      const fractal =
        Math.sin(p.theta * 2.7 + p.psi * 1.8 + time * 1.3 + fabric.rot5) *
          0.045 +
        Math.sin(p.phi * 3.4 - p.chi * 1.6 + time * 0.8 + fabric.rot4) *
          0.035;
      const ripple =
        Math.sin(p.theta * 1.7 + p.phi * 2.2 + time) * 0.08 +
        Math.sin(p.psi * 2.6 + p.chi * 1.4 - time * 0.8) * 0.06 +
        fractal * fabric.warp;
      const rr = R * (p.r + ripple);

      const sinChi = Math.sin(p.chi);
      const sinPsi = Math.sin(p.psi);
      const sinPhi = Math.sin(p.phi);

      let x = rr * sinChi * sinPsi * sinPhi * Math.cos(p.theta);
      let y = rr * sinChi * sinPsi * sinPhi * Math.sin(p.theta);
      let z = rr * sinChi * sinPsi * Math.cos(p.phi);
      let w = rr * sinChi * Math.cos(p.psi);
      let u = rr * Math.cos(p.chi);

      [x, w] = rotatePair(x, w, time * 0.46 + scrollTwist4);
      [z, w] = rotatePair(z, w, time * 0.34 + scrollTwist4 * 0.55);
      [y, u] = rotatePair(y, u, time * 0.38 + scrollTwist5);
      [x, u] = rotatePair(x, u, time * 0.3 + scrollTwist5 * 0.64);

      const warpShift = fabric.warp * R * fractal;
      x += warpShift * 0.72;
      y += Math.sin(p.theta * 3 + time * 1.4) * fabric.warp * R * 0.035;
      z += Math.cos(p.psi * 2.4 - time) * fabric.warp * R * 0.05;
      u += warpShift * 0.4;

      const fifthDepth = 560 / Math.max(190, 560 + u);
      x *= fifthDepth;
      y *= fifthDepth;
      z *= fifthDepth;
      w *= fifthDepth;

      const fourthDepth = 500 / Math.max(180, 500 + w);
      x *= fourthDepth;
      y *= fourthDepth;
      z *= fourthDepth;

      return { x, y, z };
    };

    const drawCosmos = (time: number) => {
      const background = ctx.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, "#020617");
      background.addColorStop(0.34, "#071235");
      background.addColorStop(0.68, "#140d32");
      background.addColorStop(1, "#02040f");

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "screen";

      for (const nebula of nebulae) {
        const driftX = Math.sin(time * nebula.drift + nebula.phase) * width * 0.04;
        const driftY =
          Math.cos(time * nebula.drift * 0.7 + nebula.phase) * height * 0.035;
        const x = nebula.x * width + driftX + camera.x * nebula.drift * 0.28;
        const y = nebula.y * height + driftY + camera.y * nebula.drift * 0.28;
        const radius = Math.max(width, height) * nebula.radius;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);

        glow.addColorStop(0, rgba(nebula.color, nebula.alpha));
        glow.addColorStop(0.48, rgba(nebula.color, nebula.alpha * 0.18));
        glow.addColorStop(1, rgba(nebula.color, 0));

        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalCompositeOperation = "source-over";

      for (const star of stars) {
        const parallax = star.depth * 12;
        const x =
          (star.x * width +
            camera.x * star.depth * 0.35 +
            Math.sin(time * 0.8 + star.phase) * parallax +
            width) %
          width;
        const y =
          (star.y * height +
            camera.y * star.depth * 0.35 +
            fabric.warp * star.depth * 26 +
            height) %
          height;
        const alpha =
          star.alpha * (0.62 + Math.sin(time * 1.6 + star.phase) * 0.22);

        ctx.beginPath();
        ctx.arc(x, y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = rgba(star.isWarm ? warmYellow : turquoise, alpha);
        ctx.fill();
      }
    };

    const draw = (now: number) => {
      const delta = clamp((now - lastFrame) / 16.67, 0.35, 2);
      const time = now * (isMobile ? 0.0001 : 0.000085);

      lastFrame = now;

      input.x = smooth(input.x, input.targetX, 0.16, delta);
      input.y = smooth(input.y, input.targetY, 0.16, delta);
      input.strength = smooth(
        input.strength,
        input.targetStrength,
        input.targetStrength > input.strength ? 0.18 : 0.075,
        delta
      );

      camera.z = smooth(camera.z, camera.targetZ, 0.08, delta);
      camera.x = smooth(camera.x, camera.tx, 0.055, delta);
      camera.y = smooth(camera.y, camera.ty, 0.055, delta);

      fabric.rot4 = smooth(fabric.rot4, fabric.targetRot4, 0.055, delta);
      fabric.rot5 = smooth(fabric.rot5, fabric.targetRot5, 0.055, delta);
      fabric.warp = smooth(fabric.warp, fabric.targetWarp, 0.08, delta);
      fabric.targetWarp *= Math.pow(0.94, delta);

      const { x: cx, y: cy } = center();
      const projected: ProjectedParticle[] = [];

      drawCosmos(time);

      const cosY = Math.cos(time * 0.58 + fabric.rot4 * 0.18);
      const sinY = Math.sin(time * 0.58 + fabric.rot4 * 0.18);
      const cosX = Math.cos(time * 0.42 + fabric.rot5 * 0.16);
      const sinX = Math.sin(time * 0.42 + fabric.rot5 * 0.16);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        p.theta += p.vt * delta;
        p.phi += p.vp * delta;
        p.psi += p.vw * delta;
        p.chi += p.vu * delta;
        p.r += p.vr * delta;

        if (p.r > 1.16 || p.r < 0.82) {
          p.vr *= -1;
          p.r = clamp(p.r, 0.82, 1.16);
        }

        const v = project(p, time);
        const x = v.x;
        const y = v.y;
        const z = v.z - camera.z;

        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const rawDepth = 430 / Math.max(135, 430 + z2);
        const depth = clamp(rawDepth, 0.2, 2.65);

        const baseX = cx + x1 * depth + camera.x;
        const baseY = cy + y1 * depth + camera.y;

        let targetOffsetX = 0;
        let targetOffsetY = 0;
        let burst = 0;
        let trail = 0;
        let trailDistance = Infinity;

        if (input.strength > 0.01) {
          const interactionRadius = isMobile
            ? input.isTouch
              ? 260
              : 210
            : input.isTouch
              ? 230
              : 190;
          const dx = input.x - (baseX + p.offsetX);
          const dy = input.y - (baseY + p.offsetY);
          const dist = Math.max(1, Math.hypot(dx, dy));
          const falloff = clamp(1 - dist / interactionRadius, 0, 1);
          const influence = falloff * falloff * (3 - 2 * falloff);
          const sourcePower = input.isTouch ? 1 : 0.56;
          const power = influence * input.strength * sourcePower;

          if (p.isBlue) {
            const pull = isMobile ? 0.2 : 0.16;
            targetOffsetX = clamp(dx * pull * power, -86, 86);
            targetOffsetY = clamp(dy * pull * power, -86, 86);
            burst = power;
          } else {
            const push = (isMobile ? 72 : 58) * power;
            targetOffsetX = clamp(-(dx / dist) * push, -86, 86);
            targetOffsetY = clamp(-(dy / dist) * push, -86, 86);
            burst = power * 0.75;
          }

          trail = power;
          trailDistance = dist;
        }

        p.velocityX += (targetOffsetX - p.offsetX) * (isMobile ? 0.07 : 0.058) * delta;
        p.velocityY += (targetOffsetY - p.offsetY) * (isMobile ? 0.07 : 0.058) * delta;
        p.velocityX *= Math.pow(0.82, delta);
        p.velocityY *= Math.pow(0.82, delta);
        p.offsetX = clamp(p.offsetX + p.velocityX * delta, -110, 110);
        p.offsetY = clamp(p.offsetY + p.velocityY * delta, -110, 110);

        projected[i] = {
          x: baseX + p.offsetX,
          y: baseY + p.offsetY,
          z: z2,
          d: Math.max(0.2, depth + burst * 0.56),
          burst,
          trail,
          trailDistance,
          color: p.color,
          isBlue: p.isBlue,
        };
      }

      const linkDist = isMobile ? 128 : 142;

      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (!Number.isFinite(dist) || dist >= linkDist) continue;

          const mixColor = a.isBlue && b.isBlue
            ? turquoise
            : !a.isBlue && !b.isBlue
              ? warmYellow
              : violet;
          const alpha =
            (1 - dist / linkDist) *
            (a.d + b.d) *
            (0.09 + (a.burst + b.burst) * 0.2);

          if (alpha < 0.012) continue;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = rgba(mixColor, alpha);
          ctx.lineWidth = isMobile ? 0.55 : 0.7;
          ctx.stroke();
        }
      }

      if (input.strength > 0.02) {
        const trailLimit = isMobile ? 9 : 12;
        const trailParticles = projected
          .filter((p) => p.trail > 0.08)
          .sort((a, b) => b.trail - a.trail || a.trailDistance - b.trailDistance)
          .slice(0, trailLimit);

        ctx.lineCap = "round";

        for (const p of trailParticles) {
          const color = p.isBlue ? blue : warmYellow;
          const alpha = p.trail * (input.isTouch ? 0.48 : 0.24);

          ctx.shadowBlur = isMobile ? 14 : 18;
          ctx.shadowColor = rgba(color, alpha);
          ctx.beginPath();
          ctx.moveTo(input.x, input.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = rgba(color, alpha);
          ctx.lineWidth = isMobile ? 0.8 : 1;
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
      }

      for (let i = 0; i < particleCount; i++) {
        const particle = particles[i];
        const p = projected[i];
        const size =
          particle.radius *
          Math.max(0.55, 1 + p.d * (isMobile ? 0.58 : 0.72) + p.burst * 1.2);
        const glowSize = size * (isMobile ? 2.6 : 2.8);
        const alpha = clamp(
          particle.baseAlpha * (0.52 + p.d * 0.86 + p.burst * 1.3),
          0,
          0.78
        );

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = rgba(p.color, alpha * 0.12);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = rgba(p.color, alpha);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "source-over";

      const vignette = ctx.createRadialGradient(
        cx + camera.x * 0.18,
        cy + camera.y * 0.18,
        Math.min(width, height) * 0.08,
        cx,
        cy,
        Math.max(width, height) * 0.92
      );

      vignette.addColorStop(0, "rgba(2,6,23,0)");
      vignette.addColorStop(0.55, "rgba(2,6,23,0.08)");
      vignette.addColorStop(1, "rgba(2,6,23,0.72)");

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);

      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("deviceorientation", onDeviceTilt);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-screen w-screen pointer-events-none"
    />
  );
}
