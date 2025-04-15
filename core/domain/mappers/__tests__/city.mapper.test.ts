import { CityDTO } from '../../dtos/CityDTO';
import { mapCityFromDTO } from '../city.mapper';

describe('mapCityFromDTO', () => {
  it('should correctly map a CityDTO to a City entity', () => {
    const dto: CityDTO = {
      id: 1,
      key: 'barcelona',
      name: 'Barcelona',
      nativeName: 'Barcelona',
      currency: 'EUR',
      language: 'es',
    };

    const entity = mapCityFromDTO(dto);

    expect(entity).toEqual({
      id: 1,
      key: 'barcelona',
      name: 'Barcelona',
      nativeName: 'Barcelona',
      currency: 'EUR',
      language: 'es',
    });
  });

  it('should fallback to "unknown" when language is empty', () => {
    const dto: CityDTO = {
      id: 2,
      key: 'mystery-city',
      name: 'Mystery',
      nativeName: 'Mystery',
      currency: 'XYZ',
      language: '',
    };

    const entity = mapCityFromDTO(dto);
    expect(entity.language).toBe('unknown');
  });
});
