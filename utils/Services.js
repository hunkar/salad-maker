import Request from "./Request";

import { set as setIngredients } from "@/redux/reducers/ingredients";
import { set as setSalads } from "@/redux/reducers/salads";
import { set as setSubscriptions } from "@/redux/reducers/subscriptions";
import { set as setSuppliers } from "@/redux/reducers/suppliers";
import { set as setBusinessLogic } from "@/redux/reducers/businessLogic";

//Urls which are used for the requests
export const URLS = {
  GET_INGREDIENTS: "api/ingredients",
  GET_SALADS: "api/salads",
  GET_SUBSCRIPTIONS: "api/subscriptions",
  GET_SUPPLIERS: "api/suppliers",
  GET_BUSINESS_LOGIC: "api/businessLogic",
  POST_SALAD_PLANNER: "api/planner",
  DELETE_SALAD: "api/salads",
  POST_SALAD: "api/salads",
};

/**
 * Get ingredients from the backend
 */
export const getIngredients = async (dispatch) => {
  const result = await new Request(URLS.GET_INGREDIENTS).get();

  if (result.status === 200) {
    dispatch(setIngredients(result.data));
  }
};

/**
 * Get salads from the backend
 */
export const getSalads = async (dispatch) => {
  const result = await new Request(URLS.GET_SALADS).get();

  if (result.status === 200) {
    dispatch(setSalads(result.data));
  }
};

/**
 * Get subscriptions from the backend
 */
export const getSubscriptions = async (dispatch) => {
  const result = await new Request(URLS.GET_SUBSCRIPTIONS).get();

  if (result.status === 200) {
    dispatch(setSubscriptions(result.data));
  }
};

/**
 * Get suppliers from the backend
 */
export const getSuppliers = async (dispatch) => {
  const result = await new Request(URLS.GET_SUPPLIERS).get();

  if (result.status === 200) {
    dispatch(setSuppliers(result.data));
  }
};

/**
 * Get business logic from the backend
 */
export const getBusinessLogic = async (dispatch) => {
  const result = await new Request(URLS.GET_BUSINESS_LOGIC).get();

  if (result.status === 200) {
    dispatch(setBusinessLogic(result.data));
  }
};

/**
 * Post salad to the backend
 */
export const postSalad = async (dispatch, data) => {
  const result = await new Request(URLS.POST_SALAD).post(data);

  if (result.status === 200) {
    dispatch(setSalads(result.data));
  }
};

/**
 * Delete salad from the backend
 */
export const deleteSalad = async (dispatch, data) => {
  const result = await new Request(URLS.DELETE_SALAD).delete(data);

  if (result.status === 200) {
    dispatch(setSalads(result.data));
    // await getSalads(dispatch);
  }
};

/**
 * Post salad plan to the backend
 */
export const postSaladPlanner = async (dispatch, data) => {
  const result = await new Request(URLS.POST_SALAD_PLANNER).post(data);

  if (result.status === 200) {
    dispatch(setSalads(result.data.salads));
    dispatch(setIngredients(result.data.ingredients));
    dispatch(setSuppliers(result.data.suppliers));
    dispatch(setSubscriptions(result.data.subscriptions));
  }
};
