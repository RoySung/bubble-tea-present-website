import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useState, useCallback } from 'react';

interface SVGCupProps {
  liquidColor: string;
}

export default function SVGCup({ liquidColor }: SVGCupProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Track straw drag for stirring pearls
  const strawDragX = useMotionValue(0);
  const smoothStrawDrag = useSpring(strawDragX, { damping: 20, stiffness: 100 });
  const bobaStirXBase = useTransform(smoothStrawDrag, [-80, 30], [-10, 15]);
  const bobaStirXMid = useTransform(smoothStrawDrag, [-80, 30], [-20, 25]);
  const bobaStirXTop = useTransform(smoothStrawDrag, [-80, 30], [-30, 35]);

  const [sips, setSips] = useState<number[]>([]);
  const [sipsTaken, setSipsTaken] = useState(0);
  const MAX_SIPS = 6;

  const bobaPositions = [
    { cx: 150, cy: 375 }, { cx: 255, cy: 385 }, { cx: 180, cy: 390 }, { cx: 220, cy: 400 },
    { cx: 155, cy: 415 }, { cx: 195, cy: 420 }, { cx: 235, cy: 430 }, { cx: 140, cy: 445 },
    { cx: 175, cy: 445 }, { cx: 210, cy: 450 }, { cx: 250, cy: 460 }, { cx: 160, cy: 470 },
    { cx: 225, cy: 475 }, { cx: 190, cy: 480 }
  ];

  const handleSip = useCallback(() => {
    if (sipsTaken >= MAX_SIPS) {
      setSipsTaken(0);
      return;
    }
    
    setSipsTaken(s => s + 1);
    const id = Date.now();
    setSips(prev => [...prev, id]);
    setTimeout(() => {
      setSips(prev => prev.filter(sipId => sipId !== id));
    }, 1500);
  }, [sipsTaken]);

  // Smooth the mouse values for fluid parallax
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax transforms for different layers
  const bobaX = useTransform(smoothX, [-500, 500], [-15, 15]);
  const bobaY = useTransform(smoothY, [-500, 500], [-10, 10]);
  const strawX = useTransform(smoothX, [-500, 500], [-25, 25]);
  const cupX = useTransform(smoothX, [-500, 500], [-5, 5]);
  
  // Rotate slightly based on mouse
  const rotateX = useTransform(smoothY, [-500, 500], [5, -5]);
  const rotateY = useTransform(smoothX, [-500, 500], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to center of screen
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      className="w-[280px] sm:w-[350px] md:w-[400px] h-auto origin-bottom cursor-pointer"
      style={{
        rotateX,
        rotateY,
        perspective: 1000
      }}
      whileTap={{ scale: 0.95 }}
      onTap={handleSip}
    >
      <motion.svg 
        viewBox="0 0 400 550" 
        className="w-full h-full drop-shadow-2xl overflow-visible"
        style={{ x: cupX }}
      >
        <defs>
          <clipPath id="liquid-clip">
            <motion.rect
              x="0"
              initial={{ y: 260 }}
              animate={{ y: 260 + (sipsTaken / MAX_SIPS) * 225 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
              width="400"
              height="550"
            />
          </clipPath>
        </defs>

        {/* Cup Shadow on the surface */}
        <ellipse cx="200" cy="510" rx="140" ry="18" fill="#B38B00" opacity="0.4" />

        {/* Back of the cup (inner wall) */}
        <path
          d="M 105 200 L 295 200 L 275 480 A 25 25 0 0 1 250 500 L 150 500 A 25 25 0 0 1 125 480 Z"
          fill="rgba(255,255,255,0.2)"
        />

        {/* Liquid */}
        <motion.path
          d="M 108 260 L 292 260 L 275 480 A 25 25 0 0 1 250 500 L 150 500 A 25 25 0 0 1 125 480 Z"
          animate={{ fill: liquidColor }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          clipPath="url(#liquid-clip)"
        />

        {/* Straw (moves more with parallax) */}
        <motion.g style={{ x: strawX, y: useTransform(bobaY, (val) => val * 0.5) }}>
          <motion.g
            drag="x"
            dragConstraints={{ left: -80, right: 30 }}
            dragElastic={0.1}
            onPointerDown={(e) => e.stopPropagation()}
            style={{ x: strawDragX, cursor: "grab" }}
            whileDrag={{ cursor: "grabbing" }}
          >
            <motion.g
              style={{ transformOrigin: "240px 180px" }}
              animate={{ rotate: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              {/* Straw Back/Main Tube */}
            <polygon points="255,20 285,20 220,490 190,490" fill="rgba(255,255,255,0.7)" />
            
            {/* Dynamic Sucking Bobas */}
            {sips.map((sipId) => (
              <g key={sipId}>
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={`${sipId}-${i}`}
                    r="13"
                    fill="#25211E"
                    initial={{ cx: 205, cy: 490, opacity: 0 }}
                    animate={{ cx: [205, 270], cy: [490, 20], opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.12,
                      ease: "linear",
                      times: [0, 0.1, 0.9, 1]
                    }}
                  />
                ))}
              </g>
            ))}

            {/* Straw Front highlight */}
            <polygon points="255,20 262,20 197,490 190,490" fill="rgba(255,255,255,0.9)" />
            </motion.g>
          </motion.g>
        </motion.g>

        {/* Boba pearls at the bottom (with parallax) */}
        <motion.g style={{ x: bobaX, y: bobaY }}>
          <motion.g
            animate={{ x: [-4, 4, -4], y: [0, 2, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
              delay: 0.1
            }}
          >
            {bobaPositions.map((pos, idx) => {
              const hiddenCount = Math.floor((sipsTaken / MAX_SIPS) * bobaPositions.length);
              const isHidden = idx < hiddenCount;
              
              // Top layer moves most, base layer moves least
              const stirX = idx < 4 ? bobaStirXTop : idx < 9 ? bobaStirXMid : bobaStirXBase;

              return (
                <motion.g key={idx} style={{ x: stirX }}>
                  <motion.circle
                    cx={pos.cx}
                    cy={pos.cy}
                    r="15"
                    fill="#25211E"
                    initial={false}
                    animate={{
                      scale: isHidden ? 0 : 1,
                      opacity: isHidden ? 0 : 1,
                      y: isHidden ? -20 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.g>
              );
            })}
          </motion.g>
        </motion.g>

        {/* Cup Front body (plastic layer) */}
        <path
          d="M 90 190 L 310 190 L 285 480 A 30 30 0 0 1 255 510 L 145 510 A 30 30 0 0 1 115 480 Z"
          fill="rgba(255,255,255,0.15)"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="4"
        />

        {/* Cup Lid & Lip */}
        <path d="M 80 180 L 320 180 L 315 190 L 85 190 Z" fill="rgba(255,255,255,0.8)" />
        <rect x="75" y="175" width="250" height="6" rx="3" fill="rgba(255,255,255,0.95)" />

        {/* Specular Highlights (shiny reflections) */}
        <polygon points="108,210 120,210 145,430 133,430" fill="rgba(255,255,255,0.5)" />
        <polygon points="128,210 135,210 155,340 148,340" fill="rgba(255,255,255,0.3)" />
      </motion.svg>
    </motion.div>
  );
}
