import { Place } from "../../entities/Place";
import { PlaceRepository } from "../../repositories/PlaceRepository";
import { GetPlacesByCityKey } from "../GetPlacesByCityKey";


describe('GetPlacesByCityKey', () => {
  const mockPlaces: Place[] = [
    {
      type: 'monument',
      name: 'Sagrada Familia',
      coordinates: [41.4036, 2.1744],
    },
    {
      type: 'restaurant',
      name: 'Tickets',
      coordinates: [41.3751, 2.1624],
    },
  ];

  let mockRepository: jest.Mocked<PlaceRepository>;
  let useCase: GetPlacesByCityKey;

  beforeEach(() => {
    mockRepository = {
      getByCityKey: jest.fn().mockResolvedValue(mockPlaces),
    };
    useCase = new GetPlacesByCityKey(mockRepository);
  });

  it('should return places for a given city key', async () => {
    const result = await useCase.execute('barcelona');

    expect(mockRepository.getByCityKey).toHaveBeenCalledWith('barcelona');
    expect(result).toEqual(mockPlaces);
  });

  it('should propagate errors from the repository', async () => {
    const error = new Error('DB error');
    mockRepository.getByCityKey.mockRejectedValueOnce(error);

    await expect(useCase.execute('paris')).rejects.toThrow('DB error');
  });
});
