import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import CitiesScreen from '@/interface/screens/CitiesScreen';
import { useCitiesStore } from '@/core/interface/store/useCitiesStore';

jest.mock('expo-router', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    setOptions: jest.fn(),
  }),
  useRouter: () => ({ push: jest.fn() }),
  useSegments: () => [],
}));

jest.mock('@/core/interface/store/useCitiesStore', () => {
  const {
    createCitiesStore,
  } = require('@/core/interface/store/createCitiesStore');
  const mockRepo = {
    getAll: async () => [
      {
        id: 1,
        key: 'barcelona',
        name: 'Barcelona',
        nativeName: 'Barcelona',
        currency: 'EUR',
        language: 'Catalan',
      },
      {
        id: 2,
        key: 'madrid',
        name: 'Madrid',
        nativeName: 'Madrid',
        currency: 'EUR',
        language: 'Spanish',
      },
    ],
  };
  return {
    useCitiesStore: createCitiesStore(mockRepo),
  };
});

describe('CitiesScreen (mocked repository)', () => {
  // Step 1: Reset useCitiesStore store to ensure clean state before each test
  beforeEach(() => {
    useCitiesStore.getState().reset();
  });

  it('renders cities and handles selection', async () => {
    // Step 2: Render the screen wrapped in a NavigationContainer
    render(
      <NavigationContainer>
        <CitiesScreen />
      </NavigationContainer>,
    );

    // Step 3: Wait until the first CityCard is rendered (mocked data)
    await waitFor(() => {
      expect(screen.getByTestId('CityCard-barcelona')).toBeTruthy();
    });

    // Step 4: Assert that both mock cities are present in the list
    expect(screen.getByTestId('CityCard-barcelona')).toBeTruthy();
    expect(screen.getByTestId('CityCard-madrid')).toBeTruthy();

    // Step 5: Simulate press on the first city card
    fireEvent.press(screen.getByTestId('CityCard-barcelona'));

    // Step 6: Validate that selectedCity in useCitiesStore matches the selected item
    const selected = useCitiesStore.getState().selectedCity;
    expect(selected?.key).toBe('barcelona');

    // Step 7: Snapshot the rendered output for consistency checks
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
