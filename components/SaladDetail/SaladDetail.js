import { FaCheck, FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getBusinessLogic, getIngredients } from "@/utils/Services";
import {
  Divider,
  FormTitle,
  FormTitleInput,
  LabelSelect,
  Header,
  FormInfoText,
  FormButton,
  CancelButton,
  SaveButton,
  SortableFormList,
  Footer,
  FormList,
} from "../CommonComponents";
import { InfoText, InfoTextTypes } from "../InfoText";
import IngredientItem from "./IngredientItem";

/**
 * Information text container component
 */
const InfoTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

/**
 * Add button component
 */
const AddButton = styled(FormButton)`
  font-size: 25px;
  height: 35px;
  margin: 10px 0px;
  width: 100%;
`;

/**
 * Sortable lis component
 */
const ListContainer = styled(SortableFormList)`
  max-height: 225px;
  min-height: 225px;
`;

/**
 * Salad title container component
 */
const SaladTitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`;

export const SaladDetail = (props) => {
  const dispatch = useDispatch();

  const { salad, onCancel, onSubmit } = props;

  const [editMode, setEditMode] = useState(false);
  const [totalValues, setTotalValues] = useState({
    totalCost: 0,
    totalWeight: 0,
  });

  const ingredients = useSelector((state) => state.ingredients.value);
  const businessLogic = useSelector((state) => state.businessLogic.value);

  // Salad type and salad name are defined with default value
  const [saladType, setSaladType] = useState("small");
  const [saladName, setSaladName] = useState("Salad Name");

  // Used and not used ingredients are stored for the list management
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [notUsedIngredients, setNotUsedIngredients] = useState([]);

  useEffect(() => {
    // If there is ingredients, not used is set to all ingredients
    if (ingredients?.length) {
      setNotUsedIngredients(ingredients);
    }

    // If there is salad, used ingredients should be set
    if (salad && salad.id && ingredients) {
      let newUsedIngredients = [],
        usedIngredientIds = [],
        newNotUsedIngredients = [];

      // Map salad.ingredients and match with correct data
      newUsedIngredients = salad.ingredients.map((saladIngredient) => {
        const originalIngredient =
          ingredients.find(
            (ingredient) => ingredient.id == saladIngredient.id
          ) || {};
        usedIngredientIds.push(saladIngredient.id);

        return {
          ...originalIngredient,
          ...saladIngredient,
        };
      });

      // If ingredient is not used, add to new not used ingredients
      ingredients.forEach((item) => {
        if (usedIngredientIds.indexOf(item.id) === -1) {
          newNotUsedIngredients.push({ ...item });
        }
      });

      setUsedIngredients(newUsedIngredients);
      setNotUsedIngredients(newNotUsedIngredients);
      setSaladName(salad.name);
      setSaladType(salad.size);
    }
  }, [salad, ingredients]);

  useEffect(() => {
    if (!ingredients?.length) {
      getIngredients(dispatch);
    }

    if (!businessLogic) {
      getBusinessLogic(dispatch);
    }
  }, []);

  //Toggle edit mode view for the title
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  /**
   *
   * @param {object} ingredient updated ingredient value
   * @param {string} oldIngredientId exist if ingredient is changed in item.
   */
  const onItemChange = (ingredient, oldIngredientId) => {
    let newUsedIngredients = usedIngredients,
      newNotUsedIngredients = notUsedIngredients;

    // If there is oldIngredientId, not used list should filter
    if (oldIngredientId) {
      newNotUsedIngredients = notUsedIngredients.filter(
        (item) => item.id != ingredient.id
      );
      newNotUsedIngredients.push({
        ...ingredients.find((item) => item.id == oldIngredientId),
      });
    }

    // If there is oldIngredientId, used list should contain that item
    newUsedIngredients = usedIngredients.map((item) =>
      item.id == ingredient.id || item.id === oldIngredientId
        ? ingredient
        : item
    );

    setUsedIngredients(newUsedIngredients);
    setNotUsedIngredients(newNotUsedIngredients);
  };

  /**
   * Add item to list
   */
  const addNewItemToList = () => {
    let newUsedIngredients = [],
      newNotUsedIngredients = [];

    // Add first item the used list
    newUsedIngredients = usedIngredients.concat([
      {
        ...notUsedIngredients[0],
        numOfServings: 1,
      },
    ]);

    // Remove first item from not used list
    newNotUsedIngredients = notUsedIngredients.slice(1);

    setUsedIngredients(newUsedIngredients);
    setNotUsedIngredients(newNotUsedIngredients);
  };

  /**
   * Delete ingredient item
   *
   * @param {object} ingredient item which will be deleted
   */
  const deleteIngredientItem = (ingredient) => {
    let newUsedIngredients = [],
      newNotUsedIngredients = [];

    // Filter used list
    newUsedIngredients = usedIngredients.filter(
      (item) => item.id != ingredient.id
    );

    // Add item to the not used list
    newNotUsedIngredients = notUsedIngredients.concat([
      { ...ingredients.find((item) => item.id == ingredient.id) },
    ]);

    setUsedIngredients(newUsedIngredients);
    setNotUsedIngredients(newNotUsedIngredients);
  };

  // Calculate total weight and cost when used list is changed
  useEffect(() => {
    const newTotalValues = usedIngredients.reduce(
      (sum, item) => {
        return {
          totalCost: sum.totalCost + item.numOfServings * item.costPerServing,
          totalWeight:
            sum.totalWeight + item.numOfServings * item.weightPerServing,
        };
      },
      {
        totalCost: 0,
        totalWeight: 0,
      }
    );

    setTotalValues(newTotalValues);
  }, [usedIngredients]);

  /**
   * This function is added to check amount of salad
   * Tolerance is set to 0.25. It can be margin in businessLogic
   *
   * @returns bolean
   */
  const isAmountInRange = () => {
    if (businessLogic) {
      const margin = 0.25;
      const targetCost = businessLogic.saladTypes[saladType].targetCost;
      const targetWeight = businessLogic.saladTypes[saladType].targetWeight;

      return (
        Math.abs(totalValues.totalCost - targetCost) < targetCost * margin &&
        Math.abs(totalValues.totalWeight - targetWeight) < targetWeight * margin
      );
    }
  };

  /**
   * On salad type changed
   *
   * @param {object} event event object
   */
  const onSaladTypeChange = (event) => {
    setSaladType(event.target.value);
  };

  /**
   * On salad name changed
   *
   * @param {object} event event object
   */
  const onSaladNameChange = (event) => {
    setSaladName(event.target.value);
  };

  /**
   * Prepare submit click and trigger onSubmit
   */
  const onSubmitButtonClick = async () => {
    const data = {
      id: salad?.id,
      name: saladName,
      size: saladType,
      ingredients: usedIngredients.map((item) => ({
        id: Number(item.id),
        numOfServings: Number(item.numOfServings),
      })),
      cost: Number(totalValues.totalCost),
      price: Number(totalValues.totalCost * (1 + businessLogic.margin)),
      hoursFresh: Math.min(...usedIngredients.map((item) => item.hoursFresh)),
      targetStockByWeekday: salad.targetStockByWeekday,
      currentStock: salad.currentStock,
    };

    onSubmit(data);
  };

  /**
   * Trigger onCancel
   */
  const onCancelButtonClick = () => {
    onCancel();
  };

  return (
    <div>
      {/* Header section */}
      <Header>
        <SaladTitleContainer>
          {editMode ? (
            <FaCheck
              role="action-close-edit-name"
              size={25}
              style={{ color: "gray" }}
              onClick={toggleEditMode}
            />
          ) : (
            <FaEdit
              role="action-edit-name"
              size={25}
              style={{ color: "gray" }}
              onClick={toggleEditMode}
            />
          )}
          {editMode ? (
            <FormTitleInput
              type="text"
              role="input-salad-name"
              value={saladName}
              onChange={onSaladNameChange}
            />
          ) : (
            <FormTitle>{saladName}</FormTitle>
          )}
        </SaladTitleContainer>
        <LabelSelect
          role="select-salad-type"
          value={saladType}
          onChange={onSaladTypeChange}
        >
          {businessLogic &&
            Object.keys(businessLogic.saladTypes).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
        </LabelSelect>
      </Header>
      <Divider />
      {/* Information text section */}
      <InfoTextContainer>
        {businessLogic && (
          <FormInfoText>
            target cost/weight: {businessLogic.saladTypes[saladType].targetCost}
            € / {businessLogic.saladTypes[saladType].targetWeight}g
          </FormInfoText>
        )}
      </InfoTextContainer>

      {/* Information text for current weight and cost section */}
      {/* If amount is in range, color is green */}
      <InfoTextContainer
        style={{
          marginTop: "35px",
          color: isAmountInRange() ? "green" : "red",
        }}
      >
        <FormInfoText>
          total cost: {totalValues.totalCost.toFixed(2)}€
        </FormInfoText>
        <FormInfoText>
          total weight: {totalValues.totalWeight.toFixed(2)}g
        </FormInfoText>
      </InfoTextContainer>

      {/* Ingredients list section */}
      {usedIngredients?.length ? (
        <ListContainer list={usedIngredients} setList={setUsedIngredients}>
          {usedIngredients.map((item) => (
            <IngredientItem
              key={item.id}
              ingredient={item}
              ingredients={notUsedIngredients}
              onChange={onItemChange}
              onDelete={deleteIngredientItem}
            />
          ))}
        </ListContainer>
      ) : (
        <FormList>
          <InfoText type={InfoTextTypes.WARNING}>
            There is no item in salad.
          </InfoText>
        </FormList>
      )}

      {/* Add ingredients button */}
      <AddButton
        role="button-add-ingredient"
        onClick={addNewItemToList}
        disabled={notUsedIngredients.length === 0}
      >
        +
      </AddButton>

      {/* Footer section */}
      <Footer>
        <CancelButton role="button-cancel-salad" onClick={onCancelButtonClick}>
          Cancel
        </CancelButton>
        <SaveButton role="button-submit-salad" onClick={onSubmitButtonClick}>
          Save
        </SaveButton>
      </Footer>
    </div>
  );
};

export default SaladDetail;
