import { Place } from '../entities/Place';
import { PlaceRepository } from '../repositories/PlaceRepository';

export class GetPlacesByCityKey {
  constructor(private readonly repository: PlaceRepository) {}

  async execute(key: string): Promise<Place[]> {
    return this.repository.getByCityKey(key);
  }
}
