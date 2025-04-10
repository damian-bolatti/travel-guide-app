import { View, Text } from 'react-native'
import React from 'react'

interface CityCardProps {
    id: number,
    key: string,
    name: string,
    nativeName: string,
    currency: string,
    language: string,
}

const CityCard = (city : CityCardProps) => {
  return (
    <View>
      <Text>{ city.name }</Text>
    </View>
  )
}

export default CityCard