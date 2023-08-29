import { render, screen, waitFor } from "@testing-library/react";
import { setFetchMock, wrapWithStore } from "@/utils/TestUtils";
import { URLS } from "@/utils/Services";
import SupplierList from "../SupplierList";

const dummyData = {
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
  suppliers: [
    {
      id: 1,
      name: "Brand new Veggies",
      productsToOrder: [
        [
          {
            id: 1,
            hoursFresh: 24,
            value: 5000,
          },
          {
            id: 2,
            hoursFresh: 48,
            value: 15000,
          },
        ],
        [
          {
            id: 1,
            hoursFresh: 24,
            value: 5000,
          },
          {
            id: 2,
            hoursFresh: 48,
            value: 15000,
          },
        ],
        [],
        [],
        [],
      ],
    },
  ],
};

describe("Supplier list tests", () => {
  beforeAll(() => {
    setFetchMock({
      [URLS.GET_SUPPLIERS]: dummyData.suppliers,
      [URLS.GET_INGREDIENTS]: dummyData.ingredients,
    });
  });

  describe("Render with data", () => {
    it("should show list of data", async () => {
      render(wrapWithStore(<SupplierList />));

      await waitFor(() => {
        expect(screen.getByText("Brand new Veggies")).toBeInTheDocument();
        expect(
          screen.getByText(`Lettuce:10.00kg,Tomato:30.00kg`)
        ).toBeInTheDocument();
      });
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
});
