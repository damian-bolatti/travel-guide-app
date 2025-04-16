import React from 'react';
import { render } from '@testing-library/react-native';
import CityDetailsScreen from '../CityDetailsScreen';

import { useCities } from '../../hooks/useCities';
import { usePlaces } from '../../hooks/usePlaces';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    setOptions: jest.fn(),
  }),
}));

jest.mock('../../hooks/useCities', () => ({
  useCities: jest.fn(),
}));

jest.mock('../../hooks/usePlaces', () => ({
  usePlaces: jest.fn(),
}));

jest.mock('../../shared/Loader', () => {
  const { Text } = require('react-native');
  return () => <Text testID="loader">Loader</Text>;
});

jest.mock('../../shared/Retry', () => {
  const { Text } = require('react-native');
  return ({ message }: { message: string }) => (
    <Text testID="retry">{message}</Text>
  );
});

jest.mock('../../components/PlaceList', () => {
  const { Text } = require('react-native');
  return ({ places }: { places: any[] }) => (
    <Text testID="place-list">{places.length} places</Text>
  );
});

const mockCity = {
  id: 1,
  key: 'paris',
  name: 'Paris',
  nativeName: 'Paris',
  currency: 'EUR',
  language: 'fr',
};

describe('CityDetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows "City not found" if no selected city', () => {
    (useCities as jest.Mock).mockReturnValue({ selectedCity: null });
    (usePlaces as jest.Mock).mockReturnValue({
      places: [],
      isLoading: false,
      error: null,
      reset: jest.fn(),
      fetchPlaces: jest.fn(),
    });

    const { getByTestId } = render(<CityDetailsScreen />);
    expect(getByTestId('no-city')).toBeTruthy();
  });

  it('renders Loader when loading', () => {
    (useCities as jest.Mock).mockReturnValue({ selectedCity: mockCity });
    (usePlaces as jest.Mock).mockReturnValue({
      places: [],
      isLoading: true,
      error: null,
      reset: jest.fn(),
      fetchPlaces: jest.fn(),
    });

    const { getByTestId } = render(<CityDetailsScreen />);
    expect(getByTestId('loader')).toBeTruthy();
  });

  it('renders Retry on error', () => {
    (useCities as jest.Mock).mockReturnValue({ selectedCity: mockCity });
    (usePlaces as jest.Mock).mockReturnValue({
      places: [],
      isLoading: false,
      error: 'Error!',
      reset: jest.fn(),
      fetchPlaces: jest.fn(),
    });

    const { getByTestId } = render(<CityDetailsScreen />);
    expect(getByTestId('retry')).toBeTruthy();
  });

  it('renders Retry when empty state', () => {
    (useCities as jest.Mock).mockReturnValue({ selectedCity: mockCity });
    (usePlaces as jest.Mock).mockReturnValue({
      places: [],
      isLoading: false,
      error: null,
      reset: jest.fn(),
      fetchPlaces: jest.fn(),
    });

    const { getByTestId } = render(<CityDetailsScreen />);
    expect(getByTestId('retry')).toBeTruthy();
  });

  it('renders PlaceList if places exist', () => {
    (useCities as jest.Mock).mockReturnValue({ selectedCity: mockCity });
    (usePlaces as jest.Mock).mockReturnValue({
      places: [{ name: 'Tour Eiffel', type: 'monument', coordinates: [1, 2] }],
      isLoading: false,
      error: null,
      reset: jest.fn(),
      fetchPlaces: jest.fn(),
    });

    const { getByTestId } = render(<CityDetailsScreen />);
    expect(getByTestId('place-list')).toBeTruthy();
  });

  it('matches snapshot', () => {
    (useCities as jest.Mock).mockReturnValue({ selectedCity: mockCity });
    (usePlaces as jest.Mock).mockReturnValue({
      places: [],
      isLoading: false,
      error: null,
      reset: jest.fn(),
      fetchPlaces: jest.fn(),
    });

    const tree = render(<CityDetailsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
