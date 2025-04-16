import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { City } from "@/core/domain/entities/City";
import { GetAllCities } from "@/core/domain/usecases/GetAllCities";
import { CityRepositoryImpl } from "@/core/infrastructure/repositories/CityRepositoryImpl";

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
  devtools(
    persist(
      (set, get) => {
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
              await AsyncStorage.setItem("cities", JSON.stringify(cities));
            } catch (err: any) {
              let message = "Unexpected error";
              if (err.message === "No internet connection") {
                message =
                  "No internet connection. Please check your network and try again.";
              } else if (err.message.toLowerCase().includes("timeout")) {
                message = "The request timed out. Please try again later.";
              } else if (err.message.toLowerCase().includes("graphql")) {
                message =
                  "There was a problem retrieving city data from the server.";
              } else if (err.message) {
                message = err.message;
              }

              const storedCities = await AsyncStorage.getItem("cities");
              if (storedCities) {
                set({ cities: JSON.parse(storedCities), isLoading: false });
              }

              set({
                error: message,
                isLoading: false,
              });
            }
          },

          setSelectedCity: (city) => {
            set({ selectedCity: city });
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
              "cities/reset",
            );
          },
        };
      },
      {
        name: "cities-storage",
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
    { name: "CitiesStore" },
  ),
);
