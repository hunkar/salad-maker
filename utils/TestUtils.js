import store from "@/redux/store";
import { Provider } from "react-redux";

/**
 * Wrap component with the store
 *
 * @param {Component} component component will be rendered
 * @param {Store} mockStore mock store object
 * @returns
 */
export const wrapWithStore = (component, mockStore) => {
  return <Provider store={mockStore || store}>{component}</Provider>;
};

/**
 * Mock fetch  method
 *
 * @param {Object} mockData any data for the mocking
 */
export const setFetchMock = (mockData = {}) => {
  global.fetch = jest.fn((url) => {
    return Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockData[url]),
    });
  });
};
