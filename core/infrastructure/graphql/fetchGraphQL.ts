import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import { handleHTTPError } from '../../utils/errorHandler';
import { GRAPHQL_ENDPOINT, GRAPHQL_TIMEOUT } from './config/graphqlConfig';

export const fetchGraphQL = async (
  query: string,
  variables: Record<string, any> = {},
): Promise<any> => {
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
        timeout: GRAPHQL_TIMEOUT,
      },
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

      const statusCode = error.response.status;
      const message = handleHTTPError(statusCode);
      throw new Error(message);
    }

    throw error;
  }
};
