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
        }}
      />
      <Stack.Screen
        name="cities/cityDetails"
        options={{
          title: 'Details',
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
    )  
}

export default StackLayout