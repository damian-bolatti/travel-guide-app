import { useCities } from '@/interface/hooks/useCities';
import CityList from '@/interface/components/CityList';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const CitiesScreen = () => {
    const { cities, isLoading, error } = useCities();

  return (
    <View className="flex-1 bg-gray-100 px-4 py-6">
      <Text className="text-2xl font-bold mb-4 text-gray-900">Cities</Text>

      {isLoading && (
        <Text className="text-gray-600">Loading cities...</Text>
      )}

      {error && (
        <Text className="text-red-500">Error: {error}</Text>
      )}

      {!isLoading && !error && (
        <CityList cities={cities} />
      )}
    </View>
  );
};

export default CitiesScreen;