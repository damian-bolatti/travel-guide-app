import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import CityDetailsScreen from '@/interface/screens/CityDetailsScreen';
import { useCitiesStore } from '@/core/interface/store/useCitiesStore';
import { usePlacesStore } from '@/core/interface/store/usePlacesStore';

jest.mock('expo-router', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    setOptions: jest.fn(),
  }),
  useRouter: () => ({ push: jest.fn() }),
  useSegments: () => [],
}));

jest.mock('@/core/interface/store/usePlacesStore', () => {
  const { createPlacesStore } = require('@/core/interface/store/createPlacesStore');

  const mockRepo = {
    getPlacesByCityKey: {
      execute: jest.fn().mockResolvedValue([]),
    },
  };

  const store = createPlacesStore(mockRepo);

  store.setState({
    places: [
      {
        name: 'Van Gogh Museum',
        type: 'monument',
        coordinates: [52.3545478, 4.8481784],
      },
      {
        name: 'Rijksmuseum',
        type: 'monument',
        coordinates: [52.3599971, 4.8852183],
      },
    ],
    isLoading: false,
    error: null,
    fetchPlaces: jest.fn(),
    reset: jest.fn(),
  });

  return {
    usePlacesStore: store,
  };
});

jest.mock('@/core/interface/store/useCitiesStore', () => {
  const { createCitiesStore } = require('@/core/interface/store/createCitiesStore');

  const mockRepo = {
    getAll: async () => [],
  };

  const store = createCitiesStore(mockRepo);

  store.setState({
    selectedCity: {
      id: 1,
      key: 'amsterdam',
      name: 'Amsterdam',
      nativeName: 'Amsterdam',
      currency: 'EUR',
      language: 'Dutch',
    },
    cities: [],
    isLoading: false,
    error: null,
    fetchCities: jest.fn(),
    setSelectedCity: jest.fn(),
    reset: jest.fn(),
  });

  return {
    useCitiesStore: store,
  };
});

describe('CityDetailsScreen (injected repoMock)', () => {
  // Step 1: Reset stores before each test
  beforeEach(() => {
    usePlacesStore.getState().reset();
    useCitiesStore.getState().reset();
  });

  it('renders places and handles interaction', async () => {
    // Step 2: Render the screen
    render(
      <NavigationContainer>
        <CityDetailsScreen />
      </NavigationContainer>,
    );

    // Step 3: Wait for the first PlaceCard to appear
    await waitFor(() => {
      expect(screen.getByTestId('PlaceCard-van-gogh-museum')).toBeTruthy();
    });

    // Step 4: Assert that both mocked places are rendered
    expect(screen.getByTestId('PlaceCard-van-gogh-museum')).toBeTruthy();
    expect(screen.getByTestId('PlaceCard-rijksmuseum')).toBeTruthy();

    // Step 5: Validate content inside Van Gogh Museum card
    expect(
      screen.getByTestId('PlaceCard-van-gogh-museum-name').props.children,
    ).toBe('Van Gogh Museum');

    expect(
      screen.getByTestId('PlaceCard-van-gogh-museum-type').props.children,
    ).toStrictEqual(['(', 'monument', ')']);

    const coords = screen.getByTestId('PlaceCard-van-gogh-museum-coordinates')
      .props.children;
    expect(coords.join('')).toBe('Lat: 52.3545478, Lon: 4.8481784');

    // Step 6: Snapshot for consistency
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
