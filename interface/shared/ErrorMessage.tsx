import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage = ({
  message,
  onRetry,
}: ErrorMessageProps) => {
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

export default ErrorMessage;
