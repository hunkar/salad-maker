import { render, screen, waitFor } from "@testing-library/react";
import Navigation from "../Navigation";

const customNavigationItems = [
  {
    href: "/salad-maker",
    title: "Planner",
  },
  {
    href: "/salad-list",
    title: "Salads",
  },
];

jest.mock("next/navigation", () => ({
  usePathname() {
    return customNavigationItems[0].href;
  },
}));

const defaultNavigationTitles = [
  "Planner",
  "Salads",
  "Suppliers",
  "Subscribers",
  "Products",
];

describe("Time preference tests", () => {
  test("default render", async () => {
    render(<Navigation />);

    for (const item of defaultNavigationTitles) {
      const navItem = await waitFor(() =>
        screen.getByText(new RegExp(`^${item}$`, "i"))
      );

      expect(navItem).toBeInTheDocument();
    }
  });

  test("custom render", async () => {
    render(<Navigation links={customNavigationItems} />);

    for (const item of customNavigationItems) {
      const navItem = await waitFor(() =>
        screen.getByText(new RegExp(`^${item.title}$`, "i"))
      );

      expect(navItem).toBeInTheDocument();
    }
  });

  it("should show selected", async () => {
    render(<Navigation links={customNavigationItems} />);

    const navigationItem = await waitFor(() =>
      screen.getByTestId("navigation-item-0")
    );

    expect(navigationItem.getAttribute("data-selected")).toBe("true");
  });
});
