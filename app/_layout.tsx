import React, { useEffect } from 'react'
import { Slot, SplashScreen } from 'expo-router'
import "./global.css"
import { useFonts } from 'expo-font'


SplashScreen.preventAutoHideAsync()

const RootLayout = () => {

    const [ fontLoaded, error ] = useFonts({
        "WorkSans-Bold": require('../assets/fonts/WorkSans-Bold.ttf'),
        "WorkSans-Regular": require('../assets/fonts/WorkSans-Regular.ttf'),
        "WorkSans-Medium": require('../assets/fonts/WorkSans-Medium.ttf'),
        "WorkSans-Light": require('../assets/fonts/WorkSans-Light.ttf'),
    })

useEffect(() => {
  if (error) throw error
  if (fontLoaded) SplashScreen.hideAsync()

}, [fontLoaded, error])

if (!fontLoaded && !error) return null

  return <Slot/>
}

export default RootLayout

function UseFonts(arg0: {}): [any, any] {
    throw new Error('Function not implemented.')
}
