import { render, screen, waitFor } from "@testing-library/react";
import { setFetchMock, wrapWithStore } from "@/utils/TestUtils";
import { URLS } from "@/utils/Services";
import ProductList from "../ProductList";

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
  ],
};

describe("Product list tests", () => {
  beforeAll(() => {
    setFetchMock({
      [URLS.GET_INGREDIENTS]: dummyData.ingredients,
    });
  });

  describe("Render with data", () => {
    it("should show list of data", async () => {
      render(wrapWithStore(<ProductList />));

      await waitFor(() => {
        expect(screen.getByText("Lettuce")).toBeInTheDocument();
        expect(screen.getByText("24 hours")).toBeInTheDocument();
        expect(screen.getByText("100 g")).toBeInTheDocument();
        expect(screen.getByText("0.3 €")).toBeInTheDocument();
      });
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
});
