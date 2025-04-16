import { PlaceRepository } from '@/core/domain/repositories/PlaceRepository';
import { fetchGraphQL } from '@/core/infrastructure/graphql/fetchGraphQL';
import { Place } from '@/core/domain/entities/Place';
import { mapPlaceFromDTO } from '@/core/domain/mappers/place.mapper';

export class PlaceRepositoryImpl implements PlaceRepository {
  async getByCityKey(key: string): Promise<Place[]> {
    const query = `
      query {
        allPlaces {
          key
          place
        }
      }
    `;

    const data = await fetchGraphQL(query);

    return data.allPlaces
      .filter((p: any) => p.key === key)
      .map(mapPlaceFromDTO);
  }
}
