import { City } from "@/core/domain/entities/City";
import { GetAllCities } from "@/core/domain/usecases/GetAllCities";
import { CityRepositoryImpl } from "@/core/infrastructure/repositories/CityRepositoryImpl";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface CitiesState {
  cities: City[];
  selectedCity: City | null;
  isLoading: boolean;
  error: string | null;
  fetchCities: () => Promise<void>;
  setSelectedCity: (city: City) => void;
  reset: () => void;
}

export const useCitiesStore = create<CitiesState>()(
  devtools((set) => {
    const repository = new CityRepositoryImpl();
    const getAllCities = new GetAllCities(repository);

    return {
      cities: [],
      selectedCity: null,
      isLoading: false,
      error: null,

      fetchCities: async () => {
        set({ isLoading: true, error: null }, false, 'cities/fetchCities');
        try {
          const cities = await getAllCities.execute();
          set({ cities, isLoading: false }, false, 'cities/fetchCitiesSuccess');
        } catch (err: any) {
          set(
            {
              error: err.message || 'Error fetching cities',
              isLoading: false,
            },
            false,
            'cities/fetchCitiesError'
          );
        }
      },

      setSelectedCity: (city) => {
        set({ selectedCity: city }, false, 'cities/setSelectedCity');
      },

      reset: () => {
        set(
          {
            cities: [],
            selectedCity: null,
            error: null,
            isLoading: false,
          },
          false,
          'cities/reset'
        );
      },
    };
  }, { name: 'CitiesStore' })
);