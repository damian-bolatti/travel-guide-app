import { Linking, Platform } from 'react-native';

export const openInMaps = (latitude: number, longitude: number) => {
  const url =
    Platform.OS === 'ios'
      ? `http://maps.apple.com/?ll=${latitude},${longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  Linking.openURL(url).catch((err) => {
    console.error('Failed to open map:', err);
  });
};
