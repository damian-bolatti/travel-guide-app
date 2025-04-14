import { City } from '@/core/domain/entities/City';
import { useCitiesStore } from '@/core/interface/store/useCitiesStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface CityCardProps {
  city: City;
}

const CityCard = ({ city }: CityCardProps) => {
  const router = useRouter();
  const setSelectedCity = useCitiesStore((state) => state.setSelectedCity);
  const handlePress = () => {
    setSelectedCity(city);
    router.push('/cities/cityDetails');
  };

  return (
    <Pressable onPress={handlePress} className="bg-white p-4 rounded-2xl shadow mb-3">
      <Text className="text-xl font-semibold text-gray-900">{city.name}</Text>
      <Text className="text-sm text-gray-500 italic">{city.nativeName}</Text>
      <View className="flex-row justify-between mt-2">
        <Text className="text-xs text-gray-700">Currency: {city.currency}</Text>
        <Text className="text-xs text-gray-700">Lang: {city.language}</Text>
      </View>
    </Pressable>
  );
};

export default CityCard;