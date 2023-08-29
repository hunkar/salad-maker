import { FaTrashAlt, FaEllipsisV } from "react-icons/fa";
import {
  ActionButton,
  FormInfoText,
  FormListItem,
  FormTextSelect,
} from "../CommonComponents";
import {
  IngredienttIcon,
  IngredientNameContainer,
  ServingActionButton,
  ServingAmountInput,
  ServingContainer,
} from "./styles";

export const IngredientItem = (props = {}) => {
  const {
    key,
    ingredient = { numOfServings: 0 },
    ingredients = [],
    onChange = () => {},
    onDelete = () => {},
  } = props;

  // Trigger on the delete button clicked
  const onDeleteClick = () => {
    onDelete(ingredient);
  };

  // Trigger on update
  const onNumOfServingsChange = (value) => {
    if (value > 0) {
      onChange({
        ...ingredient,
        numOfServings: value,
      });
    }
  };

  // Increase numOfServings value
  const increase = () => onNumOfServingsChange(ingredient.numOfServings + 1);

  // Decrease numOfServings value
  const decrease = () => onNumOfServingsChange(ingredient.numOfServings - 1);

  // It's triggered When ingredient selection is changed
  // Because of ingredient change, oldId is sent as a parameter
  const onIngredientChange = (event) => {
    const oldId = ingredient.id;
    let newIngredient = {
      ...(ingredients.find((item) => item.id == event.target.value) || {}),
    };
    newIngredient.numOfServings = ingredient.numOfServings;

    onChange(newIngredient, oldId);
  };

  return (
    <FormListItem key={key} data-testid="ingredient-item">
      {/* Product name section */}
      <IngredientNameContainer>
        <IngredienttIcon>
          <FaEllipsisV size={20} />
        </IngredienttIcon>
        <FormTextSelect
          role="select-ingredients"
          value={ingredient.id}
          onChange={onIngredientChange}
        >
          {[...ingredients, ingredient].map((ingredient) => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name}
            </option>
          ))}
        </FormTextSelect>
      </IngredientNameContainer>
      {/* Serving number input and actions section */}
      <ServingContainer>
        {/* Decrease button */}
        <ServingActionButton
          role="action-decrease-button"
          disabled={ingredient.numOfServings === 0}
          onClick={decrease}
        >
          -
        </ServingActionButton>
        {/* Serving input */}
        <ServingAmountInput
          type="number"
          role="input-num-of-servings"
          value={ingredient.numOfServings}
          onChange={(event) =>
            onNumOfServingsChange(Number(event.target.value))
          }
          min={0}
        />
        {/* Increase button */}
        <ServingActionButton role="action-increase-button" onClick={increase}>
          +
        </ServingActionButton>
        {/* Weight per serving information */}
        <FormInfoText>{ingredient.weightPerServing}g</FormInfoText>
      </ServingContainer>
      {/* Cost information */}
      <FormInfoText>{ingredient.costPerServing}€</FormInfoText>
      {/* Action button section */}
      <ActionButton role="action-delete-button" onClick={onDeleteClick}>
        <FaTrashAlt size={20} />
      </ActionButton>
    </FormListItem>
  );
};

export default IngredientItem;
