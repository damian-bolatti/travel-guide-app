import { City } from '../entities/City';

export interface CityRepository {
  getAll(): Promise<City[]>;
}
