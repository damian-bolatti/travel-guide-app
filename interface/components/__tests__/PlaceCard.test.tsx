import React from 'react';
import { render } from '@testing-library/react-native';
import PlaceCard from '../PlaceCard';
import { Place } from '@/core/domain/entities/Place';

// todo: Move to utils
const sanitize = (name: string) => name.replace(/\s+/g, '-').toLowerCase();

const mockPlace: Place = {
  name: 'Eiffel Tower',
  type: 'monument',
  coordinates: [48.8584, 2.2945],
};

describe('PlaceCard', () => {
  const testID = `PlaceCard-${sanitize(mockPlace.name)}`;

  it('renders place data correctly', () => {
    const { getByTestId } = render(<PlaceCard place={mockPlace} />);

    expect(getByTestId(`${testID}-name`).props.children).toBe('Eiffel Tower');
    expect(getByTestId(`${testID}-type`).props.children).toStrictEqual([
      '(',
      'monument',
      ')',
    ]);

    const coords = getByTestId(`${testID}-coordinates`).props.children;
    const coordsText = Array.isArray(coords) ? coords.join('') : coords;

    expect(coordsText).toContain('48.8584');
    expect(coordsText).toContain('2.2945');
  });

  it('applies correct Tailwind classes', () => {
    const { getByTestId } = render(<PlaceCard place={mockPlace} />);

    expect(getByTestId(`${testID}`).props.className).toContain(
      'bg-card-background',
    );
    expect(getByTestId(`${testID}`).props.className).toContain(
      'dark:bg-card-background-dark',
    );
    expect(getByTestId(`${testID}`).props.className).toContain('p-4');

    expect(getByTestId(`${testID}-name`).props.className).toContain('text-xl');
    expect(getByTestId(`${testID}-name`).props.className).toContain(
      'font-work-bold',
    );
    expect(getByTestId(`${testID}-name`).props.className).toContain(
      'text-text-header',
    );
    expect(getByTestId(`${testID}-name`).props.className).toContain(
      'text-xl font-work-bold text-text-header dark:text-text-dark mb-1',
    );

    expect(getByTestId(`${testID}-type`).props.className).toContain(
      'font-work-medium',
    );
    expect(getByTestId(`${testID}-type`).props.className).toContain('italic');
    expect(getByTestId(`${testID}-type`).props.className).toContain(
      'text-base font-work-medium text-text dark:text-text-dark italic',
    );

    expect(getByTestId(`${testID}-coordinates`).props.className).toContain(
      'text-xs',
    );
    expect(getByTestId(`${testID}-coordinates`).props.className).toContain(
      'mt-1',
    );
  });

  it('matches snapshot', () => {
    const tree = render(<PlaceCard place={mockPlace} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
