export interface StoryBeat {
  id: 'intro' | 'tea' | 'milk' | 'shake' | 'pour' | 'seal' | 'straw' | 'serve';
  step: string;
  title: string;
  caption: string;
  progress: string;
  tone: string;
}

export const STORY_BEATS: StoryBeat[] = [
  {
    id: 'intro',
    step: '01',
    title: 'Bubble Tea',
    caption: 'Scroll to make it from the very first pour.',
    progress: '0–10%',
    tone: 'blue',
  },
  {
    id: 'tea',
    step: '02',
    title: 'Pure Tea',
    caption: 'Freshly brewed tea lands in the shaker.',
    progress: '10–22%',
    tone: 'tea',
  },
  {
    id: 'milk',
    step: '03',
    title: 'Add Milk',
    caption: 'Milk folds into tea and softens the color.',
    progress: '22–34%',
    tone: 'pink',
  },
  {
    id: 'shake',
    step: '04',
    title: 'Shake',
    caption: 'A quick sweep brings the drink together.',
    progress: '34–49%',
    tone: 'brown',
  },
  {
    id: 'pour',
    step: '05',
    title: 'Pour',
    caption: 'The finished milk tea fills the serving cup.',
    progress: '49–62%',
    tone: 'red',
  },
  {
    id: 'seal',
    step: '06',
    title: 'Seal',
    caption: 'A clean sweep locks in every drop.',
    progress: '62–73%',
    tone: 'blue',
  },
  {
    id: 'straw',
    step: '07',
    title: 'Straw In',
    caption: 'One decisive push and it is ready to drink.',
    progress: '73–84%',
    tone: 'pink',
  },
  {
    id: 'serve',
    step: '08',
    title: 'Ready',
    caption: 'Pick a flavor, stir the pearls, and take a sip.',
    progress: '84–100%',
    tone: 'blue',
  },
];
