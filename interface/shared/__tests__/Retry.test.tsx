import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Retry from '../Retry';

describe('Retry', () => {
  it('renders message and button correctly', () => {
    const { getByTestId } = render(
      <Retry message="Something went wrong." onRetry={() => {}} />,
    );

    expect(getByTestId('retry-wrapper')).toBeTruthy();
    expect(getByTestId('retry-message').props.children).toBe(
      'Something went wrong.',
    );
    expect(getByTestId('retry-button')).toBeTruthy();
    expect(getByTestId('retry-button-label').props.children).toBe('Retry');
  });

  it('applies correct classNames to wrapper and button', () => {
    const { getByTestId } = render(
      <Retry message="Try again!" onRetry={() => {}} />,
    );

    expect(getByTestId('retry-wrapper').props.className).toContain('flex-1');
    expect(getByTestId('retry-message').props.className).toContain(
      'text-center',
    );
    expect(getByTestId('retry-button-label').props.className).toContain(
      'text-background',
    );
  });

  it('calls onRetry when button is pressed', () => {
    const mockRetry = jest.fn();
    const { getByTestId } = render(
      <Retry message="Try again!" onRetry={mockRetry} />,
    );

    fireEvent.press(getByTestId('retry-button'));
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const tree = render(
      <Retry message="Please try again" onRetry={() => {}} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
