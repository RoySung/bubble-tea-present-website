import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';

interface SVGCupProps {
  currentIndex: number;
  interactive?: boolean;
  interactionDisabled?: boolean;
  liquidColor: string;
}

const MAX_SIPS = 6;

const BOBA_POSITIONS = [
  { cx: 150, cy: 375 }, { cx: 255, cy: 385 }, { cx: 180, cy: 390 }, { cx: 220, cy: 400 },
  { cx: 155, cy: 415 }, { cx: 195, cy: 420 }, { cx: 235, cy: 430 }, { cx: 140, cy: 445 },
  { cx: 175, cy: 445 }, { cx: 210, cy: 450 }, { cx: 250, cy: 460 }, { cx: 160, cy: 470 },
  { cx: 225, cy: 475 }, { cx: 190, cy: 480 },
];

const flowingLiquidWavePath = (y: number, phase: number, closed = false) => {
  const angle = phase * Math.PI * 2;
  const a = -6 + Math.sin(angle) * 4;
  const b = 7 + Math.sin(angle + Math.PI) * 4;
  const c = Math.sin(angle + Math.PI * 0.4) * 2;
  const d = -6 + Math.sin(angle + Math.PI * 0.7) * 4;
  const e = 7 + Math.sin(angle + Math.PI * 1.7) * 4;
  const f = Math.sin(angle + Math.PI * 1.15) * 2;
  const surface = `M0 ${y} C58 ${y + a} 112 ${y + b} 170 ${y + c} C230 ${y + d} 298 ${y + e} 400 ${y + f}`;
  return closed ? `${surface} L400 550 L0 550 Z` : surface;
};

