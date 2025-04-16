import { usePlacesStore } from "../usePlacesStore";
import * as PlaceRepositoryImplModule from "@/core/infrastructure/repositories/PlaceRepositoryImpl";
import { Place } from "@/core/domain/entities/Place";

describe("usePlacesStore", () => {
  const mockPlaces: Place[] = [
    { type: "monument", name: "Eiffel Tower", coordinates: [48.8584, 2.2945] },
    {
      type: "restaurant",
      name: "Le Jules Verne",
      coordinates: [48.8584, 2.2945],
    },
  ];

  beforeEach(() => {
    usePlacesStore.getState().reset();
    jest.restoreAllMocks();
  });

  it("fetchPlaces should store places successfully", async () => {
    jest
      .spyOn(
        PlaceRepositoryImplModule.PlaceRepositoryImpl.prototype,
        "getByCityKey",
      )
      .mockResolvedValue(mockPlaces);

    await usePlacesStore.getState().fetchPlaces("paris");

    const state = usePlacesStore.getState();
    expect(state.places).toEqual(mockPlaces);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("fetchPlaces should handle error case", async () => {
    jest
      .spyOn(
        PlaceRepositoryImplModule.PlaceRepositoryImpl.prototype,
        "getByCityKey",
      )
      .mockRejectedValue(new Error("Network error"));

    await usePlacesStore.getState().fetchPlaces("paris");

    const state = usePlacesStore.getState();
    expect(state.places).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe("Network error");
  });

  it("reset should restore default state", () => {
    usePlacesStore.setState({
      places: mockPlaces,
      isLoading: true,
      error: "Some error",
    });

    usePlacesStore.getState().reset();

    expect(usePlacesStore.getState()).toMatchObject({
      places: [],
      isLoading: false,
      error: null,
    });
  });
});
