import { City } from "@/core/domain/entities/City";
import { useCitiesStore } from "@/core/interface/store/useCitiesStore";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Pressable } from "react-native";
import { Icon } from "../shared/Icon";

interface CityCardProps {
  city: City;
}

const CityCard = ({ city }: CityCardProps) => {
  const router = useRouter();
  const setSelectedCity = useCitiesStore((state) => state.setSelectedCity);

  const handlePress = () => {
    setSelectedCity(city);
    router.push("/cities/cityDetails");
  };

  return (
    <Pressable
      onPress={handlePress}
      className="bg-card-background dark:bg-card-background-dark p-4 rounded-sm mb-3"
      testID="city-card"
    >
      <View className="flex-row justify-between items-center">
        <View>
          <View
            className="flex-row flex-wrap items-baseline mb-1"
            testID="city-names"
          >
            <Text
              className="text-2xl font-work-bold text-text-header dark:text-text-header-dark mr-2"
              testID="city-name"
            >
              {city.name}
            </Text>
            <Text
              className="text-xl font-work-medium text-text dark:text-text-dark italic"
              testID="city-native-name"
            >
              ({city.nativeName})
            </Text>
          </View>

          <View className="flex-row flex-wrap" testID="city-details">
            <Text
              className="text-base text-text dark:text-text-dark font-work-light mr-2"
              testID="city-currency"
            >
              Currency: {city.currency}
            </Text>
            <Text
              className="text-base text-text dark:text-text-dark font-work-light"
              testID="city-language"
            >
              Language: {city.language}
            </Text>
          </View>
        </View>

        <Icon name="ChevronRight" />
      </View>
    </Pressable>
  );
};

export default CityCard;
