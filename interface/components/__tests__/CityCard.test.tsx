import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CityCard from "../CityCard";
import { useRouter } from "expo-router";
import { useCitiesStore } from "@/core/interface/store/useCitiesStore";
import { City } from "@/core/domain/entities/City";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/core/interface/store/useCitiesStore", () => ({
  useCitiesStore: jest.fn(),
}));

const mockCity: City = {
  id: 1,
  key: "paris",
  name: "Paris",
  nativeName: "Paris",
  currency: "EUR",
  language: "fr",
};

const mockPush = jest.fn();
const mockSetSelectedCity = jest.fn();

describe("CityCard", () => {
  const mockedUseCitiesStore = useCitiesStore as unknown as jest.Mock;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    mockedUseCitiesStore.mockImplementation((selector) =>
      selector({ setSelectedCity: mockSetSelectedCity }),
    );

    jest.clearAllMocks();
  });

  describe("render", () => {
    it("muestra la información de la ciudad correctamente", () => {
      const { getByTestId } = render(<CityCard city={mockCity} />);

      expect(getByTestId("city-name").props.children).toBe("Paris");
      expect(getByTestId("city-native-name").props.children).toContain("Paris");
      expect(getByTestId("city-currency").props.children).toContain("EUR");
      expect(getByTestId("city-language").props.children).toContain("fr");
    });

    it("aplica correctamente las clases Tailwind", () => {
      const { getByTestId } = render(<CityCard city={mockCity} />);

      expect(getByTestId("city-card").props.className).toContain(
        "bg-card-background",
      );
      expect(getByTestId("city-card").props.className).toContain(
        "dark:bg-card-background-dark",
      );
      expect(getByTestId("city-card").props.className).toContain("p-4");

      expect(getByTestId("city-name").props.className).toContain("text-2xl");
      expect(getByTestId("city-name").props.className).toContain(
        "font-work-bold",
      );
      expect(getByTestId("city-name").props.className).toContain(
        "dark:text-text-header-dark",
      );

      expect(getByTestId("city-native-name").props.className).toContain(
        "text-xl",
      );
      expect(getByTestId("city-native-name").props.className).toContain(
        "italic",
      );
      expect(getByTestId("city-native-name").props.className).toContain(
        "dark:text-text-dark",
      );

      expect(getByTestId("city-currency").props.className).toContain(
        "font-work-light",
      );
      expect(getByTestId("city-currency").props.className).toContain(
        "text-text",
      );

      expect(getByTestId("city-language").props.className).toContain(
        "dark:text-text-dark",
      );
    });

    it("coincide con el snapshot", () => {
      const tree = render(<CityCard city={mockCity} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("interacción", () => {
    it("navega y actualiza el store al pulsar", () => {
      const { getByTestId } = render(<CityCard city={mockCity} />);
      fireEvent.press(getByTestId("city-card"));

      expect(mockSetSelectedCity).toHaveBeenCalledWith(mockCity);
      expect(mockPush).toHaveBeenCalledWith("/cities/cityDetails");
    });
  });
});
