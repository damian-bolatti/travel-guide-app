import { City } from "@/core/domain/entities/City";
import { GetAllCities } from "@/core/domain/usecases/GetAllCities";
import { CityGraphQLRepository } from "@/core/infrastructure/repositories/CityGraphQLRepository";
import { create } from "zustand";


interface CitiesState {
  cities: City[];
  isLoading: boolean;
  error: string | null;
  fetchCities: () => Promise<void>;
}

export const useCitiesStore = create<CitiesState>((set) => {
  const repository = new CityGraphQLRepository();
  const getAllCities = new GetAllCities(repository);

  return {
    cities: [],
    isLoading: false,
    error: null,

    fetchCities: async () => {
      set({ isLoading: true, error: null });

      try {
        const cities = await getAllCities.execute();
        set({ cities, isLoading: false });
      } catch (err: any) {
        set({ error: err.message || 'Error fetching cities', isLoading: false });
      }
    },
  };
});