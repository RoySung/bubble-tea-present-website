import { useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FLAVORS } from '../flavors';
import { useBubbleTeaTimeline, type ExperienceMode } from '../hooks/useBubbleTeaTimeline';
import StoryFallback from './StoryFallback';
import StoryStage from './StoryStage';

export default function BubbleTeaExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const transitionTimer = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const [mode, setMode] = useState<ExperienceMode>('pending');
  const [finalActive, setFinalActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const beginTransition = useCallback((nextIndex: number) => {
    if (transitioning || nextIndex === currentIndex) return;

    setTransitioning(true);
    setCurrentIndex(nextIndex);

    if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
    transitionTimer.current = window.setTimeout(() => {
      setTransitioning(false);
      transitionTimer.current = null;
    }, reducedMotion ? 0 : 1850);
  }, [currentIndex, reducedMotion, transitioning]);

  const paginate = useCallback((newDirection: number) => {
    let nextIndex = currentIndex + newDirection;
    if (nextIndex < 0) nextIndex = FLAVORS.length - 1;
    if (nextIndex >= FLAVORS.length) nextIndex = 0;
    beginTransition(nextIndex);
  }, [beginTransition, currentIndex]);

  const selectFlavor = useCallback((index: number) => {
    beginTransition(index);
  }, [beginTransition]);

  useEffect(() => () => {
    if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
  }, []);

  useBubbleTeaTimeline({ rootRef, setFinalActive, setMode });

  const flavor = FLAVORS[currentIndex];
  const animated = mode === 'animated';
  const fallbackActive = mode === 'reduced' || mode === 'fallback';

  return (
    <main
      ref={rootRef}
      className={`experience experience-${mode}`}
      data-experience-mode={mode}
    >
      {animated ? null : (
        <StoryFallback
          active={fallbackActive}
          currentIndex={currentIndex}
          flavor={flavor}
          transitioning={transitioning}
          onPaginate={paginate}
          onSelect={selectFlavor}
        />
      )}

      <StoryStage
        active={finalActive}
        currentIndex={currentIndex}
        flavor={flavor}
        hidden={!animated}
        transitioning={transitioning}
        onPaginate={paginate}
        onSelect={selectFlavor}
      />
    </main>
  );
}
