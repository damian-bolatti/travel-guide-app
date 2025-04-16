import { useCallback, useEffect } from 'react';
import { useCitiesStore } from '@/core/interface/store/useCitiesStore';
import { usePlacesStore } from '@/core/interface/store/usePlacesStore';

export const usePlaces = () => {
  const { selectedCity } = useCitiesStore();
  const { places, isLoading, error, fetchPlaces } = usePlacesStore();

  useEffect(() => {
    const shouldFetch =
      selectedCity &&
      selectedCity.key &&
      places.length === 0 &&
      !isLoading &&
      !error;

    if (shouldFetch) {
      fetchPlaces(selectedCity.key);
    }
  }, [selectedCity, places.length, isLoading, error, fetchPlaces]);

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
