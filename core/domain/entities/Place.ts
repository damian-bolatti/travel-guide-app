export interface Place {
  type: 'monument' | 'restaurant';
  name: string;
  coordinates: [number, number];
}
