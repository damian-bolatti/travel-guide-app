import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface RetryProps {
  message: string;
  onRetry: () => void;
}

const Retry = ({
  message,
  onRetry,
}: RetryProps) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-base text-gray-700 text-center mb-4">{message}</Text>

      <TouchableOpacity
        onPress={onRetry}
        className="bg-blue-600 px-5 py-2 rounded-md"
      >
        <Text className="text-white font-semibold">Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Retry;
