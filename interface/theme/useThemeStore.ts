import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  loadTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",

  setTheme: (theme) => {
    AsyncStorage.setItem("theme", theme);
    set({ theme });
  },

  loadTheme: async () => {
    const saved = await AsyncStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      set({ theme: saved });
    }
  },
}));
