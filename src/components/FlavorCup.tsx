import { motion, useAnimationControls, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import SVGCup from './SVGCup';

interface FlavorCupProps {
  active: boolean;
  currentIndex: number;
  liquidColor: string;
  transitioning: boolean;
}

export default function FlavorCup({
  active,
  currentIndex,
  liquidColor,
  transitioning,
}: FlavorCupProps) {
  const controls = useAnimationControls();
  const reducedMotion = useReducedMotion();
  const previousIndex = useRef(currentIndex);

  useEffect(() => {
    const changed = previousIndex.current !== currentIndex;
    previousIndex.current = currentIndex;

    if (!active || !changed || reducedMotion) return;

    controls.set({ y: 0, scaleX: 1, scaleY: 1 });
    void controls.start({
      y: [0, 9, 6, 0],
      scaleX: [1, 1.006, 1.003, 1],
      scaleY: [1, 0.984, 0.99, 1],
      transition: {
        duration: 1.76,
        times: [0, 0.16, 0.63, 1],
        ease: [0.22, 1, 0.36, 1],
      },
    });
  }, [active, controls, currentIndex, reducedMotion]);

  return (
    <motion.div
      className="cup-flavor-motion"
      initial={false}
      animate={controls}
      style={{ transformOrigin: '50% 100%' }}
    >
      <SVGCup
        currentIndex={currentIndex}
        liquidColor={liquidColor}
        interactive={active}
        interactionDisabled={transitioning}
      />
    </motion.div>
  );
}
