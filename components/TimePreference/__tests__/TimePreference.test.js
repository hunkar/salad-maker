import { render, screen } from "@testing-library/react";
import TimePreference from "../TimePreference";

const selectedIconSize = "35",
  normalIconSize = "15";

describe("Time Preference tests", () => {
  test("default render", async () => {
    render(<TimePreference />);

    expect(screen.getByTestId("tp-morning")).toBeInTheDocument();
    expect(screen.getByTestId("tp-afternoon")).toBeInTheDocument();
    expect(screen.getByTestId("tp-evening")).toBeInTheDocument();
  });

  test("morning render", async () => {
    render(<TimePreference timePreference={"morning"} />);

    const morning = screen.getByTestId("tp-morning");
    const afternoon = screen.getByTestId("tp-afternoon");
    const evening = screen.getByTestId("tp-evening");

    expect(morning.getAttribute("height")).toEqual(selectedIconSize);
    expect(afternoon.getAttribute("height")).toEqual(normalIconSize);
    expect(evening.getAttribute("height")).toEqual(normalIconSize);
  });

  test("afternoon render", async () => {
    render(<TimePreference timePreference={"afternoon"} />);

    const morning = screen.getByTestId("tp-morning");
    const afternoon = screen.getByTestId("tp-afternoon");
    const evening = screen.getByTestId("tp-evening");

    expect(morning.getAttribute("height")).toEqual(normalIconSize);
    expect(afternoon.getAttribute("height")).toEqual(selectedIconSize);
    expect(evening.getAttribute("height")).toEqual(normalIconSize);
  });

  test("evening render", async () => {
    render(<TimePreference timePreference={"evening"} />);

    const morning = screen.getByTestId("tp-morning");
    const afternoon = screen.getByTestId("tp-afternoon");
    const evening = screen.getByTestId("tp-evening");

    expect(morning.getAttribute("height")).toEqual(normalIconSize);
    expect(afternoon.getAttribute("height")).toEqual(normalIconSize);
    expect(evening.getAttribute("height")).toEqual(selectedIconSize);
  });
});
