import React from 'react'
import { Stack } from 'expo-router'

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="cities/index"
        options={{
          title: 'Travel Guide App',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'WorkSans-Bold',
            fontSize: 22,
          },
        }}
      />
      <Stack.Screen
        name="cities/cityDetails"
        options={{
          title: 'City',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'WorkSans-Bold',
            fontSize: 22,
          },
        }}
      />
      <Stack.Screen
        name="settings/index"
        options={{
          title: 'Settings',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'WorkSans-Bold',
            fontSize: 22,
          },
        }}
      />
    </Stack>
    )  
}

export default StackLayout