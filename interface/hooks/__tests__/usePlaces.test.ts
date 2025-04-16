import { renderHook, act } from "@testing-library/react-native";
import { usePlaces } from "../usePlaces";
import { City } from "@/core/domain/entities/City";
import { Place } from "@/core/domain/entities/Place";

import { useCitiesStore } from "@/core/interface/store/useCitiesStore";
import { usePlacesStore } from "@/core/interface/store/usePlacesStore";

jest.mock("@/core/interface/store/useCitiesStore", () => ({
  useCitiesStore: jest.fn(),
}));

jest.mock("@/core/interface/store/usePlacesStore", () => ({
  usePlacesStore: jest.fn(),
}));

const mockedUseCitiesStore = useCitiesStore as unknown as jest.Mock;
const mockedUsePlacesStore = usePlacesStore as unknown as jest.Mock;

const mockCity: City = {
  id: 1,
  key: "paris",
  name: "Paris",
  nativeName: "Paris",
  currency: "EUR",
  language: "fr",
};

const mockPlaces: Place[] = [
  {
    name: "Eiffel Tower",
    type: "monument",
    coordinates: [48.8584, 2.2945],
  },
];

describe("usePlaces", () => {
  const fetchPlaces = jest.fn();
  const reset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseCitiesStore.mockImplementation(() => ({
      selectedCity: mockCity,
    }));

    mockedUsePlacesStore.mockImplementation(() => ({
      places: mockPlaces,
      isLoading: false,
      error: null,
      fetchPlaces,
    }));

    usePlacesStore.getState = () => ({
      places: mockPlaces,
      isLoading: false,
      error: null,
      fetchPlaces: jest.fn(),
      reset,
    });
  });

  it("calls fetchPlaces when selectedCity is present and places are empty", () => {
    mockedUsePlacesStore.mockImplementation(() => ({
      places: [], // 👈 necesario para que fetch se dispare
      isLoading: false,
      error: null,
      fetchPlaces,
    }));

    renderHook(() => usePlaces());
    expect(fetchPlaces).toHaveBeenCalledWith("paris");
  });

  it("does NOT call fetchPlaces when places are already loaded", () => {
    renderHook(() => usePlaces());
    expect(fetchPlaces).not.toHaveBeenCalled();
  });

  it("does NOT call fetchPlaces when loading or error is present", () => {
    mockedUsePlacesStore.mockImplementation(() => ({
      places: [],
      isLoading: true,
      error: null,
      fetchPlaces,
    }));

    renderHook(() => usePlaces());
    expect(fetchPlaces).not.toHaveBeenCalled();

    mockedUsePlacesStore.mockImplementation(() => ({
      places: [],
      isLoading: false,
      error: "Something went wrong",
      fetchPlaces,
    }));

    renderHook(() => usePlaces());
    expect(fetchPlaces).not.toHaveBeenCalled();
  });

  it("returns the correct store values", () => {
    const { result } = renderHook(() => usePlaces());

    expect(result.current.places).toEqual(mockPlaces);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.fetchPlaces).toBe(fetchPlaces);
  });

  it("calls reset from Zustand store", () => {
    const { result } = renderHook(() => usePlaces());

    act(() => {
      result.current.reset();
    });

    expect(reset).toHaveBeenCalled();
  });
});
