import styled from "styled-components";
import { FormButton, FormTextInput } from "../CommonComponents";

/**
 * Serving container component
 */
export const ServingContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

/**
 * Serving action button component
 */
export const ServingActionButton = styled(FormButton)`
  font-size: 25px;
  height: 40px;
  width: 40px;
`;

/**
 * Serving amount input component
 */
export const ServingAmountInput = styled(FormTextInput)`
  color: gray;
  height: 40px;
  text-align: center;
  width: 100px;
`;

/**
 * Ingredient name container component
 */
export const IngredientNameContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 5px;
`;

/**
 * Ingredient icon component
 */
export const IngredienttIcon = styled.div`
  border: none;
  color: lightgray;
`;
