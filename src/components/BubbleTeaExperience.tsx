import { useCallback, useRef, useState } from 'react';
import { FLAVORS } from '../flavors';
import { useBubbleTeaTimeline, type ExperienceMode } from '../hooks/useBubbleTeaTimeline';
import StoryFallback from './StoryFallback';
import StoryStage from './StoryStage';

export default function BubbleTeaExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<ExperienceMode>('pending');
  const [finalActive, setFinalActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((current) => {
      const next = current + newDirection;
      if (next < 0) return FLAVORS.length - 1;
      if (next >= FLAVORS.length) return 0;
      return next;
    });
  }, []);

  const selectFlavor = useCallback((index: number) => {
    setDirection(index === currentIndex ? 0 : index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

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
          direction={direction}
          flavor={flavor}
          onPaginate={paginate}
          onSelect={selectFlavor}
        />
      )}

      <StoryStage
        active={finalActive}
        currentIndex={currentIndex}
        direction={direction}
        flavor={flavor}
        hidden={!animated}
        onPaginate={paginate}
        onSelect={selectFlavor}
      />
    </main>
  );
}
