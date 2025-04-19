import { useCities } from '@/interface/hooks/useCities';
import CityList from '@/interface/components/CityList';
import React, { useLayoutEffect } from 'react';
import { View, Pressable } from 'react-native';
import Loader from '../shared/Loader';
import Retry from '../shared/Retry';
import { useNavigation } from 'expo-router';
import { Icon } from '../shared/Icon';

const CitiesScreen = () => {
  const { cities, isLoading, error, fetchCities } = useCities();
  const navigation = useNavigation();

  const hasCities = cities.length > 0;
  const canShowList = !isLoading && !error && hasCities;
  const showEmptyState = !isLoading && !error && !hasCities;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.navigate('settings/index' as never)}
          className="pl-2"
          testID="go-to-settings"
        >
          <Icon name="Settings" color="normal"/>
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View
      className="flex-1 px-4 bg-background dark:bg-background-dark"
      testID="cities-screen"
    >
      {isLoading && <Loader message="Loading cities..." />}

      {!isLoading && (error || showEmptyState) && (
        <Retry message={error || 'No cities available'} onRetry={fetchCities} />
      )}

      {canShowList && <CityList cities={cities} />}
    </View>
  );
};

export default CitiesScreen;
