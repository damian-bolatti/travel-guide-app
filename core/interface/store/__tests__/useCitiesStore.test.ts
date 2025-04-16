import { useCitiesStore } from '../useCitiesStore';
import * as CityRepositoryImplModule from '@/core/infrastructure/repositories/CityRepositoryImpl';
import { City } from '@/core/domain/entities/City';

describe('useCitiesStore', () => {
  const mockCities: City[] = [
    {
      id: 1,
      key: 'paris',
      name: 'Paris',
      nativeName: 'Paris',
      currency: 'EUR',
      language: 'fr',
    },
  ];

  beforeEach(() => {
    useCitiesStore.getState().reset();
    jest.restoreAllMocks();
  });

  it('fetchCities should store cities successfully', async () => {
    jest
      .spyOn(CityRepositoryImplModule.CityRepositoryImpl.prototype, 'getAll')
      .mockResolvedValue(mockCities);

    await useCitiesStore.getState().fetchCities();

    const state = useCitiesStore.getState();
    expect(state.cities).toEqual(mockCities);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('fetchCities should handle error case', async () => {
    jest
      .spyOn(CityRepositoryImplModule.CityRepositoryImpl.prototype, 'getAll')
      .mockRejectedValue(new Error('Network error'));

    await useCitiesStore.getState().fetchCities();

    const state = useCitiesStore.getState();
    expect(state.cities).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Network error');
  });

  it('setSelectedCity should update selectedCity', () => {
    const city = mockCities[0];
    useCitiesStore.getState().setSelectedCity(city);

    expect(useCitiesStore.getState().selectedCity).toEqual(city);
  });

  it('reset should restore default state', () => {
    useCitiesStore.setState({
      cities: mockCities,
      selectedCity: mockCities[0],
      isLoading: true,
      error: 'Some error',
    });

    useCitiesStore.getState().reset();

    expect(useCitiesStore.getState()).toMatchObject({
      cities: [],
      selectedCity: null,
      isLoading: false,
      error: null,
    });
  });
});
