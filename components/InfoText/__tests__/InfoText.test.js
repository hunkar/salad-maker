import { render, screen } from "@testing-library/react";
import InfoText, { InfoTextTypes, TypeColors } from "../InfoText";

describe("Info text tests", () => {
  describe("render", () => {
    test("render without selection", () => {
      const message = "This is default message.";

      render(<InfoText>{message}</InfoText>);

      expect(screen.getByText(message)).toBeInTheDocument();
      expect(
        screen.getByTestId("info-text-container").getAttribute("color")
      ).toBe(TypeColors[InfoTextTypes.INFO]);
    });

    test("render warning message", () => {
      const message = "This is warning message.";

      render(<InfoText type={InfoTextTypes.WARNING}>{message}</InfoText>);

      expect(screen.getByText(message)).toBeInTheDocument();
      expect(
        screen.getByTestId("info-text-container").getAttribute("color")
      ).toBe(TypeColors[InfoTextTypes.WARNING]);
    });

    test("render info message", () => {
      const message = "This is info message.";

      render(<InfoText type={InfoTextTypes.INFO}>{message}</InfoText>);

      expect(screen.getByText(message)).toBeInTheDocument();
      expect(
        screen.getByTestId("info-text-container").getAttribute("color")
      ).toBe(TypeColors[InfoTextTypes.INFO]);
    });

    test("render error message", () => {
      const message = "This is error message.";

      render(<InfoText type={InfoTextTypes.ERROR}>{message}</InfoText>);

      expect(screen.getByText(message)).toBeInTheDocument();
      expect(
        screen.getByTestId("info-text-container").getAttribute("color")
      ).toBe(TypeColors[InfoTextTypes.ERROR]);
    });
  });
});
