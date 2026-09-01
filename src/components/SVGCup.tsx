import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';

interface SVGCupProps {
  interactive?: boolean;
  liquidColor: string;
}

const MAX_SIPS = 6;

const BOBA_POSITIONS = [
  { cx: 150, cy: 375 }, { cx: 255, cy: 385 }, { cx: 180, cy: 390 }, { cx: 220, cy: 400 },
  { cx: 155, cy: 415 }, { cx: 195, cy: 420 }, { cx: 235, cy: 430 }, { cx: 140, cy: 445 },
  { cx: 175, cy: 445 }, { cx: 210, cy: 450 }, { cx: 250, cy: 460 }, { cx: 160, cy: 470 },
  { cx: 225, cy: 475 }, { cx: 190, cy: 480 },
];

export default function SVGCup({ interactive = false, liquidColor }: SVGCupProps) {
  const prefersReducedMotion = useReducedMotion();
  const motionEnabled = interactive && !prefersReducedMotion;
  const rawId = useId();
  const clipId = rawId.replace(/:/g, '');
  const storyClipId = `story-liquid-${clipId}`;
  const sipClipId = `sip-liquid-${clipId}`;
  const timeoutIds = useRef<number[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const strawDragX = useMotionValue(0);
  const smoothStrawDrag = useSpring(strawDragX, { damping: 20, stiffness: 100 });
  const bobaStirXBase = useTransform(smoothStrawDrag, [-80, 30], [-10, 15]);
  const bobaStirXMid = useTransform(smoothStrawDrag, [-80, 30], [-20, 25]);
  const bobaStirXTop = useTransform(smoothStrawDrag, [-80, 30], [-30, 35]);

  const [sips, setSips] = useState<number[]>([]);
  const [sipsTaken, setSipsTaken] = useState(0);

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
    if (!interactive) return;

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
  }, [interactive, sipsTaken]);

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

  useEffect(() => () => {
    timeoutIds.current.forEach((id) => window.clearTimeout(id));
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!interactive || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    handleSip();
  };

  return (
    <motion.div
      className={`cup-art ${interactive ? 'is-interactive' : ''}`}
      style={{ rotateX, rotateY, perspective: 1000, touchAction: 'pan-y' }}
      whileTap={motionEnabled ? { scale: 0.97 } : undefined}
      onTap={interactive ? handleSip : undefined}
      onKeyDown={onKeyDown}
      role={interactive ? 'button' : undefined}
      aria-label={interactive ? 'Take a sip of bubble tea' : undefined}
      tabIndex={interactive ? 0 : -1}
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
            <motion.rect
              x="0"
              initial={false}
              animate={{ y: 260 + (sipsTaken / MAX_SIPS) * 225 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              width="400"
              height="550"
            />
          </clipPath>
        </defs>

        <ellipse cx="200" cy="510" rx="140" ry="18" fill="rgba(0,0,0,0.2)" />

        <path
          d="M105 200h190l-20 280a25 25 0 0 1-25 20H150a25 25 0 0 1-25-20z"
          fill="rgba(255,255,255,0.2)"
        />

        <g clipPath={`url(#${storyClipId})`}>
          <g clipPath={`url(#${sipClipId})`}>
            <motion.path
              d="M108 260h184l-17 220a25 25 0 0 1-25 20H150a25 25 0 0 1-25-20z"
              animate={{ fill: liquidColor }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          </g>
        </g>

        <g data-cup-straw-shell>
          <motion.g style={{ x: strawX, y: strawY }}>
            <motion.g
              drag="x"
              dragConstraints={{ left: -80, right: 30 }}
              dragElastic={0.1}
              dragMomentum={false}
              onPointerDown={(event) => event.stopPropagation()}
              style={{ x: strawDragX, cursor: 'grab', touchAction: 'pan-y' }}
              whileDrag={{ cursor: 'grabbing' }}
            >
              <motion.g
                style={{ transformOrigin: '240px 180px' }}
                animate={motionEnabled ? { rotate: [-3, 3, -3] } : { rotate: 0 }}
                transition={motionEnabled ? { repeat: Infinity, duration: 2.6, ease: 'easeInOut' } : { duration: 0.2 }}
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
                      animate={{ scale: hidden ? 0 : 1, opacity: hidden ? 0 : 1, y: hidden ? -20 : 0 }}
                      transition={{ duration: 0.3 }}
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
