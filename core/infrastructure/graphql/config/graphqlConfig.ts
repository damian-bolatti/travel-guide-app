import { Platform } from 'react-native';
import Constants from 'expo-constants';

const {
  EXPO_PUBLIC_GRAPHQL_ENDPOINT_WEB: graphqlEndpointWeb,
  EXPO_PUBLIC_GRAPHQL_ENDPOINT_ANDROID: graphqlEndpointAndroid,
  EXPO_PUBLIC_GRAPHQL_TIMEOUT: graphqlTimeout,
} = Constants.manifest?.extra || {
  EXPO_PUBLIC_GRAPHQL_ENDPOINT_WEB: "http://localhost:4000/graphql",
  EXPO_PUBLIC_GRAPHQL_ENDPOINT_ANDROID: "http://10.0.2.2:4000/graphql",
  EXPO_PUBLIC_GRAPHQL_TIMEOUT: 5000,
};

export const GRAPHQL_ENDPOINT =
  Platform.OS === 'web' ? graphqlEndpointWeb : graphqlEndpointAndroid;

export const GRAPHQL_TIMEOUT = Number(graphqlTimeout);

console.log('GRAPHQL_ENDPOINT: ', GRAPHQL_ENDPOINT);

if (!GRAPHQL_ENDPOINT) {
  throw new Error(
    'GRAPHQL_ENDPOINT is not defined in Constants.manifest.extra. Please check your EAS config.',
  );
}
