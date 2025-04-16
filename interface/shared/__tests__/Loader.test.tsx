import React from "react";
import { render } from "@testing-library/react-native";
import Loader from "../Loader";

describe("Loader", () => {
  it("renders spinner and message correctly", () => {
    const { getByTestId } = render(<Loader message="Loading data..." />);

    const wrapper = getByTestId("loader-wrapper");
    const spinner = getByTestId("loader-spinner");
    const message = getByTestId("loader-message");

    expect(wrapper).toBeTruthy();
    expect(spinner).toBeTruthy();
    expect(message.props.children).toBe("Loading data...");
  });

  it("applies correct classNames to wrapper and message", () => {
    const { getByTestId } = render(<Loader message="Verifying..." />);

    expect(getByTestId("loader-wrapper").props.className).toContain("flex-1");
    expect(getByTestId("loader-wrapper").props.className).toContain(
      "bg-background",
    );
    expect(getByTestId("loader-message").props.className).toContain(
      "text-icon",
    );
    expect(getByTestId("loader-message").props.className).toContain(
      "text-center",
    );
  });

  it("matches snapshot", () => {
    const tree = render(<Loader message="Please wait..." />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
