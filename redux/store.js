import { configureStore } from "@reduxjs/toolkit";
import businessLogic from "./reducers/businessLogic";
import ingredients from "./reducers/ingredients";
import salads from "./reducers/salads";
import subscriptions from "./reducers/subscriptions";
import suppliers from "./reducers/suppliers";

export default configureStore({
  reducer: {
    businessLogic: businessLogic,
    ingredients: ingredients,
    salads: salads,
    subscriptions: subscriptions,
    suppliers: suppliers,
  },
});
