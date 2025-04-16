import { Place } from '../entities/Place';

export interface PlaceRepository {
  getByCityKey(key: string): Promise<Place[]>;
}
