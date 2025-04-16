import React from "react";
import { render } from "@testing-library/react-native";
import { Icon } from "../Icon";
import colors from "../../theme/colors";

jest.mock("@/interface/theme/useThemeStore", () => ({
  useThemeStore: jest.fn(),
}));

jest.mock("lucide-react-native", () => ({
  Sun: jest.fn(() => null),
  Moon: jest.fn(() => null),
  Home: jest.fn(() => null),
}));

describe("Icon", () => {
  const { useThemeStore } = require("@/interface/theme/useThemeStore");
  const LucideIcons = require("lucide-react-native");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the icon with light theme color", () => {
    useThemeStore.mockReturnValue({ theme: "light" });

    render(<Icon name="Sun" size={32} />);

    expect(LucideIcons.Sun).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 32,
        color: colors.icon,
      }),
      {},
    );
  });

  it("renders the icon with dark theme color", () => {
    useThemeStore.mockReturnValue({ theme: "dark" });

    render(<Icon name="Moon" />);

    expect(LucideIcons.Moon).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 24,
        color: colors["icon-dark"],
      }),
      {},
    );
  });

  it("matches snapshot", () => {
    useThemeStore.mockReturnValue({ theme: "light" });

    const tree = render(<Icon name="Home" size={20} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
