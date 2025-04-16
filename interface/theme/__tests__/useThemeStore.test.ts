import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeStore } from '../useThemeStore';
import { act } from '@testing-library/react-native';

describe('useThemeStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useThemeStore.setState({ theme: 'light' });
  });

  it('has "light" as default theme', () => {
    expect(useThemeStore.getState().theme).toBe('light');
  });

  it('setTheme updates theme and persists to AsyncStorage', () => {
    useThemeStore.getState().setTheme('dark');

    expect(useThemeStore.getState().theme).toBe('dark');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('loadTheme sets theme from AsyncStorage if valid', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('dark');

    await act(async () => {
      await useThemeStore.getState().loadTheme();
    });

    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('loadTheme keeps default if AsyncStorage returns invalid theme', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('invalid');

    await act(async () => {
      await useThemeStore.getState().loadTheme();
    });

    expect(useThemeStore.getState().theme).toBe('light');
  });
});
