import React from 'react';
import { View, Text } from 'react-native';
import { Place } from '@/core/domain/entities/Place';

interface PlaceCardProps {
  place: Place;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  return (
    <View className="mb-3 p-4 bg-gray-100 rounded-lg shadow-sm">
      <Text className="text-base font-medium text-gray-900">{place.name}</Text>
      <Text className="text-sm text-gray-600">{place.type}</Text>
      <Text className="text-xs text-gray-500 mt-1">
        Lat: {place.coordinates[0]}, Lon: {place.coordinates[1]}
      </Text>
    </View>
  );
};

export default PlaceCard;
