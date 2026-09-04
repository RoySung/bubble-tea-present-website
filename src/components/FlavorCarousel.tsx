import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FLAVORS, type Flavor } from '../flavors';

interface FlavorCarouselProps {
  active: boolean;
  currentIndex: number;
  flavor: Flavor;
  transitioning: boolean;
  onPaginate: (direction: number) => void;
  onSelect: (index: number) => void;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function FlavorCarousel({
  active,
  currentIndex,
  flavor,
  transitioning,
  onPaginate,
  onSelect,
}: FlavorCarouselProps) {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <div className="final-background" data-final-background aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            className="final-bg-layer"
            initial={reducedMotion ? false : {
              yPercent: 108,
              zIndex: 2,
            }}
            animate={reducedMotion
              ? { yPercent: 0, zIndex: 2 }
              : {
                  yPercent: [108, 68, 29, 0],
                  xPercent: [0, -1.2, 0.8, 0],
                  zIndex: 2,
                }}
            exit={{ zIndex: 1 }}
            transition={reducedMotion ? { duration: 0 } : {
              yPercent: { duration: 0.98, delay: 0.52, times: [0, 0.35, 0.72, 1], ease: easeOut },
              xPercent: { duration: 0.98, delay: 0.52, times: [0, 0.35, 0.72, 1], ease: 'easeInOut' },
            }}
          >
            <motion.div
              className="final-bg-wave"
              style={{ backgroundColor: flavor.bgTop }}
              animate={reducedMotion ? undefined : { scaleX: [1.02, 1.1, 1.04], rotate: [-1.2, 1, -0.4] }}
              transition={{ duration: 0.98, delay: 0.52, times: [0, 0.55, 1], ease: 'easeInOut' }}
            />
            <div className="final-bg-top" style={{ backgroundColor: flavor.bgTop }} />
            <div className="final-bg-bottom" style={{ backgroundColor: flavor.bgBottom }} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className={`final-ui ${active ? 'is-active' : ''}`}
        data-final-ui
        aria-hidden={!active}
        inert={!active ? true : undefined}
      >
        <div className="flavor-title-window">
          <AnimatePresence mode="sync" initial={false}>
            <motion.h2
              key={currentIndex}
              initial={reducedMotion ? false : { opacity: 0, y: 38 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.42, delay: 1.02, ease: easeOut },
              }}
              exit={{
                opacity: 0,
                y: -42,
                transition: reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.32, ease: easeOut },
              }}
              className="flavor-title"
            >
              {flavor.name}
            </motion.h2>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => onPaginate(-1)}
          className="flavor-arrow flavor-arrow-left"
          aria-label="Previous flavor"
          disabled={transitioning}
          tabIndex={active ? 0 : -1}
        >
          <ChevronLeft aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onPaginate(1)}
          className="flavor-arrow flavor-arrow-right"
          aria-label="Next flavor"
          disabled={transitioning}
          tabIndex={active ? 0 : -1}
        >
          <ChevronRight aria-hidden="true" />
        </button>

        <div className="flavor-controls">
          <div className="flavor-dots" aria-label="Choose a flavor">
            {FLAVORS.map((item, index) => (
              <button
                type="button"
                key={item.id}
                onClick={() => onSelect(index)}
                className={`flavor-dot ${index === currentIndex ? 'is-current' : ''}`}
                aria-label={`Show ${item.name}`}
                aria-current={index === currentIndex ? 'true' : undefined}
                disabled={transitioning}
                tabIndex={active ? 0 : -1}
              >
                <span />
              </button>
            ))}
          </div>
          <p className="interaction-hint">
            <span className="desktop-hint">Drag straw to stir</span>
            <span className="desktop-hint" aria-hidden="true">·</span>
            <span>Tap cup to drink</span>
          </p>
        </div>
      </div>
    </>
  );
}
