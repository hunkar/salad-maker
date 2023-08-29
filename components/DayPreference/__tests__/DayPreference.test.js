import { render, screen } from "@testing-library/react";
import DayPreference from "../DayPreference";

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

describe("Day preference tests", () => {
  describe("render", () => {
    test("render without data", () => {
      render(<DayPreference />);

      for (const day of days) {
        const label = screen.getByText(new RegExp(`^${day}$`, "i"));
        const input = screen.getByRole(day);

        expect(label).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(input).not.toBeEnabled();
      }
    });

    test("render with data", () => {
      const selectedDays = [0, 2];

      render(<DayPreference selectedDays={selectedDays} />);

      expect(screen.getByRole("Su")).toBeChecked();
      expect(screen.getByRole("Tu")).toBeChecked();
    });
  });
});
