import React from 'react';
import { View, Text } from 'react-native';
import { Place } from '@/core/domain/entities/Place';
import PlaceCard from './PlaceCard';

interface PlaceListProps {
  places: Place[];
}

const PlaceList = ({ places }: PlaceListProps) => {
  if (!places.length) return null;

  return (
    <View className="mt-4" testID="place-list">
      <Text
        testID="place-list-title"
        className="text-xl font-work-bold text-text-header dark:text-text-header-dark mb-2"
      >
        Places to visit:
      </Text>

      {places.map((place, idx) => (
        <PlaceCard key={idx} place={place} />
      ))}
    </View>
  );
};

export default PlaceList;
