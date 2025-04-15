import React from 'react';
import { View, Text } from 'react-native';
import { Place } from '@/core/domain/entities/Place';

interface PlaceCardProps {
  place: Place;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  return (
    <View className="bg-slate-50 p-4 rounded-sm mb-3">
      <Text className="text-xl font-work-bold text-gray-800 mr-2">{place.name}</Text>
      <Text className="text-xl font-work-medium text-gray-400 italic">{place.type}</Text>
      <Text className="text-xs text-gray-500 mt-1">
        Lat: {place.coordinates[0]}, Lon: {place.coordinates[1]}
      </Text>
    </View>
  );
};

export default PlaceCard;
