import { useEffect, useCallback } from 'react';
import { City } from '@/core/domain/entities/City';
import { useCitiesStore } from '../../core/interface/store/useCitiesStore';

export const useCities = () => {
  const {
    cities,
    isLoading,
    error,
    fetchCities,
    selectedCity,
    setSelectedCity,
  } = useCitiesStore();

  useEffect(() => {
    if (cities.length === 0 && !isLoading && !error) {
      fetchCities();
    }
  }, [cities.length, isLoading, error, fetchCities]);

  const selectCity = (city: City) => {
    setSelectedCity(city);
  };

  const reset = useCallback(() => {
    useCitiesStore.getState().reset();
  }, []);

  return {
    cities,
    isLoading,
    error,
    selectedCity,
    selectCity,
    reset,
    fetchCities,
  };
};
