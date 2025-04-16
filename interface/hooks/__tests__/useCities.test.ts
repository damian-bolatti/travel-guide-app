import { renderHook, act } from '@testing-library/react-native';
import { useCities } from '../useCities';
import { City } from '@/core/domain/entities/City';

jest.mock('@/core/interface/store/useCitiesStore', () => ({
  useCitiesStore: jest.fn(),
}));

import { useCitiesStore } from '@/core/interface/store/useCitiesStore';

const mockedUseCitiesStore = useCitiesStore as unknown as jest.Mock;

const mockCity: City = {
  id: 1,
  key: 'paris',
  name: 'Paris',
  nativeName: 'Paris',
  currency: 'EUR',
  language: 'fr',
};

describe('useCities', () => {
  const fetchCities = jest.fn();
  const setSelectedCity = jest.fn();
  const reset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseCitiesStore.mockImplementation(() => ({
      cities: [mockCity],
      isLoading: false,
      error: null,
      selectedCity: null,
      fetchCities,
      setSelectedCity,
    }));

    // 👇 getState must return a fully valid CitiesState
    useCitiesStore.getState = () => ({
      cities: [mockCity],
      isLoading: false,
      error: null,
      selectedCity: null,
      fetchCities: jest.fn(),
      setSelectedCity: jest.fn(),
      reset,
    });
  });

  it('calls fetchCities on mount', () => {
    renderHook(() => useCities());
    expect(fetchCities).toHaveBeenCalled();
  });

  it('returns correct values from store', () => {
    const { result } = renderHook(() => useCities());

    expect(result.current.cities).toEqual([mockCity]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.selectedCity).toBeNull();
  });

  it('calls setSelectedCity with correct city', () => {
    const { result } = renderHook(() => useCities());

    act(() => {
      result.current.selectCity(mockCity);
    });

    expect(setSelectedCity).toHaveBeenCalledWith(mockCity);
  });

  it('calls reset from Zustand store', () => {
    const { result } = renderHook(() => useCities());

    act(() => {
      result.current.reset();
    });

    expect(reset).toHaveBeenCalled();
  });
});
