import { PlaceDTO } from "../dtos/PlaceDTO";
import { Place } from "../entities/Place";

export const mapPlaceFromDTO = (dto: PlaceDTO): Place => {
    return {
      type: dto.place.type,
      name: dto.place.name,
      coordinates: dto.place.coordinates,
    };
  };