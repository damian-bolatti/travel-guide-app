import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { usePlaces } from '../hooks/usePlaces';
import { useCities } from '../hooks/useCities';
import Loader from '../shared/Loader';
import PlaceList from '../components/PlaceList';
import ErrorMessageProps from '../shared/ErrorMessage';


const CityDetailsScreen = () => {
  const { selectedCity } = useCities();
  const { places, isLoading, error, reset, fetchPlaces } = usePlaces();

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

      {error && (
        <ErrorMessageProps
        message={error}
        onRetry={() => fetchPlaces(selectedCity.key)}
      />
      )}

      {places.length > 0 && (
        <PlaceList places={places} />
      )}
    </ScrollView>
  );
};

export default CityDetailsScreen;