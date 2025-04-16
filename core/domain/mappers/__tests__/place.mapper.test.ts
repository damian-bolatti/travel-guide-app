import { PlaceDTO } from '../../dtos/PlaceDTO';
import { Place } from '../../entities/Place';
import { mapPlaceFromDTO } from '../place.mapper';

describe('mapPlaceFromDTO', () => {
  it('should map a monument correctly', () => {
    const dto: PlaceDTO = {
      key: 'Paris',
      place: {
        type: 'monument',
        name: 'Eiffel Tower',
        coordinates: [48.8584, 2.2945],
      },
    };

    const expected: Place = {
      type: 'monument',
      name: 'Eiffel Tower',
      coordinates: [48.8584, 2.2945],
    };

    expect(mapPlaceFromDTO(dto)).toEqual(expected);
  });

  it('should map a restaurant correctly', () => {
    const dto: PlaceDTO = {
      key: 'Paris',
      place: {
        type: 'restaurant',
        name: 'La Marée',
        coordinates: [48.8698, 2.3095],
      },
    };

    const expected: Place = {
      type: 'restaurant',
      name: 'La Marée',
      coordinates: [48.8698, 2.3095],
    };

    expect(mapPlaceFromDTO(dto)).toEqual(expected);
  });
});
