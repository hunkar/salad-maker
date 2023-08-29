import { render, screen, waitFor } from "@testing-library/react";
import { setFetchMock, wrapWithStore } from "@/utils/TestUtils";
import { URLS } from "@/utils/Services";
import SubscriberList from "../SubscriberList";

const dummyData = {
  subscriptions: [
    {
      id: 1,
      name: "Ronald Inho",
      type: "medium",
      weekdays: [1, 3, 5],
      timePreference: "afternoon",
    },
    {
      id: 2,
      name: "Sam Francisco",
      type: "medium",
      weekdays: [1, 2, 3, 4, 5],
      timePreference: "morning",
    },
  ],
};

describe("Subscriber list tests", () => {
  beforeAll(() => {
    setFetchMock({
      [URLS.GET_SUBSCRIPTIONS]: dummyData.subscriptions,
    });
  });

  describe("Render with data", () => {
    it("should show list of data", async () => {
      render(wrapWithStore(<SubscriberList />));

      await waitFor(() => {
        expect(screen.getByText("Ronald Inho")).toBeInTheDocument();
        expect(screen.getByText("Sam Francisco")).toBeInTheDocument();
      });
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
});
