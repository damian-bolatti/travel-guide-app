import NetInfo from '@react-native-community/netinfo';
import { Platform } from 'react-native';
import axios from 'axios';

export const fetchGraphQL = async (
  query: string,
  variables: Record<string, any> = {}
): Promise<any> => {
  const GRAPHQL_ENDPOINT =
    Platform.OS === 'web'
      ? process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT_WEB
      : process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT_ANDROID;

  if (!GRAPHQL_ENDPOINT) {
    throw new Error('GRAPHQL_ENDPOINT is not defined in the environment variables');
  }

  const TIMEOUT_MS = Number(process.env.EXPO_PUBLIC_GRAPHQL_TIMEOUT) || 5000;

  // Verificar conexión antes de lanzar la request
  const netState = await NetInfo.fetch();
  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }

  try {
    const response = await axios.post(
      GRAPHQL_ENDPOINT,
      { query, variables },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: TIMEOUT_MS,
      }
    );

    const { data } = response;

    if (data.errors) {
      console.error('GraphQL Error:', JSON.stringify(data.errors, null, 2));
      throw new Error('GraphQL request failed');
    }

    return data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('GraphQL request timed out');
      }

      if (!error.response) {
        throw new Error('Network error');
      }

      throw new Error(`GraphQL error: ${error.message}`);
    }

    throw error;
  }
};
