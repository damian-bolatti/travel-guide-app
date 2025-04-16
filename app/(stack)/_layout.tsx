import React from 'react';
import { Stack } from 'expo-router';
import { useThemeStore } from '@/interface/theme/useThemeStore';
import colors from '@/interface/theme/colors';

const StackLayout = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const backgroundColor = isDark
    ? colors['background-dark']
    : colors.background;
  const textColor = isDark ? colors['text-header-dark'] : colors['text-header'];

  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor,
        },
        headerTintColor: textColor,
        headerTitleStyle: {
          fontFamily: 'WorkSans-Bold',
          fontSize: 22,
          color: textColor,
        },
      }}
    >
      <Stack.Screen
        name="cities/index"
        options={{ title: 'Travel Guide App' }}
      />
      <Stack.Screen name="cities/cityDetails" options={{ title: 'City' }} />
      <Stack.Screen name="settings/index" options={{ title: 'Settings' }} />
    </Stack>
  );
};

export default StackLayout;
