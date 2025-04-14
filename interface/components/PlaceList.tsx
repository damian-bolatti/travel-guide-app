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
    <View className="mt-4">
      <Text className="text-lg font-semibold mb-2">Places</Text>

      {places.map((place, idx) => (
        <PlaceCard key={idx} place={place} />
      ))}
    </View>
  );
};

export default PlaceList;
