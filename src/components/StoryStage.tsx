import type { Flavor } from '../flavors';
import { STORY_BEATS } from '../storyBeats';
import FlavorCarousel from './FlavorCarousel';
import FlavorCup from './FlavorCup';
import {
  MilkPour,
  SealFilm,
  ServingPourStream,
  Shaker,
  ShakerBack,
  TeaPour,
} from './StoryObjects';

interface StoryStageProps {
  active: boolean;
  currentIndex: number;
  direction: number;
  flavor: Flavor;
  hidden: boolean;
  onPaginate: (direction: number) => void;
  onSelect: (index: number) => void;
}

export default function StoryStage({
  active,
  currentIndex,
  direction,
  flavor,
  hidden,
  onPaginate,
  onSelect,
}: StoryStageProps) {
  return (
    <section
      className="story-stage"
      data-scroll-stage
      aria-hidden={hidden}
      inert={hidden ? true : undefined}
    >
      <FlavorCarousel
        active={active}
        currentIndex={currentIndex}
        direction={direction}
        flavor={flavor}
        onPaginate={onPaginate}
        onSelect={onSelect}
      />

      <div className="story-background" data-story-background aria-hidden="true">
        <div className="story-bg-top" data-story-bg-top />
        <div className="story-bg-bottom" data-story-bg-bottom />
      </div>

      <div className="story-world" aria-hidden="true">
        <ShakerBack />
        <TeaPour />
        <MilkPour />
        <Shaker />
        <ServingPourStream />
        <SealFilm />
      </div>

      <div className={`story-cup-shell ${active ? 'is-active' : ''}`} data-cup-shell>
        <FlavorCup
          active={active}
          currentIndex={currentIndex}
          direction={direction}
          liquidColor={flavor.liquidColor}
        />
      </div>

      <div className="story-labels">
        {STORY_BEATS.map((beat) => (
          <div
            key={beat.id}
            className={`story-label story-label-${beat.id}`}
            data-step-label
            data-step-id={beat.id}
          >
            <p>{beat.step} / 08</p>
            {beat.id === 'intro' ? <h1>{beat.title}</h1> : <h2>{beat.title}</h2>}
            <span>{beat.caption}</span>
          </div>
        ))}
      </div>

      <div className="scroll-cue" data-scroll-cue aria-hidden="true">
        <span>Scroll to make</span>
        <i />
      </div>

      <div className="progress-rail" data-progress-rail aria-hidden="true">
        <span className="progress-track">
          <i data-progress-fill />
        </span>
        <ol>
          {STORY_BEATS.map((beat) => <li key={beat.id}>{beat.step}</li>)}
        </ol>
      </div>
    </section>
  );
}
