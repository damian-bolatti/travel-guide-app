import { create } from 'zustand';
import { Place } from '@/core/domain/entities/Place';
import { GetPlacesByCityKey } from '@/core/domain/usecases/GetPlacesByCityKey';
import { PlaceRepositoryImpl } from '@/core/infrastructure/repositories/PlaceRepositoryImpl';

interface PlacesState {
    places: Place[];
    isLoading: boolean;
    error: string | null;
    fetchPlaces: (key: string) => Promise<void>;
    reset: () => void;
  }
  
  export const usePlacesStore = create<PlacesState>((set) => {
    const repository = new PlaceRepositoryImpl();
    const getPlacesByCityKey = new GetPlacesByCityKey(repository);
  
    return {
      places: [],
      isLoading: false,
      error: null,
  
      fetchPlaces: async (key: string) => {
        set({ isLoading: true, error: null });
  
        try {
          const places = await getPlacesByCityKey.execute(key);
          set({ places, isLoading: false });
        } catch (err: any) {
          set({ error: err.message || "Error fetching places", isLoading: false });
        }
      },
  
      reset: () => set({ places: [], error: null, isLoading: false }),
    };
  });
