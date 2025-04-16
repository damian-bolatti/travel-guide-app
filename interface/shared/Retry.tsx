import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface RetryProps {
  message: string;
  onRetry: () => void;
}

const Retry = ({ message, onRetry }: RetryProps) => {
  return (
    <View
      testID="retry-wrapper"
      className="flex-1 justify-center items-center bg-background dark:bg-background-dark px-4"
    >
      <Text
        testID="retry-message"
        className="text-base text-text dark:text-text-dark text-center mb-4 font-work-light"
      >
        {message}
      </Text>

      <TouchableOpacity
        testID="retry-button"
        onPress={onRetry}
        className="bg-tint dark:bg-tint-dark px-5 py-2 rounded-sm"
      >
        <Text
          testID="retry-button-label"
          className="text-background dark:text-background-dark font-work-medium"
        >
          Retry
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Retry;
