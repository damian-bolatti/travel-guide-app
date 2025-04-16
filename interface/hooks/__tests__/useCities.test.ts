import { renderHook, act } from "@testing-library/react-native";
import { useCities } from "../useCities";
import { City } from "@/core/domain/entities/City";

import { useCitiesStore } from "@/core/interface/store/useCitiesStore";

jest.mock("@/core/interface/store/useCitiesStore", () => ({
  useCitiesStore: jest.fn(),
}));

const mockedUseCitiesStore = useCitiesStore as unknown as jest.Mock;

const mockCity: City = {
  id: 1,
  key: "paris",
  name: "Paris",
  nativeName: "Paris",
  currency: "EUR",
  language: "fr",
};

describe("useCities", () => {
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

    useCitiesStore.getState = () => ({
      cities: [mockCity],
      isLoading: false,
      error: null,
      selectedCity: null,
      fetchCities,
      setSelectedCity,
      reset,
    });
  });

  it("calls fetchCities on mount when cities are empty", () => {
    mockedUseCitiesStore.mockImplementation(() => ({
      cities: [],
      isLoading: false,
      error: null,
      selectedCity: null,
      fetchCities,
      setSelectedCity,
    }));

    renderHook(() => useCities());

    expect(fetchCities).toHaveBeenCalled();
  });

  it("does NOT call fetchCities on mount when cities are already loaded", () => {
    renderHook(() => useCities());

    expect(fetchCities).not.toHaveBeenCalled();
  });

  it("does NOT call fetchCities on mount when loading or error is present", () => {
    mockedUseCitiesStore.mockImplementation(() => ({
      cities: [],
      isLoading: true,
      error: null,
      selectedCity: null,
      fetchCities,
      setSelectedCity,
    }));

    renderHook(() => useCities());
    expect(fetchCities).not.toHaveBeenCalled();

    mockedUseCitiesStore.mockImplementation(() => ({
      cities: [],
      isLoading: false,
      error: "Network error",
      selectedCity: null,
      fetchCities,
      setSelectedCity,
    }));

    renderHook(() => useCities());
    expect(fetchCities).not.toHaveBeenCalled();
  });

  it("returns correct values from store", () => {
    const { result } = renderHook(() => useCities());

    expect(result.current.cities).toEqual([mockCity]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.selectedCity).toBeNull();
    expect(result.current.fetchCities).toBe(fetchCities);
  });

  it("calls setSelectedCity with correct city", () => {
    const { result } = renderHook(() => useCities());

    act(() => {
      result.current.selectCity(mockCity);
    });

    expect(setSelectedCity).toHaveBeenCalledWith(mockCity);
  });

  it("calls reset from Zustand store", () => {
    const { result } = renderHook(() => useCities());

    act(() => {
      result.current.reset();
    });

    expect(reset).toHaveBeenCalled();
  });
});
