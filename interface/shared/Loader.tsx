import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoaderProps {
  message: string;
}

const Loader = ({ message }: LoaderProps) => {
  return (
    <View className="flex-1 justify-center items-center bg-background dark:bg-background-dark">
      <ActivityIndicator size="large" className="mb-4" />
      <Text className="text-base text-icon dark:text-icon-dark font-work-light text-center">
        {message}
      </Text>
    </View>
  );
};

export default Loader;
