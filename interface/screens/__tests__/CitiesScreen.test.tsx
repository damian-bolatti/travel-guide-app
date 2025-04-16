import React from 'react';
import { render } from '@testing-library/react-native';
import CitiesScreen from '../CitiesScreen';

import { useCities } from '../../hooks/useCities';

jest.mock('expo-router', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    setOptions: jest.fn(),
  }),
}));

jest.mock('../../hooks/useCities', () => ({
  useCities: jest.fn(),
}));

jest.mock('../../shared/Loader', () => {
  const { View, Text } = require('react-native');
  return () => (
    <View testID="loader">
      <Text>Loader</Text>
    </View>
  );
});

jest.mock('../../shared/Retry', () => {
  const { View, Text } = require('react-native');
  return ({ message }: { message: string }) => (
    <View testID={message === 'No cities available' ? 'empty-retry' : 'retry'}>
      <Text>{message}</Text>
    </View>
  );
});

jest.mock('../../components/CityList', () => {
  const { View, Text } = require('react-native');
  return ({ cities }: { cities: any[] }) => (
    <View testID="city-list">
      <Text>{cities.length} cities</Text>
    </View>
  );
});

describe('CitiesScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loader', () => {
    (useCities as jest.Mock).mockReturnValue({
      cities: [],
      isLoading: true,
      error: null,
      fetchCities: jest.fn(),
      reset: jest.fn(),
    });

    const { getByTestId } = render(<CitiesScreen />);
    expect(getByTestId('loader')).toBeTruthy();
  });

  it('shows retry on error', () => {
    (useCities as jest.Mock).mockReturnValue({
      cities: [],
      isLoading: false,
      error: 'Failed to fetch',
      fetchCities: jest.fn(),
      reset: jest.fn(),
    });

    const { getByTestId } = render(<CitiesScreen />);
    expect(getByTestId('retry')).toBeTruthy();
  });

  it('shows retry when empty state', () => {
    (useCities as jest.Mock).mockReturnValue({
      cities: [],
      isLoading: false,
      error: null,
      fetchCities: jest.fn(),
      reset: jest.fn(),
    });

    const { getByTestId } = render(<CitiesScreen />);
    expect(getByTestId('empty-retry')).toBeTruthy();
  });

  it('shows CityList when cities are loaded', () => {
    (useCities as jest.Mock).mockReturnValue({
      cities: [
        {
          id: 1,
          key: 'paris',
          name: 'Paris',
          nativeName: 'Paris',
          currency: 'EUR',
          language: 'fr',
        },
      ],
      isLoading: false,
      error: null,
      fetchCities: jest.fn(),
      reset: jest.fn(),
    });

    const { getByTestId } = render(<CitiesScreen />);
    expect(getByTestId('city-list')).toBeTruthy();
  });

  it('matches snapshot', () => {
    (useCities as jest.Mock).mockReturnValue({
      cities: [],
      isLoading: false,
      error: null,
      fetchCities: jest.fn(),
      reset: jest.fn(),
    });

    const tree = render(<CitiesScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
