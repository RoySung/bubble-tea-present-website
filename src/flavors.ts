export interface Flavor {
  id: string;
  name: string;
  liquidColor: string;
  bgTop: string;
  bgBottom: string;
}

export const FLAVORS: Flavor[] = [
  {
    id: 'classic',
    name: 'Classic Milk Tea',
    liquidColor: '#E6C69A',
    bgTop: '#0B4EDC',
    bgBottom: '#FDD507'
  },
  {
    id: 'matcha',
    name: 'Matcha Latte',
    liquidColor: '#A1B77B',
    bgTop: '#D6587B',
    bgBottom: '#82A15E'
  },
  {
    id: 'chocolate',
    name: 'Chocolate Milk Tea',
    liquidColor: '#6B4423',
    bgTop: '#D84339',
    bgBottom: '#F0DAB1'
  }
];
