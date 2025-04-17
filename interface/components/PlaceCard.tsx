import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Place } from '@/core/domain/entities/Place';
import * as LucideIcons from 'lucide-react-native';
import { Icon } from '../shared/Icon';
import { openInMaps } from '@/core/infrastructure/maps/openInMaps';

export type IconName = keyof typeof LucideIcons;

const sanitize = (name: string) => name.replace(/\s+/g, '-').toLowerCase();

const typeToIconMap: Record<Place['type'], IconName> = {
  restaurant: 'Store',
  monument: 'Landmark',
};

interface PlaceCardProps {
  place: Place;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  const iconName = typeToIconMap[place.type];

  const handleOpenMap = () => {
    const [lat, lon] = place.coordinates;
    openInMaps(lat, lon);
  };

  return (
    <View
      testID={`PlaceCard-${sanitize(place.name)}`}
      className="bg-card-background dark:bg-card-background-dark p-4 rounded-lg mb-3"
    >
      <View className="flex-row justify-between items-center">
        {/* Izquierda: icono + información */}
        <View className="flex-row flex-1 pr-4">
          <View className="mr-4 mt-1">
            <Icon name={iconName} size={62} color="soft" />
          </View>

          <View className="flex-1">
            <Text
              testID={`PlaceCard-${sanitize(place.name)}-name`}
              className="text-xl font-work-bold text-text-header dark:text-text-dark mb-1"
            >
              {place.name}
            </Text>
            <Text
              testID={`PlaceCard-${sanitize(place.name)}-type`}
              className="text-base font-work-medium text-text dark:text-text-dark italic"
            >
              ({place.type})
            </Text>
            <Text
              testID={`PlaceCard-${sanitize(place.name)}-coordinates`}
              className="text-xs text-text font-work-light dark:text-icon-dark mt-1"
            >
              Lat: {place.coordinates[0]}, Lon: {place.coordinates[1]}
            </Text>
          </View>
        </View>

        {/* Derecha: botón vertical centrado */}
        <TouchableOpacity
          onPress={handleOpenMap}
          className="items-center justify-center w-16"
          testID={`PlaceCard-${sanitize(place.name)}-view-on-map`}
          accessibilityRole="button"
          accessibilityLabel={`Open ${place.name} in maps`}
        >
          <Icon name="MapPin" size={24} color="soft" />
          <Text className="text-[10px] text-link mt-1  text-text font-work-light dark:text-icon-dark text-center">
            View on Map
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaceCard;
