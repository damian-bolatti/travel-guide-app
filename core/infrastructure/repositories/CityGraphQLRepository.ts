import { City } from "@/core/domain/entities/City";
import { CityRepository } from "@/core/domain/repositories/CityRepository";
import { fetchGraphQL } from "../graphql/fetchGraphQL";
import { mapCityFromDTO } from "@/core/domain/mappers/city.mapper";


export class CityGraphQLRepository implements CityRepository {
  async getAll(): Promise<City[]> {
    const query = `
      query {
        allCities {
          id
          key
          name
          nativeName
          currency
          language
        }
      }
    `;

    const data = await fetchGraphQL(query);
    return data.allCities.map(mapCityFromDTO);
  }
}