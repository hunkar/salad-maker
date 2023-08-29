import store from "@/redux/store";
import { Provider } from "react-redux";

/**
 * It wraps view with the provider
 * 
 * @returns View
 */
export const ReduxWrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <div>{children}</div>
    </Provider>
  );
};

export default ReduxWrapper;
