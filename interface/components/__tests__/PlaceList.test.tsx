import React from 'react';
import { render } from '@testing-library/react-native';
import { Place } from '@/core/domain/entities/Place';
import PlaceList from '../PlaceList';

jest.mock('../PlaceCard', () => {
  const { View } = require('react-native');
  return ({ testID }: { testID: string }) => <View testID={testID} />;
});

const mockPlaces: Place[] = [
  {
    name: 'Eiffel Tower',
    type: 'monument',
    coordinates: [48.8584, 2.2945],
  },
  {
    name: 'Louvre Museum',
    type: 'monument',
    coordinates: [48.8606, 2.3376],
  },
];

describe('PlaceList', () => {
  it('renders list wrapper and title', () => {
    const { getByTestId } = render(<PlaceList places={mockPlaces} />);
    expect(getByTestId('place-list')).toBeTruthy();
    expect(getByTestId('place-list-title')).toBeTruthy();
  });

  it('renders nothing if place list is empty', () => {
    const { queryByTestId } = render(<PlaceList places={[]} />);
    expect(queryByTestId('place-list')).toBeNull();
    expect(queryByTestId('place-list-title')).toBeNull();
  });

  it('matches snapshot', () => {
    const tree = render(<PlaceList places={mockPlaces} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
