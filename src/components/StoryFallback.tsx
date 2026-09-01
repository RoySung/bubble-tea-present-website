import FlavorCarousel from './FlavorCarousel';
import FlavorCup from './FlavorCup';
import { STORY_BEATS } from '../storyBeats';
import type { Flavor } from '../flavors';

interface StoryFallbackProps {
  active: boolean;
  currentIndex: number;
  direction: number;
  flavor: Flavor;
  onPaginate: (direction: number) => void;
  onSelect: (index: number) => void;
}

export default function StoryFallback({
  active,
  currentIndex,
  direction,
  flavor,
  onPaginate,
  onSelect,
}: StoryFallbackProps) {
  return (
    <div className="story-fallback">
      <ol className="fallback-steps">
        {STORY_BEATS.slice(0, -1).map((beat) => (
          <li key={beat.id} className={`fallback-step tone-${beat.tone}`}>
            <div className="fallback-step-copy">
              <span>{beat.step} / 08</span>
              {beat.id === 'intro' ? <h1>{beat.title}</h1> : <h2>{beat.title}</h2>}
              <p>{beat.caption}</p>
            </div>
            <div className={`fallback-symbol symbol-${beat.id}`} aria-hidden="true">
              <span />
            </div>
          </li>
        ))}
        <li className="fallback-final" aria-label="Finished bubble tea">
          <div className="visually-hidden">
            <span>08 / 08</span>
            <h2>Ready</h2>
            <p>Pick a flavor, stir the pearls, and take a sip.</p>
          </div>
          <FlavorCarousel
            active={active}
            currentIndex={currentIndex}
            direction={direction}
            flavor={flavor}
            onPaginate={onPaginate}
            onSelect={onSelect}
          />
          <div className="fallback-cup-shell">
            <FlavorCup
              active={active}
              currentIndex={currentIndex}
              direction={direction}
              liquidColor={flavor.liquidColor}
            />
          </div>
        </li>
      </ol>
    </div>
  );
}
