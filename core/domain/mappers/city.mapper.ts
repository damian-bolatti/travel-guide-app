import { CityDTO } from '../dtos/CityDTO';
import { City } from '../entities/City';

export const mapCityFromDTO = (dto: CityDTO): City => ({
  id: dto.id,
  key: dto.key,
  name: dto.name,
  nativeName: dto.nativeName,
  currency: dto.currency,
  language: dto.language || 'unknown',
});
