import { City } from "@/core/domain/entities/City";
import { GetAllCities } from "@/core/domain/usecases/GetAllCities";
import { CityRepositoryImpl } from "@/core/infrastructure/repositories/CityRepositoryImpl";
import { create } from "zustand";


interface CitiesState {
  cities: City[];
  selectedCity: City | null;
  isLoading: boolean;
  error: string | null;
  fetchCities: () => Promise<void>;
  setSelectedCity: (city: City) => void;
}

export const useCitiesStore = create<CitiesState>((set) => {
  const repository = new CityRepositoryImpl();
  const getAllCities = new GetAllCities(repository);

  return {
    cities: [],
    selectedCity: null,
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
    setSelectedCity: (city) => set({ selectedCity: city }),
  };
});