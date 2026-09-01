import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FLAVORS, type Flavor } from '../flavors';

interface FlavorCarouselProps {
  active: boolean;
  currentIndex: number;
  direction: number;
  flavor: Flavor;
  onPaginate: (direction: number) => void;
  onSelect: (index: number) => void;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function FlavorCarousel({
  active,
  currentIndex,
  direction,
  flavor,
  onPaginate,
  onSelect,
}: FlavorCarouselProps) {
  return (
    <>
      <div className="final-background" data-final-background aria-hidden="true">
        <motion.div
          className="final-bg-top"
          initial={false}
          animate={{ backgroundColor: flavor.bgTop }}
          transition={{ duration: 0.65, ease: easeOut }}
        />
        <motion.div
          className="final-bg-bottom"
          initial={false}
          animate={{ backgroundColor: flavor.bgBottom }}
          transition={{ duration: 0.65, ease: easeOut }}
        />
      </div>

      <div
        className={`final-ui ${active ? 'is-active' : ''}`}
        data-final-ui
        aria-hidden={!active}
        inert={!active ? true : undefined}
      >
        <div className="flavor-title-window">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.h2
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, y: direction > 0 ? 34 : -34 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction > 0 ? -34 : 34 }}
              transition={{ duration: 0.42, ease: easeOut }}
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
          tabIndex={active ? 0 : -1}
        >
          <ChevronLeft aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onPaginate(1)}
          className="flavor-arrow flavor-arrow-right"
          aria-label="Next flavor"
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
