import { motion, useAnimationControls, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import SVGCup from './SVGCup';

interface FlavorCupProps {
  active: boolean;
  currentIndex: number;
  direction: number;
  liquidColor: string;
}

export default function FlavorCup({
  active,
  currentIndex,
  direction,
  liquidColor,
}: FlavorCupProps) {
  const controls = useAnimationControls();
  const reducedMotion = useReducedMotion();
  const previousIndex = useRef(currentIndex);

  useEffect(() => {
    const changed = previousIndex.current !== currentIndex;
    previousIndex.current = currentIndex;

    if (!active || !changed || reducedMotion) return;

    controls.set({ opacity: 0, x: direction > 0 ? 120 : -120 });
    void controls.start({
      opacity: 1,
      x: 0,
      transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
    });
  }, [active, controls, currentIndex, direction, reducedMotion]);

  return (
    <motion.div className="cup-flavor-motion" initial={false} animate={controls}>
      <SVGCup liquidColor={liquidColor} interactive={active} />
    </motion.div>
  );
}
