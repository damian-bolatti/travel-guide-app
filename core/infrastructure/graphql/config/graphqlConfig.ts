import { Platform } from 'react-native';

  // Use .env params
  const graphqlEndpointWeb = "http://localhost:4000/graphql"
  const graphqlEndpointAndroid = "http://10.0.2.2:4000/graphql"
  const graphqlTimeout = 5000

export const GRAPHQL_ENDPOINT =
  Platform.OS === 'web' ? graphqlEndpointWeb : graphqlEndpointAndroid;

export const GRAPHQL_TIMEOUT = Number(graphqlTimeout);

console.log('GRAPHQL_ENDPOINT: ', GRAPHQL_ENDPOINT);

if (!GRAPHQL_ENDPOINT) {
  throw new Error(
    'GRAPHQL_ENDPOINT is not defined in Constants.manifest.extra. Please check your EAS config.',
  );
}
