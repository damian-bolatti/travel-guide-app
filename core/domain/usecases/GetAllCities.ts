import { City } from "../entities/City";
import { CityRepository } from "../repositories/CityRepository";


export class GetAllCities {
  constructor(private readonly repository: CityRepository) {}

  async execute(): Promise<City[]> {
    return await this.repository.getAll();
  }
}