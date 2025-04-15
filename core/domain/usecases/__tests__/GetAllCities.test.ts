import { City } from "../../entities/City";
import { CityRepository } from "../../repositories/CityRepository";
import { GetAllCities } from "../GetAllCities";


describe('GetAllCities', () => {
    const mockCities: City[] = [
        {
          id: 1,
          key: 'paris',
          name: 'Paris',
          nativeName: 'Paris',
          currency: 'EUR',
          language: 'fr',
        },
        {
          id: 2,
          key: 'barcelona',
          name: 'Barcelona',
          nativeName: 'Barcelona',
          currency: 'EUR',
          language: 'es',
        },
      ];

  let mockRepository: jest.Mocked<CityRepository>;
  let useCase: GetAllCities;

  beforeEach(() => {
    mockRepository = {
      getAll: jest.fn().mockResolvedValue(mockCities),
    };
    useCase = new GetAllCities(mockRepository);
  });

  it('should return all cities from the repository', async () => {
    const result = await useCase.execute();
    expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockCities);
  });

  it('should propagate errors from the repository', async () => {
    const error = new Error('Repository failure');
    mockRepository.getAll.mockRejectedValueOnce(error);

    await expect(useCase.execute()).rejects.toThrow('Repository failure');
  });
});
