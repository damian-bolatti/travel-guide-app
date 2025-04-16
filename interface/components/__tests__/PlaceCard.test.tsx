import React from 'react';
import { render } from '@testing-library/react-native';
import PlaceCard from '../PlaceCard';
import { Place } from '@/core/domain/entities/Place';

const mockPlace: Place = {
  name: 'Eiffel Tower',
  type: 'monument',
  coordinates: [48.8584, 2.2945],
};

describe('PlaceCard', () => {
  it('renders place data correctly', () => {
    const { getByTestId } = render(<PlaceCard place={mockPlace} />);

    expect(getByTestId('place-name').props.children).toBe('Eiffel Tower');
    expect(getByTestId('place-type').props.children).toBe('monument');

    const coordsText = getByTestId('place-coordinates').props.children.join('');
    expect(coordsText).toContain('48.8584');
    expect(coordsText).toContain('2.2945');
  });

  it('applies correct Tailwind classes', () => {
    const { getByTestId } = render(<PlaceCard place={mockPlace} />);

    expect(getByTestId('place-card').props.className).toContain(
      'bg-card-background',
    );
    expect(getByTestId('place-card').props.className).toContain(
      'dark:bg-card-background-dark',
    );
    expect(getByTestId('place-card').props.className).toContain('p-4');

    expect(getByTestId('place-name').props.className).toContain('text-xl');
    expect(getByTestId('place-name').props.className).toContain(
      'font-work-bold',
    );
    expect(getByTestId('place-name').props.className).toContain(
      'text-text-header',
    );
    expect(getByTestId('place-name').props.className).toContain(
      'dark:text-text-header-dark',
    );

    expect(getByTestId('place-type').props.className).toContain(
      'font-work-medium',
    );
    expect(getByTestId('place-type').props.className).toContain('italic');
    expect(getByTestId('place-type').props.className).toContain('text-icon');

    expect(getByTestId('place-coordinates').props.className).toContain(
      'text-xs',
    );
    expect(getByTestId('place-coordinates').props.className).toContain('mt-1');
  });

  it('matches snapshot', () => {
    const tree = render(<PlaceCard place={mockPlace} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
