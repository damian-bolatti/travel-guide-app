import { useCities } from '@/interface/hooks/useCities';
import CityList from '@/interface/components/CityList';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Loader from '../shared/Loader';
import Retry from '../shared/Retry';

const CitiesScreen = () => {
    const { cities, isLoading, error, fetchCities, reset } = useCities();

    const showEmptyState = !isLoading && !error && cities.length === 0;

    useEffect(() => {
        return () => {
          reset();
        };
      }, []);

  return (
    <View className="flex-1 px-4 bg-white">
        {isLoading && (
        <Loader message="Loading cities..." />
        )}

        {error && (
        <Retry
        message={error}
        onRetry={fetchCities}
        />
        )}

        {showEmptyState && (
        <Retry
            message="No cities available"
            onRetry={fetchCities}
        />
        )}

        {!isLoading && !error && cities.length > 0 && (
        <CityList cities={cities} />
        )}
    </View>
  );
};

export default CitiesScreen;