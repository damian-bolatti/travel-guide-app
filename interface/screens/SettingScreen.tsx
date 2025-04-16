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
    <View
      className="flex-1 bg-background dark:bg-background-dark px-4 pt-4 justify-between"
      testID="settings-wrapper"
    >
      <View>
        <View
          className="flex-row justify-between items-center py-4"
          testID="settings-toggle-row"
        >
          <Text
            className="text-xl text-text-header dark:text-text-header-dark font-work-medium"
            testID="settings-label"
          >
            Dark Mode
          </Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            testID="settings-switch"
          />
        </View>
      </View>

      <View className="items-center pb-6">
        <Text
          className="text-base text-icon dark:text-icon-dark font-work-regular"
          testID="settings-version"
        >
          App Version 0.1.0
        </Text>
      </View>
    </View>
  );
};
