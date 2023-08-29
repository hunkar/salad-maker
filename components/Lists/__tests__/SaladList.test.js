import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { setFetchMock, wrapWithStore } from "@/utils/TestUtils";
import { URLS } from "@/utils/Services";
import SaladList from "../SaladList";

const dummyData = {
  businessLogic: {
    margin: 0.5,
    saladTypes: {
      small: {
        targetCost: 2.5,
        targetWeight: 250,
      },
      medium: {
        targetCost: 3.5,
        targetWeight: 350,
      },
      large: {
        targetCost: 4.5,
        targetWeight: 450,
      },
    },
  },
  salads: [
    {
      id: 1,
      name: "Test Salad",
      size: "medium",
      ingredients: [
        {
          id: 1,
          numOfServings: 1,
        },
        {
          id: 2,
          numOfServings: 3,
        },
      ],
      cost: 2.25,
      price: 2.75,
      hoursFresh: 24,
      targetStockByWeekday: [5, 5, 5, 5, 5],
      currentStock: 12,
    },
  ],
  ingredients: [
    {
      id: 1,
      name: "Lettuce",
      costPerServing: 0.3,
      weightPerServing: 100,
      supplierId: 1,
      hoursFresh: 24,
    },
    {
      id: 2,
      name: "Tomato",
      costPerServing: 0.4,
      weightPerServing: 100,
      supplierId: 1,
      hoursFresh: 48,
    },
  ],
};

describe("Salad list tests", () => {
  const mockAlert = jest.fn();

  beforeAll(() => {
    window.alert = mockAlert;
    setFetchMock({
      [URLS.GET_SALADS]: dummyData.salads,
      [URLS.GET_INGREDIENTS]: dummyData.ingredients,
      [URLS.GET_BUSINESS_LOGIC]: dummyData.businessLogic,
    });
  });

  it("should show list of data", async () => {
    render(wrapWithStore(<SaladList />));

    await waitFor(() => {
      expect(screen.getByText("Test Salad")).toBeInTheDocument();
      expect(screen.getByText("medium")).toBeInTheDocument();
      expect(screen.getByText("2.25 €")).toBeInTheDocument();
      expect(screen.getByText("2.75 €")).toBeInTheDocument();
    });
  });

  it("add should open detail modal", async () => {
    render(wrapWithStore(<SaladList />));

    fireEvent.click(screen.getByRole("table-add-click"));

    await waitFor(() => {
      expect(screen.getByTestId("modal-container")).toBeInTheDocument();
    });
  });

  it("delete button should trigger alert", async () => {
    render(wrapWithStore(<SaladList />));

    fireEvent.click(screen.getByRole("button-delete-salad"));

    await waitFor(() => {
      expect(mockAlert).toBeCalledWith(
        "This salad is used in the active planning. You can delete salad if you make new plan without this salad."
      );
    });
  });

  it("update button should open detail modal", async () => {
    render(wrapWithStore(<SaladList />));

    fireEvent.click(screen.getByRole("button-update-salad"));

    await waitFor(() => {
      expect(screen.getByTestId("modal-container")).toBeInTheDocument();
    });
  });

  it("cancel button should close detail modal", async () => {
    render(wrapWithStore(<SaladList />));

    fireEvent.click(screen.getByRole("button-update-salad"));

    await waitFor(() => {
      expect(screen.getByTestId("modal-container")).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button-cancel-salad"));

      expect(() => screen.getByTestId("modal-container")).toThrow();
    });
  });

  it("submit button should close detail modal", async () => {
    render(wrapWithStore(<SaladList />));

    fireEvent.click(screen.getByRole("button-update-salad"));

    await waitFor(async () => {
      expect(screen.getByTestId("modal-container")).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button-submit-salad"));

      await waitFor(() => {
        expect(() => screen.getByTestId("modal-container")).toThrow();
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
