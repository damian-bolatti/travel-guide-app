import { useCities } from '@/interface/hooks/useCities';
import CityList from '@/interface/components/CityList';
import React from 'react';
import { View, Text } from 'react-native';
import Loader from '../shared/Loader';
import Retry from '../shared/Retry';

const CitiesScreen = () => {
    const { cities, isLoading, error, fetchCities } = useCities();

    const showEmptyState = !isLoading && !error && cities.length === 0;

  return (
    <View className="flex-1 bg-gray-100 px-4 py-6">
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