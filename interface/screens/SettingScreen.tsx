import React from 'react';
import { View, Text, Switch } from 'react-native';

export const SettingsScreen = () => {
  return (
    <View className="flex-1 bg-white px-4 pt-4 justify-between">
      <View>
        <View className="flex-row justify-between items-center py-4">
          <Text className="text-xl text-gray-700">Dark Mode</Text>
          <Switch value={false} onValueChange={() => {}} />
        </View>

        <View className="flex-row justify-between items-center py-4">
          <Text className="text-xl text-gray-700 font-work-medium">Language</Text>
          <Text className="text-xl text-gray-700 font-work-medium">English</Text>
        </View>
      </View>

      <View className="items-center pb-6">
        <Text className="text-base text-gray-400 font-work-regular">App Version 0.1.0</Text>
      </View>
    </View>
  );
};