export default function SVGCup({
  currentIndex,
  interactive = false,
  interactionDisabled = false,
  liquidColor,
}: SVGCupProps) {
  const prefersReducedMotion = useReducedMotion();
  const motionEnabled = interactive && !interactionDisabled && !prefersReducedMotion;
  const rawId = useId();
  const clipId = rawId.replace(/:/g, '');
  const storyClipId = `story-liquid-${clipId}`;
  const sipClipId = `sip-liquid-${clipId}`;
  const morphClipId = `morph-liquid-${clipId}`;
  const cupLiquidClipId = `cup-liquid-shape-${clipId}`;
  const timeoutIds = useRef<number[]>([]);
  const previousIndex = useRef(currentIndex);
  const sipLiquidLevel = useMotionValue(260);
  const sipWavePhase = useMotionValue(0);
  const sipClipPath = useTransform(
    [sipLiquidLevel, sipWavePhase],
    ([level, phase]) => flowingLiquidWavePath(Number(level), Number(phase), true),
  );
  const sipSurfacePath = useTransform(
    [sipLiquidLevel, sipWavePhase],
    ([level, phase]) => flowingLiquidWavePath(Number(level), Number(phase)),
  );
  const morphLiquidLevel = useMotionValue(260);
  const morphWavePhase = useMotionValue(0);
  const morphClipPath = useTransform(
    [morphLiquidLevel, morphWavePhase],
    ([level, phase]) => flowingLiquidWavePath(Number(level), Number(phase), true),
  );
  const morphSurfacePath = useTransform(
    [morphLiquidLevel, morphWavePhase],
    ([level, phase]) => flowingLiquidWavePath(Number(level), Number(phase)),
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const strawDragX = useMotionValue(0);
  const smoothStrawDrag = useSpring(strawDragX, { damping: 20, stiffness: 100 });
  const bobaStirXBase = useTransform(smoothStrawDrag, [-80, 30], [-10, 15]);
  const bobaStirXMid = useTransform(smoothStrawDrag, [-80, 30], [-20, 25]);
  const bobaStirXTop = useTransform(smoothStrawDrag, [-80, 30], [-30, 35]);

  const [sips, setSips] = useState<number[]>([]);
  const [sipsTaken, setSipsTaken] = useState(0);
  const [displayedLiquidColor, setDisplayedLiquidColor] = useState(liquidColor);
  const [morphing, setMorphing] = useState(false);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const bobaX = useTransform(smoothX, [-500, 500], [-15, 15]);
  const bobaY = useTransform(smoothY, [-500, 500], [-10, 10]);
  const strawX = useTransform(smoothX, [-500, 500], [-25, 25]);
  const strawY = useTransform(bobaY, (value) => value * 0.5);
  const cupX = useTransform(smoothX, [-500, 500], [-5, 5]);
  const rotateX = useTransform(smoothY, [-500, 500], [5, -5]);
  const rotateY = useTransform(smoothX, [-500, 500], [-5, 5]);

  const handleSip = useCallback(() => {
    if (!interactive || interactionDisabled) return;

    if (sipsTaken >= MAX_SIPS) {
      setSipsTaken(0);
      setSips([]);
      return;
    }

    setSipsTaken((value) => value + 1);
    const id = Date.now();
    setSips((current) => [...current, id]);
    const timeoutId = window.setTimeout(() => {
      setSips((current) => current.filter((sipId) => sipId !== id));
    }, 1500);
    timeoutIds.current.push(timeoutId);
  }, [interactionDisabled, interactive, sipsTaken]);

  useEffect(() => {
    if (!motionEnabled || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      mouseX.set(0);
      mouseY.set(0);
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX - window.innerWidth / 2);
      mouseY.set(event.clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [motionEnabled, mouseX, mouseY]);

  useEffect(() => {
    if (interactive) return;
    setSipsTaken(0);
    setSips([]);
    strawDragX.set(0);
    timeoutIds.current.forEach((id) => window.clearTimeout(id));
    timeoutIds.current = [];
  }, [interactive, strawDragX]);

  useEffect(() => {
    const targetLevel = 260 + (sipsTaken / MAX_SIPS) * 225;

    if (prefersReducedMotion) {
      sipLiquidLevel.set(targetLevel);
      sipWavePhase.set(Math.ceil(sipWavePhase.get()));
      return;
    }

    if (Math.abs(sipLiquidLevel.get() - targetLevel) < 0.01) return;

    const levelAnimation = animate(sipLiquidLevel, targetLevel, {
      duration: 0.72,
      ease: [0.32, 0.08, 0.24, 1],
    });
    const waveAnimation = animate(sipWavePhase, sipWavePhase.get() + 1, {
      duration: 0.82,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => {
      levelAnimation.stop();
      waveAnimation.stop();
    };
  }, [prefersReducedMotion, sipLiquidLevel, sipWavePhase, sipsTaken]);

  useEffect(() => {
    const changed = previousIndex.current !== currentIndex;
    previousIndex.current = currentIndex;

    if (!changed) return;

    setSips([]);
    timeoutIds.current.forEach((id) => window.clearTimeout(id));
    timeoutIds.current = [];

    if (prefersReducedMotion) {
      setSipsTaken(0);
      setDisplayedLiquidColor(liquidColor);
      morphLiquidLevel.set(260);
      morphWavePhase.set(Math.ceil(morphWavePhase.get()));
      setMorphing(false);
      return;
    }

    let cancelled = false;
    let activeAnimations: Array<{ stop: () => void }> = [];
    const startingLiquidY = sipLiquidLevel.get();
    const drainDistance = 506 - startingLiquidY;
    const drainDuration = 0.34 + (drainDistance / 246) * 0.28;

    const runAnimations = async (
      levelTarget: number | number[],
      phaseAdvance: number,
      duration: number,
      ease: [number, number, number, number],
      times?: number[],
    ) => {
      const levelAnimation = animate(morphLiquidLevel, levelTarget, {
        duration,
        ease,
        times,
      });
      const waveAnimation = animate(morphWavePhase, morphWavePhase.get() + phaseAdvance, {
        duration: duration + 0.04,
        ease: [0.22, 1, 0.36, 1],
      });
      activeAnimations = [levelAnimation, waveAnimation];
      await Promise.all([levelAnimation, waveAnimation]);
    };

    const morphLiquid = async () => {
      setMorphing(true);
      morphLiquidLevel.set(startingLiquidY);
      morphWavePhase.set(sipWavePhase.get());

      await runAnimations(506, 0.82, drainDuration, [0.42, 0, 0.58, 1]);

      if (cancelled) return;
      setSipsTaken(0);
      setDisplayedLiquidColor(liquidColor);

      await runAnimations(
        [506, 440, 350, 278, 248],
        1.32,
        0.84,
        [0.3, 0.04, 0.18, 1],
        [0, 0.18, 0.43, 0.72, 1],
      );

      if (cancelled) return;

      await runAnimations(
        [248, 264, 258, 260],
        0.42,
        0.24,
        [0.22, 1, 0.36, 1],
        [0, 0.42, 0.76, 1],
      );

      if (!cancelled) setMorphing(false);
    };

    void morphLiquid();

    return () => {
      cancelled = true;
      activeAnimations.forEach((animation) => animation.stop());
    };
  }, [
    currentIndex,
    liquidColor,
    morphLiquidLevel,
    morphWavePhase,
    prefersReducedMotion,
    sipLiquidLevel,
    sipWavePhase,
  ]);

  useEffect(() => () => {
    timeoutIds.current.forEach((id) => window.clearTimeout(id));
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!interactive || interactionDisabled || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    handleSip();
  };

  return (
    <motion.div
      className={`cup-art ${interactive ? 'is-interactive' : ''}`}
      style={{ rotateX, rotateY, perspective: 1000, touchAction: 'pan-y' }}
      whileTap={motionEnabled ? { scale: 0.97 } : undefined}
      onTap={interactive && !interactionDisabled ? handleSip : undefined}
      onKeyDown={onKeyDown}
      role={interactive ? 'button' : undefined}
      aria-label={interactive ? 'Take a sip of bubble tea' : undefined}
      aria-disabled={interactive && interactionDisabled ? true : undefined}
      tabIndex={interactive && !interactionDisabled ? 0 : -1}
    >
      <motion.svg
        viewBox="0 0 400 550"
        className="cup-svg"
        style={{ x: cupX }}
        role="img"
        aria-label="A cup of bubble tea with pearls and a wide straw"
      >
        <defs>
          <clipPath id={storyClipId}>
            <rect data-cup-story-liquid-clip x="0" y="260" width="400" height="550" />
          </clipPath>
          <clipPath id={sipClipId}>
            <motion.path
              d={sipClipPath}
            />
          </clipPath>
          <clipPath id={morphClipId}>
            <motion.path
              d={morphClipPath}
            />
          </clipPath>
          <clipPath id={cupLiquidClipId}>
            <path d="M108 260h184l-17 220a25 25 0 0 1-25 20H150a25 25 0 0 1-25-20z" />
          </clipPath>
        </defs>

        <motion.ellipse
          cx="200"
          cy="510"
          rx="140"
          ry="18"
          fill="rgba(0,0,0,0.2)"
          animate={morphing
            ? { scaleX: [1, 0.91, 0.95, 1], opacity: [1, 0.78, 0.86, 1], y: [0, 3, 2, 0] }
            : { scaleX: 1, opacity: 1, y: 0 }}
          transition={morphing
            ? { duration: 1.72, times: [0, 0.18, 0.68, 1], ease: [0.22, 1, 0.36, 1] }
            : { duration: 0.2 }}
          style={{ transformOrigin: '200px 510px' }}
        />

        <path
          d="M105 200h190l-20 280a25 25 0 0 1-25 20H150a25 25 0 0 1-25-20z"
          fill="rgba(255,255,255,0.2)"
        />

        <g clipPath={`url(#${storyClipId})`}>
          <g clipPath={`url(#${sipClipId})`}>
            <g clipPath={`url(#${morphClipId})`}>
              <motion.path
                d="M108 260h184l-17 220a25 25 0 0 1-25 20H150a25 25 0 0 1-25-20z"
                animate={{ fill: displayedLiquidColor }}
                transition={{ duration: 0.08 }}
              />
            </g>
            <g clipPath={`url(#${cupLiquidClipId})`}>
              <motion.g
                initial={false}
                animate={{ opacity: morphing ? 1 : 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.12 }}
              >
                <motion.path
                  d={morphSurfacePath}
                  fill="none"
                  stroke="rgba(255,255,255,0.24)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </motion.g>
            </g>
          </g>
          <g clipPath={`url(#${morphClipId})`}>
            <g clipPath={`url(#${cupLiquidClipId})`}>
              <motion.path
                d={sipSurfacePath}
                initial={false}
                animate={{ opacity: morphing ? 0 : 1 }}
                transition={prefersReducedMotion
                  ? { duration: 0 }
                  : { opacity: { duration: 0.12 } }}
                fill="none"
                stroke="rgba(255,255,255,0.24)"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </g>
          </g>
        </g>

        <g data-cup-straw-shell>
          <motion.g
            style={{ x: strawX, y: strawY, transformOrigin: '238px 180px' }}
            animate={morphing
              ? { rotate: [0, -2.2, 1.6, -0.8, 0], y: [0, 3, -1, 1, 0] }
              : { rotate: 0, y: 0 }}
            transition={morphing
              ? { duration: 1.72, times: [0, 0.2, 0.58, 0.82, 1], ease: [0.22, 1, 0.36, 1] }
              : { duration: 0.2 }}
          >
            <motion.g
              drag={motionEnabled ? 'x' : false}
              dragConstraints={{ left: -80, right: 30 }}
              dragElastic={0.1}
              dragMomentum={false}
              onPointerDown={(event) => event.stopPropagation()}
              style={{ x: strawDragX, cursor: 'grab', touchAction: 'pan-y' }}
              whileDrag={{ cursor: 'grabbing' }}
            >
              <motion.g
                style={{ transformOrigin: '240px 180px' }}
                animate={motionEnabled && !morphing ? { rotate: [-3, 3, -3] } : { rotate: 0 }}
                transition={motionEnabled && !morphing ? { repeat: Infinity, duration: 2.6, ease: 'easeInOut' } : { duration: 0.2 }}
              >
                <polygon points="255,20 285,20 220,490 190,490" fill="rgba(255,255,255,0.7)" />

                {sips.map((sipId) => (
                  <g key={sipId}>
                    {[0, 1, 2].map((index) => (
                      <motion.circle
                        key={`${sipId}-${index}`}
                        r="13"
                        fill="#25211e"
                        initial={{ cx: 205, cy: 490, opacity: 0 }}
                        animate={{ cx: [205, 270], cy: [490, 20], opacity: [0, 1, 1, 0] }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.12,
                          ease: 'linear',
                          times: [0, 0.1, 0.9, 1],
                        }}
                      />
                    ))}
                  </g>
                ))}

                <polygon points="255,20 262,20 197,490 190,490" fill="rgba(255,255,255,0.9)" />
              </motion.g>
            </motion.g>
          </motion.g>
        </g>

        <g data-cup-pearls-shell>
          <motion.g style={{ x: bobaX, y: bobaY }}>
            <motion.g
              animate={motionEnabled ? { x: [-3, 3, -3], y: [0, 2, 0] } : { x: 0, y: 0 }}
              transition={motionEnabled ? { repeat: Infinity, duration: 2.6, ease: 'easeInOut' } : { duration: 0.2 }}
            >
              {BOBA_POSITIONS.map((position, index) => {
                const hiddenCount = Math.floor((sipsTaken / MAX_SIPS) * BOBA_POSITIONS.length);
                const hidden = index < hiddenCount;
                const stirX = index < 4 ? bobaStirXTop : index < 9 ? bobaStirXMid : bobaStirXBase;

                return (
                  <motion.g key={index} style={{ x: stirX }}>
                    <motion.circle
                      cx={position.cx}
                      cy={position.cy}
                      r="15"
                      fill="#25211e"
                      initial={false}
                      animate={hidden
                        ? { scale: 0, opacity: 0, x: 0, y: -20 }
                        : morphing
                          ? {
                              scale: [1, 1.02, 1, 1],
                              opacity: 1,
                              x: [0, index % 2 === 0 ? -5 : 6, index % 3 === 0 ? 8 : -4, 0],
                              y: [0, index % 2 === 0 ? 3 : -2, [1, 4, 8, 11].includes(index) ? -34 : -8, 0],
                            }
                          : { scale: 1, opacity: 1, x: 0, y: 0 }}
                      transition={morphing
                        ? {
                            duration: 1.58,
                            delay: (index % 4) * 0.022,
                            times: [0, 0.3, 0.72, 1],
                            ease: [0.22, 1, 0.36, 1],
                          }
                        : { duration: 0.3 }}
                    />
                  </motion.g>
                );
              })}
            </motion.g>
          </motion.g>
        </g>

        <path
          d="M90 190h220l-25 290a30 30 0 0 1-30 30H145a30 30 0 0 1-30-30z"
          fill="rgba(255,255,255,0.15)"
          stroke="rgba(255,255,255,0.62)"
          strokeWidth="4"
        />

        <g data-cup-lid>
          <path d="M80 180h240l-5 10H85z" fill="rgba(255,255,255,0.82)" />
          <rect x="75" y="175" width="250" height="6" rx="3" fill="rgba(255,255,255,0.97)" />
        </g>

        <polygon points="108,210 120,210 145,430 133,430" fill="rgba(255,255,255,0.5)" />
        <polygon points="128,210 135,210 155,340 148,340" fill="rgba(255,255,255,0.3)" />
      </motion.svg>
    </motion.div>
  );
}
