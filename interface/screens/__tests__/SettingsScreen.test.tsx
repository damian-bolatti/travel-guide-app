import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SettingsScreen } from '../SettingScreen';

import { useThemeStore } from '@/interface/theme/useThemeStore';

jest.mock('@/interface/theme/useThemeStore', () => ({
  useThemeStore: jest.fn(),
}));

const mockedUseThemeStore = useThemeStore as unknown as jest.Mock;

const mockSetTheme = jest.fn();

describe('SettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with light theme and matches snapshot', () => {
    mockedUseThemeStore.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });

    const { toJSON } = render(<SettingsScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correct label, switch state and version', () => {
    mockedUseThemeStore.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    });

    const { getByTestId } = render(<SettingsScreen />);

    expect(getByTestId('settings-label').props.children).toBe('Dark Mode');
    expect(getByTestId('settings-switch').props.value).toBe(true);
    expect(getByTestId('settings-version').props.children).toBe(
      'App Version 0.1.0',
    );
  });

  it('toggles the theme on switch interaction', () => {
    mockedUseThemeStore.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    });

    const { getByTestId } = render(<SettingsScreen />);
    fireEvent(getByTestId('settings-switch'), 'valueChange');

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('applies correct classNames', () => {
    mockedUseThemeStore.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });

    const { getByTestId } = render(<SettingsScreen />);

    expect(getByTestId('settings-wrapper').props.className).toContain('flex-1');
    expect(getByTestId('settings-label').props.className).toContain(
      'font-work-medium',
    );
    expect(getByTestId('settings-version').props.className).toContain(
      'text-icon',
    );
  });
});
