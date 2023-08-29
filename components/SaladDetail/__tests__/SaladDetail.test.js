import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SaladDetail from "../SaladDetail";
import { setFetchMock, wrapWithStore } from "@/utils/TestUtils";
import { URLS } from "@/utils/Services";

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
    {
      id: 3,
      name: "Nut",
      costPerServing: 0.8,
      weightPerServing: 50,
      supplierId: 1,
      hoursFresh: 120,
    },
  ],
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
      targetStockByWeekday: [34, 29, 34, 29, 34],
      currentStock: 12,
    },
  ],
};

describe("Ingredients item tests", () => {
  beforeAll(() => {
    setFetchMock({
      [URLS.GET_INGREDIENTS]: dummyData.ingredients,
      [URLS.GET_BUSINESS_LOGIC]: dummyData.businessLogic,
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test("Render without data", async () => {
    render(wrapWithStore(<SaladDetail />));

    expect(screen.getByText("Salad Name")).toBeInTheDocument();
    expect(screen.getByText("There is no item in salad.")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByDisplayValue("small")).toBeInTheDocument();
      expect(
        screen.getByText(
          `target cost/weight: ${dummyData.businessLogic.saladTypes.small.targetCost}€ / ${dummyData.businessLogic.saladTypes.small.targetWeight}g`
        )
      ).toBeInTheDocument();
    });
  });

  test("Render with salad", async () => {
    render(wrapWithStore(<SaladDetail salad={dummyData.salads[0]} />));

    await waitFor(() => {
      expect(
        screen.getByText(
          `target cost/weight: ${dummyData.businessLogic.saladTypes.medium.targetCost}€ / ${dummyData.businessLogic.saladTypes.medium.targetWeight}g`
        )
      ).toBeInTheDocument();
      expect(screen.getByDisplayValue("medium")).toBeInTheDocument();
      expect(screen.getByText(dummyData.salads[0].name)).toBeInTheDocument();

      expect(screen.getByText(`total cost: 1.50€`)).toBeInTheDocument();
      expect(screen.getByText(`total weight: 400.00g`)).toBeInTheDocument();
    });
  });

  test("Update salad", async () => {
    const onSubmit = jest.fn();

    render(
      wrapWithStore(
        <SaladDetail salad={dummyData.salads[0]} onSubmit={onSubmit} />
      )
    );
    const updatedName = "Test updated salad";

    fireEvent.click(screen.getByRole("action-edit-name"));
    fireEvent.change(screen.getByRole("input-salad-name"), {
      target: { value: updatedName },
    });
    fireEvent.click(screen.getByRole("action-close-edit-name"));
    fireEvent.click(screen.getAllByRole("action-delete-button")[1]);
    fireEvent.change(screen.getByRole("select-salad-type"), {
      target: { value: "small" },
    });

    fireEvent.change(screen.getAllByRole("select-ingredients")[0], {
      target: { value: "2" },
    });

    fireEvent.click(screen.getByRole("button-add-ingredient"));

    fireEvent.click(screen.getByRole("button-submit-salad"));

    await waitFor(() => {
      expect(onSubmit).toBeCalledWith({
        ...dummyData.salads[0],
        name: updatedName,
        ingredients: [
          { id: 2, numOfServings: 1 },
          { id: 3, numOfServings: 1 },
        ],
        cost:
          dummyData.ingredients[1].costPerServing +
          dummyData.ingredients[2].costPerServing,
        price:
          (dummyData.ingredients[1].costPerServing +
            dummyData.ingredients[2].costPerServing) *
          1.5,
        hoursFresh: Math.min(
          dummyData.ingredients[1].hoursFresh,
          dummyData.ingredients[2].hoursFresh
        ),
        size: "small",
      });
    });
  });

  test("Cancel detail screen", async () => {
    const onCancel = jest.fn();

    render(wrapWithStore(<SaladDetail onCancel={onCancel} />));

    fireEvent.click(screen.getByRole("button-cancel-salad"));

    expect(onCancel).toBeCalledTimes(1);
  });
});
