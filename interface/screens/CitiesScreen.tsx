import { useCities } from '@/interface/hooks/useCities';
import CityList from '@/interface/components/CityList';
import React, { useEffect, useLayoutEffect } from 'react';
import { View, Pressable } from 'react-native';
import Loader from '../shared/Loader';
import Retry from '../shared/Retry';
import { useNavigation } from 'expo-router';
import { Icon } from '../shared/Icon';

const CitiesScreen = () => {
  const { cities, isLoading, error, fetchCities, reset } = useCities();
  const navigation = useNavigation();

  const showEmptyState = !isLoading && !error && cities.length === 0;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation.navigate('settings/index' as never)} className="pl-2">
          <Icon name="Settings"/>
        </Pressable>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <View className="flex-1 px-4 bg-background dark:bg-background-dark">
      {isLoading && <Loader message="Loading cities..." />}

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
