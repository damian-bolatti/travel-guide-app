import { useCitiesStore } from '@/core/interface/store/useCitiesStore';
import { usePlacesStore } from '@/core/interface/store/usePlacesStore';
import { useCallback, useEffect } from 'react';

export const usePlaces = () => {
  const { selectedCity } = useCitiesStore();
  const {
    places,
    isLoading,
    error,
    fetchPlaces,
  } = usePlacesStore();

  useEffect(() => {
    if (selectedCity) {
      fetchPlaces(selectedCity.key);
    }
  }, [selectedCity]);

  const reset = useCallback(() => {
    usePlacesStore.getState().reset();
    }, []);

  return {
    places,
    isLoading,
    error,
    fetchPlaces,
    reset,
  };
};
