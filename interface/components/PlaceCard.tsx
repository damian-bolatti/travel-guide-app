import React from 'react';
import { View, Text } from 'react-native';
import { Place } from '@/core/domain/entities/Place';

interface PlaceCardProps {
  place: Place;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  return (
    <View className="bg-card-background dark:bg-card-background-dark p-4 rounded-sm mb-3">
      <Text className="text-xl font-work-bold text-text-header dark:text-text-header-dark mr-2">
        {place.name}
      </Text>
      <Text className="text-xl font-work-medium text-icon dark:text-icon-dark italic">
        {place.type}
      </Text>
      <Text className="text-xs text-icon dark:text-icon-dark mt-1">
        Lat: {place.coordinates[0]}, Lon: {place.coordinates[1]}
      </Text>
    </View>
  );
};

export default PlaceCard;
