import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { usePlaces } from '../hooks/usePlaces';
import { useCities } from '../hooks/useCities';
import Loader from '../shared/Loader';
import PlaceList from '../components/PlaceList';
import Retry from '../shared/Retry';
import { useNavigation } from '@react-navigation/native';


const CityDetailsScreen = () => {
  const navigation = useNavigation();
  const { selectedCity } = useCities();
  const { places, isLoading, error, reset, fetchPlaces } = usePlaces();

  const showEmptyState = !isLoading && !error && places.length === 0;

  useLayoutEffect(() => {
    if (selectedCity) {
      navigation.setOptions({ title: selectedCity.name });
    }
  }, [navigation, selectedCity]);

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
    <ScrollView className="flex-1 px-4 bg-white">
        <Text className="text-2xl font-work-medium text-gray-400 italic mb-1">({selectedCity.nativeName})</Text>
        <Text className="text-base text-gray-700 font-work-light mb-1">Currency: {selectedCity.currency}</Text>
        <Text className="text-base text-gray-700 font-work-light mb-4">Language: {selectedCity.language}</Text>

        {isLoading && <Loader message="Loading places..." />}

        {error && (
        <Retry
        message={error}
        onRetry={() => fetchPlaces(selectedCity.key)}
        />
        )}

        {showEmptyState && (
        <Retry
            message="No cities available"
            onRetry={() => fetchPlaces(selectedCity.key)}
        />
        )}

        {!isLoading && !error && places.length > 0 && (
        <PlaceList places={places} />
        )}
    </ScrollView>
  );
};

export default CityDetailsScreen;