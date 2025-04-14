import { useCities } from '@/interface/hooks/useCities';
import CityList from '@/interface/components/CityList';
import React from 'react';
import { View, Text } from 'react-native';
import Loader from '../shared/Loader';
import ErrorMessageProps from '../shared/ErrorMessage';

const CitiesScreen = () => {
    const { cities, isLoading, error, fetchCities } = useCities();

  return (
    <View className="flex-1 bg-gray-100 px-4 py-6">
      <Text className="text-2xl font-bold mb-4 text-gray-900">Cities</Text>

      {isLoading && (
        <Loader message="Loading cities..." />
      )}

      {error && (
        <ErrorMessageProps
        message={error}
        onRetry={fetchCities}
      />
      )}

      {!isLoading && !error && (
        <CityList cities={cities} />
      )}
    </View>
  );
};

export default CitiesScreen;