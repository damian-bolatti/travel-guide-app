import React from 'react';
import { render } from '@testing-library/react-native';
import CityList from '../CityList';
import { City } from '@/core/domain/entities/City';

jest.mock('../CityCard', () => {
  const { View } = require('react-native');
  return ({ city }: { city: City }) => (
    <View testID={`city-card-${city.key}`} />
  );
});

const mockCities: City[] = [
  {
    id: 1,
    key: 'paris',
    name: 'Paris',
    nativeName: 'Paris',
    currency: 'EUR',
    language: 'fr',
  },
  {
    id: 2,
    key: 'barcelona',
    name: 'Barcelona',
    nativeName: 'Barcelona',
    currency: 'EUR',
    language: 'es',
  },
];

describe('CityList', () => {
  it('renders one CityCard per city in the list', () => {
    const { getByTestId } = render(<CityList cities={mockCities} />);
    expect(getByTestId('city-card-paris')).toBeTruthy();
    expect(getByTestId('city-card-barcelona')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const tree = render(<CityList cities={mockCities} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
