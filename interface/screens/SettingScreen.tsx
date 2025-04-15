import React, { useEffect, useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { useThemeStore } from '@/interface/theme/useThemeStore';

export const SettingsScreen = () => {
  const { theme, setTheme } = useThemeStore();
  const [isDark, setIsDark] = useState(theme === 'dark');

  useEffect(() => {
    setIsDark(theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDark(!isDark);
  };

  return (
    <View className="flex-1 bg-white dark:bg-black px-4 pt-4 justify-between">
      <View>
        {/* Dark Mode */}
        <View className="flex-row justify-between items-center py-4">
          <Text className="text-xl text-gray-700 dark:text-gray-300 font-work-medium">Dark Mode</Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>

        {/* Language (a futuro, solo visual) */}
        <View className="flex-row justify-between items-center py-4">
          <Text className="text-xl text-gray-700 dark:text-gray-300 font-work-medium">Language</Text>
          <Text className="text-xl text-gray-700 dark:text-gray-300 font-work-medium">English</Text>
        </View>
      </View>

      {/* App Version */}
      <View className="items-center pb-6">
        <Text className="text-base text-gray-400 dark:text-gray-500 font-work-regular">
          App Version 0.1.0
        </Text>
      </View>
    </View>
  );
};
