export interface PlaceDTO {
    key: string;
    place: {
      type: 'monument' | 'restaurant';
      name: string;
      coordinates: [number, number];
    };
  }