import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type ExperienceMode = 'pending' | 'animated' | 'reduced' | 'fallback';

interface UseBubbleTeaTimelineOptions {
  rootRef: RefObject<HTMLElement | null>;
  setFinalActive: (active: boolean) => void;
  setMode: (mode: ExperienceMode) => void;
}

const STEP_WINDOWS = [
  [0, 10], [10, 22], [22, 34], [34, 49],
  [49, 62], [62, 73], [73, 84], [84, 92],
] as const;

export function useBubbleTeaTimeline({
  rootRef,
  setFinalActive,
  setMode,
}: UseBubbleTeaTimelineOptions) {
  useGSAP(() => {
    const root = rootRef.current;
    const stage = root?.querySelector<HTMLElement>('[data-scroll-stage]');

    if (!root || !stage) {
      setMode('fallback');
      setFinalActive(true);
      return;
    }

    const media = gsap.matchMedia();

    media.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
        isLandscape: '(max-height: 640px) and (orientation: landscape)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { isMobile, isLandscape, reduceMotion } = context.conditions as {
          isMobile: boolean;
          isLandscape: boolean;
          reduceMotion: boolean;
        };

        if (reduceMotion) {
          setMode('reduced');
          setFinalActive(true);
          return;
        }

        try {
        const query = <T extends Element>(selector: string) => stage.querySelector<T>(selector);
        const queryAll = <T extends Element>(selector: string) => gsap.utils.toArray<T>(selector, stage);

        const storyBg = query<HTMLElement>('[data-story-background]');
        const bgTop = query<HTMLElement>('[data-story-bg-top]');
        const bgBottom = query<HTMLElement>('[data-story-bg-bottom]');
        const finalBackground = query<HTMLElement>('[data-final-background]');
        const finalUi = query<HTMLElement>('[data-final-ui]');
        const shaker = query<HTMLElement>('[data-shaker]');
        const teaVessel = query<HTMLElement>('[data-tea-vessel]');
        const teaStream = query<HTMLElement>('[data-tea-stream]');
        const milkVessel = query<HTMLElement>('[data-milk-vessel]');
        const milkStream = query<HTMLElement>('[data-milk-stream]');
        const servingStream = query<HTMLElement>('[data-serving-stream]');
        const cupShell = query<HTMLElement>('[data-cup-shell]');
        const cupLiquidClip = query<SVGRectElement>('[data-cup-story-liquid-clip]');
        const cupLid = query<SVGGElement>('[data-cup-lid]');
        const cupStraw = query<SVGGElement>('[data-cup-straw-shell]');
        const cupPearls = query<SVGGElement>('[data-cup-pearls-shell]');
        const sealFilm = query<HTMLElement>('[data-seal-film]');
        const progressRail = query<HTMLElement>('[data-progress-rail]');
        const progressFill = query<HTMLElement>('[data-progress-fill]');
        const scrollCue = query<HTMLElement>('[data-scroll-cue]');
        const stepLabels = queryAll<HTMLElement>('[data-step-label]');

        const requiredTargets = [
          storyBg, bgTop, bgBottom, finalBackground, finalUi, shaker,
          teaVessel, teaStream, milkVessel, milkStream, servingStream,
          cupShell, cupLiquidClip, cupLid, cupStraw, cupPearls, sealFilm,
          progressRail, progressFill, scrollCue,
        ];

        if (requiredTargets.some((target) => !target) || stepLabels.length !== 8) {
          setMode('fallback');
          setFinalActive(true);
          return;
        }

        const pourX = isLandscape ? 88 : isMobile ? 105 : 128;
        const pourY = isLandscape ? -78 : isMobile ? -128 : -155;
        const cupEntryX = isMobile ? -82 : -190;
        const shakeX = isMobile ? 58 : 105;
        let finalIsActive = false;

        const syncFinalState = (progress: number) => {
          const nextActive = progress >= 0.94;
          if (nextActive === finalIsActive) return;
          finalIsActive = nextActive;
          setFinalActive(nextActive);
        };

        gsap.set(bgTop, { yPercent: -100, xPercent: 0 });
        gsap.set(bgBottom, { yPercent: 100, xPercent: 0 });
        gsap.set(finalBackground, { autoAlpha: 0 });
        gsap.set(finalUi, { autoAlpha: 0, y: 28 });
        gsap.set(stepLabels, { autoAlpha: 0, y: 32 });
        gsap.set(stepLabels[0], { autoAlpha: 1, y: 0 });
        gsap.set(shaker, { autoAlpha: 0, yPercent: 70, scale: 0.84, rotation: 0 });
        gsap.set(teaVessel, {
          autoAlpha: 0,
          xPercent: -2.5,
          x: isMobile ? 90 : 180,
          y: -24,
          rotation: -5,
          transformOrigin: '2.5% 42%',
        });
        gsap.set(teaStream, { autoAlpha: 0, xPercent: -50, scaleY: 0, transformOrigin: '50% 0%' });
        gsap.set(milkVessel, {
          autoAlpha: 0,
          xPercent: -96,
          x: isMobile ? -90 : -180,
          y: -22,
          rotation: 5,
          transformOrigin: '96% 24%',
        });
        gsap.set(milkStream, { autoAlpha: 0, xPercent: -50, scaleY: 0, transformOrigin: '50% 0%' });
        gsap.set(servingStream, {
          autoAlpha: 0,
          xPercent: -50,
          scaleY: 0,
          rotation: isMobile ? -22 : 7,
          transformOrigin: '50% 0%',
        });
        gsap.set(cupShell, { autoAlpha: 0, x: cupEntryX, y: 180, scale: 0.84 });
        gsap.set(cupLiquidClip, { attr: { y: 500 } });
        gsap.set(cupLid, { autoAlpha: 0, y: -18 });
        gsap.set(cupStraw, { autoAlpha: 0, y: -210 });
        gsap.set(cupPearls, { autoAlpha: 1, y: 0 });
        gsap.set(sealFilm, { autoAlpha: 0, xPercent: -160 });
        gsap.set(progressFill, { scaleY: 0, transformOrigin: '50% 0%' });
        gsap.set(progressRail, { autoAlpha: 1 });
        gsap.set(scrollCue, { autoAlpha: 1, y: 0 });

        setFinalActive(false);

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: 'bubble-tea-story',
            trigger: stage,
            start: 'top top',
            end: () => `+=${window.innerHeight * 8}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => syncFinalState(self.progress),
            onRefresh: (self) => syncFinalState(self.progress),
          },
        });

        timeline.to(progressFill, { scaleY: 1, duration: 100 }, 0);

        STEP_WINDOWS.forEach(([start, end], index) => {
          timeline.addLabel(['intro', 'tea', 'milk', 'shake', 'pour', 'seal', 'straw', 'serve'][index], start);
          if (index > 0) {
            timeline.to(stepLabels[index], { autoAlpha: 1, y: 0, duration: 1.6 }, start + 0.35);
          }
          timeline.to(stepLabels[index], { autoAlpha: 0, y: -28, duration: 1.25 }, end - 1.5);
        });

        timeline
          .to(bgTop, { yPercent: 0, duration: 5.5 }, 0)
          .to(bgBottom, { yPercent: 0, duration: 5.5 }, 0)
          .to(scrollCue, { autoAlpha: 0, y: 18, duration: 1.5 }, 7.5)

          .to(shaker, { autoAlpha: 1, yPercent: -50, scale: 1, duration: 3 }, 10)
          .to(teaVessel, { autoAlpha: 1, x: 0, y: 0, rotation: -5, duration: 2.5 }, 10.5)
          .to(teaStream, { autoAlpha: 1, scaleY: 1, duration: 1.3 }, 12)
          .to(teaVessel, { rotation: -12, duration: 7 }, 13)
          .to(teaStream, { scaleY: 0, autoAlpha: 0, duration: 1.2 }, 20)
          .to(teaVessel, { autoAlpha: 0, x: isMobile ? 72 : 145, y: -40, duration: 1.5 }, 20)

          .to(bgTop, { backgroundColor: '#d6587b', duration: 3.5 }, 22)
          .to(bgBottom, { backgroundColor: '#82a15e', duration: 3.5 }, 22)
          .to(milkVessel, { autoAlpha: 1, x: 0, y: 0, rotation: 5, duration: 2.5 }, 22.3)
          .to(milkStream, { autoAlpha: 1, scaleY: 1, duration: 1.3 }, 24)
          .to(milkVessel, { rotation: 12, duration: 7 }, 25)
          .to(milkStream, { scaleY: 0, autoAlpha: 0, duration: 1.2 }, 32)
          .to(milkVessel, { autoAlpha: 0, x: isMobile ? -72 : -145, y: -42, duration: 1.5 }, 32)

          .to(bgTop, { backgroundColor: '#704128', xPercent: -3, duration: 2 }, 34)
          .to(bgBottom, { backgroundColor: '#f0dab1', xPercent: 4, duration: 2 }, 34)
          .to(shaker, { x: -shakeX, rotation: -12, duration: 2.2 }, 34)
          .to(shaker, { x: shakeX, rotation: 13, duration: 2.2 }, 36.2)
          .to(shaker, { x: -shakeX * 0.88, rotation: -10, duration: 2.2 }, 38.4)
          .to(shaker, { x: shakeX * 0.78, rotation: 9, duration: 2.2 }, 40.6)
          .to(shaker, { x: 0, rotation: 0, duration: 3.8 }, 42.8)
          .to(bgTop, { xPercent: 0, duration: 3 }, 45)
          .to(bgBottom, { xPercent: 0, duration: 3 }, 45)

          .to(bgTop, { backgroundColor: '#d84339', duration: 3 }, 49)
          .to(bgBottom, { backgroundColor: '#f0dab1', duration: 3 }, 49)
          .to(cupShell, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 4 }, 49)
          .to(shaker, { x: pourX, y: pourY, rotation: -55, duration: 3.5 }, 49)
          .to(servingStream, { autoAlpha: 1, scaleY: 1, duration: 1.3 }, 52)
          .to(cupLiquidClip, { attr: { y: 260 }, duration: 8.5 }, 52.5)
          .to(servingStream, { scaleY: 0, autoAlpha: 0, duration: 1.2 }, 60.5)
          .to(shaker, { autoAlpha: 0, x: pourX + 90, y: -210, duration: 1.5 }, 60.5)

          .to(bgTop, { backgroundColor: '#2458d8', duration: 2.5 }, 62)
          .to(bgBottom, { backgroundColor: '#f6d20b', duration: 2.5 }, 62)
          .to(sealFilm, { autoAlpha: 1, xPercent: 160, duration: 8 }, 63)
          .to(cupLid, { autoAlpha: 1, y: 0, duration: 1 }, 67)
          .to(sealFilm, { autoAlpha: 0, duration: 0.6 }, 71)

          .to(bgTop, { backgroundColor: '#d6587b', duration: 2.5 }, 73)
          .to(bgBottom, { backgroundColor: '#82a15e', duration: 2.5 }, 73)
          .to(cupStraw, { autoAlpha: 1, y: 0, duration: 7 }, 74)
          .to(cupShell, { y: 12, duration: 0.9 }, 80.7)
          .to(cupPearls, { y: -10, duration: 0.9 }, 80.7)
          .to(cupShell, { y: 0, duration: 1.5 }, 81.6)
          .to(cupPearls, { y: 0, duration: 1.5 }, 81.6)

          .to(finalBackground, { autoAlpha: 1, duration: 4 }, 84)
          .to(storyBg, { autoAlpha: 0, duration: 4 }, 84)
          .to(cupShell, { yPercent: -45, scale: isMobile ? 0.92 : 0.96, duration: 5 }, 84)
          .to(finalUi, { autoAlpha: 1, y: 0, duration: 5 }, 88)
          .to(progressRail, { autoAlpha: 0, duration: 2 }, 90);

        setMode('animated');
        syncFinalState(timeline.scrollTrigger?.progress ?? 0);

        let cancelled = false;
        document.fonts.ready.then(() => {
          if (!cancelled) ScrollTrigger.refresh();
        });

        return () => {
          cancelled = true;
          finalIsActive = false;
        };
        } catch (error) {
          console.error('Bubble tea timeline could not initialize.', error);
          setMode('fallback');
          setFinalActive(true);
        }
      },
      root,
    );

    return () => media.revert();
  }, { scope: rootRef });
}
