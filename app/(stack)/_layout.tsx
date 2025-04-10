import React from 'react'
import { Stack } from 'expo-router'

const StackLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ title: "Cities" }} />
        <Stack.Screen name="cities" options={{ title: "Details" }} />
    </Stack>
    )  
}

export default StackLayout