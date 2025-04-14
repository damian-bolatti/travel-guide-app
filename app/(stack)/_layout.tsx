import React from 'react'
import { Stack } from 'expo-router'

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="cities/index"
        options={{
          title: 'Cities',
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
          title: 'Details',
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