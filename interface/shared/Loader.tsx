import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoaderProps {
  message: string;
}

const Loader = ({ message }: LoaderProps) => {
  return (
    <View
      testID="loader-wrapper"
      className="flex-1 justify-center items-center bg-background dark:bg-background-dark"
    >
      <ActivityIndicator
        testID="loader-spinner"
        size="large"
        className="mb-4"
      />
      <Text
        testID="loader-message"
        className="text-base text-icon dark:text-icon-dark font-work-light text-center"
      >
        {message}
      </Text>
    </View>
  );
};

export default Loader;
