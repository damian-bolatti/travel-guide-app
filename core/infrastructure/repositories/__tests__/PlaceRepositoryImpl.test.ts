import { PlaceRepositoryImpl } from "../PlaceRepositoryImpl";
import { fetchGraphQL } from "@/core/infrastructure/graphql/fetchGraphQL";
import { mapPlaceFromDTO } from "@/core/domain/mappers/place.mapper";
import { Place } from "@/core/domain/entities/Place";

jest.mock("@/core/infrastructure/graphql/fetchGraphQL");
jest.mock("@/core/domain/mappers/place.mapper");

const mockedFetchGraphQL = fetchGraphQL as jest.Mock;
const mockedMapPlaceFromDTO = mapPlaceFromDTO as jest.Mock;

describe("PlaceRepositoryImpl", () => {
  const repository = new PlaceRepositoryImpl();

  const mockPlaceDTOs = [
    {
      key: "barcelona",
      place: {
        type: "monument",
        name: "Sagrada Familia",
        coordinates: [41.4036, 2.1744],
      },
    },
    {
      key: "paris",
      place: {
        type: "monument",
        name: "Eiffel Tower",
        coordinates: [48.8584, 2.2945],
      },
    },
  ];

  const mockMappedPlaces: Place[] = [
    {
      type: "monument",
      name: "Sagrada Familia",
      coordinates: [41.4036, 2.1744],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockedFetchGraphQL.mockResolvedValue({ allPlaces: mockPlaceDTOs });
    mockedMapPlaceFromDTO.mockImplementation((dto: any) =>
      dto.place.name === "Sagrada Familia" ? mockMappedPlaces[0] : null,
    );
  });

  it("should fetch and return mapped places filtered by city key", async () => {
    const result = await repository.getByCityKey("barcelona");

    expect(mockedFetchGraphQL).toHaveBeenCalledWith(
      expect.stringContaining("query"),
    );
    expect(mockedMapPlaceFromDTO).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockMappedPlaces);
  });

  it("should return empty array if no places match the key", async () => {
    const result = await repository.getByCityKey("tokyo");

    expect(mockedMapPlaceFromDTO).not.toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it("should propagate errors from fetchGraphQL", async () => {
    mockedFetchGraphQL.mockRejectedValueOnce(new Error("GraphQL Error"));

    await expect(repository.getByCityKey("barcelona")).rejects.toThrow(
      "GraphQL Error",
    );
  });
});
