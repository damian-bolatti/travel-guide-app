import { CityRepositoryImpl } from "../CityRepositoryImpl";
import { fetchGraphQL } from "../../graphql/fetchGraphQL";
import { mapCityFromDTO } from "@/core/domain/mappers/city.mapper";
import { City } from "@/core/domain/entities/City";

jest.mock("../../graphql/fetchGraphQL");
jest.mock("@/core/domain/mappers/city.mapper");

const mockedFetchGraphQL = fetchGraphQL as jest.Mock;
const mockedMapCityFromDTO = mapCityFromDTO as jest.Mock;

describe("CityRepositoryImpl", () => {
  const repository = new CityRepositoryImpl();

  const mockCityDTOs = [
    {
      id: 1,
      key: "paris",
      name: "Paris",
      nativeName: "Paris",
      currency: "EUR",
      language: "fr",
    },
    {
      id: 2,
      key: "barcelona",
      name: "Barcelona",
      nativeName: "Barcelona",
      currency: "EUR",
      language: "es",
    },
  ];

  const mockCities: City[] = [
    {
      id: 1,
      key: "paris",
      name: "Paris",
      nativeName: "Paris",
      currency: "EUR",
      language: "fr",
    },
    {
      id: 2,
      key: "barcelona",
      name: "Barcelona",
      nativeName: "Barcelona",
      currency: "EUR",
      language: "es",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockedFetchGraphQL.mockResolvedValue({ allCities: mockCityDTOs });
    mockedMapCityFromDTO.mockImplementation((dto: any) =>
      mockCities.find((c) => c.key === dto.key),
    );
  });

  it("should call fetchGraphQL with correct query and return mapped cities", async () => {
    const result = await repository.getAll();

    expect(mockedFetchGraphQL).toHaveBeenCalledWith(
      expect.stringContaining("query {"),
    );
    expect(mockedMapCityFromDTO).toHaveBeenCalledTimes(mockCityDTOs.length);
    expect(result).toEqual(mockCities);
  });

  it("should propagate errors from fetchGraphQL", async () => {
    mockedFetchGraphQL.mockRejectedValueOnce(new Error("GraphQL error"));

    await expect(repository.getAll()).rejects.toThrow("GraphQL error");
  });
});
