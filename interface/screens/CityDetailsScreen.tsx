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

  const hasPlaces = places.length > 0;
  const canShowPlaces = !isLoading && !error && hasPlaces;
  const showEmptyState = !isLoading && !error && !hasPlaces;

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
      <View
        testID="no-city"
        className="flex-1 justify-center items-center bg-background dark:bg-background-dark"
      >
        <Text className="text-icon dark:text-icon-dark">City not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      testID="city-details"
      className="flex-1 px-4 bg-background dark:bg-background-dark"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Text
        testID="city-native-name"
        className="text-2xl font-work-medium text-text dark:text-text-dark italic mb-1"
      >
        ({selectedCity.nativeName})
      </Text>
      <Text
        testID="city-currency"
        className="text-base text-text dark:text-text-dark font-work-light mb-1"
      >
        Currency: {selectedCity.currency}
      </Text>
      <Text
        testID="city-language"
        className="text-base text-text dark:text-text-dark font-work-light mb-4"
      >
        Language: {selectedCity.language}
      </Text>

      {isLoading && <Loader message="Loading places..." />}

      {error && (
        <Retry message={error} onRetry={() => fetchPlaces(selectedCity.key)} />
      )}

      {showEmptyState && (
        <Retry
          message="No places available"
          onRetry={() => fetchPlaces(selectedCity.key)}
        />
      )}

      {canShowPlaces && <PlaceList places={places} />}
    </ScrollView>
  );
};

export default CityDetailsScreen;
