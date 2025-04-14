import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { usePlaces } from '../hooks/usePlaces';
import { useCities } from '../hooks/useCities';
import Loader from '../shared/Loader';

const CityDetailsScreen = () => {
  const { selectedCity } = useCities();
  const { places, isLoading, error, reset } = usePlaces();

useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  if (!selectedCity) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-600">City not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-3xl font-bold mb-2">{selectedCity.name}</Text>
      <Text className="text-lg text-gray-600 italic mb-2">{selectedCity.nativeName}</Text>
      <Text className="text-base text-gray-700 mb-1">Currency: {selectedCity.currency}</Text>
      <Text className="text-base text-gray-700 mb-4">Language: {selectedCity.language}</Text>

      {isLoading && <Loader message="Loading places..." />}

      {places.length > 0 && (
        <View className="mt-4">
          <Text className="text-lg font-semibold mb-2">Places</Text>
          {places.map((place, idx) => (
            <View key={idx} className="mb-3">
              <Text className="text-base font-medium text-gray-900">{place.name}</Text>
              <Text className="text-sm text-gray-600">{place.type}</Text>
              <Text className="text-xs text-gray-400">
                Lat: {place.coordinates[0]}, Lon: {place.coordinates[1]}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default CityDetailsScreen;