import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredients,
  getSalads,
  getSubscriptions,
  getSuppliers,
  postSaladPlanner,
} from "@/utils/Services";
import {
  Divider,
  Header,
  FormTitle,
  Label,
  BodyContainer,
  Wrapper,
  Card,
  FormTextSelect,
  FormText,
  Footer,
  SaveButton,
} from "../CommonComponents";
import {
  FilterContainer,
  ReportContainer,
  SaladSelectionContainer,
} from "./style";
import { InfoText, InfoTextTypes } from "../InfoText";
import { Table } from "../Table";
import { SubscriberList } from "../Lists";

/**
 * View which shows planner screen
 *
 * @returns View
 */
export const Planner = () => {
  const dispatch = useDispatch();

  // This variable is used for the show/close report section
  const [isPlannerDataAvailable, setIsPlannerDataAvailable] = useState(false);

  // Salads which will be used for the planning
  const [usedSalads, setUsedSalads] = useState({
    small: null,
    medium: null,
    large: null,
  });

  const salads = useSelector((state) => state.salads.value);
  const ingredients = useSelector((state) => state.ingredients.value);
  const subscriptions = useSelector((state) => state.subscriptions.value);
  const suppliers = useSelector((state) => state.suppliers.value);

  // Post selected salads for the planing to the backed
  const makePlan = async () => {
    await postSaladPlanner(dispatch, {
      saladIds: [usedSalads.small, usedSalads.medium, usedSalads.large],
    });
  };

  useEffect(() => {
    if (!salads?.length) {
      getSalads(dispatch);
    }

    if (!suppliers?.length) {
      getSuppliers(dispatch);
    }

    if (!ingredients?.length) {
      getIngredients(dispatch);
    }

    if (!subscriptions?.length) {
      getSubscriptions(dispatch);
    }
  }, []);

  // Set planned data availability when all datas set
  useEffect(() => {
    let isDataAvailable = false;

    isDataAvailable =
      suppliers?.length &&
      salads?.length &&
      ingredients?.length &&
      subscriptions?.length;

    isDataAvailable =
      isDataAvailable &&
      suppliers.filter((item) => item.productsToOrder?.length).length > 0;

    isDataAvailable =
      isDataAvailable &&
      salads.filter((item) => item.targetStockByWeekday?.length).length > 0;

    setIsPlannerDataAvailable(isDataAvailable);
  }, [salads, suppliers, ingredients, subscriptions]);

  // Create select input for the salad selection
  const getSaladTypeSelection = (salad) => {
    const onSaladSelectionChange = (event) => {
      setUsedSalads({
        ...usedSalads,
        [salad.key]: Number(event.target.value),
      });
    };

    // Added additionaly disabled option as a placeholder
    return (
      <div key={salad.key}>
        <FormText>{salad.title}</FormText>
        <FormTextSelect
          role={`select-${salad.key}`}
          value={usedSalads[salad.key] || -1}
          onChange={onSaladSelectionChange}
        >
          <option key={-1} disabled value={-1}>
            Please select option
          </option>
          {salads
            .filter((item) => item.size === salad.key)
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </FormTextSelect>
      </div>
    );
  };

  /**
   * Supplier list table
   *
   * @returns View
   */
  const getSupplierList = () => {
    // format to readable text for the order items
    const textFormat = (index, key, item) => {
      return item.productsToOrder[key]
        .map((product) => {
          const usedIngredient = ingredients.find(
            (ingredient) => ingredient.id === product.id
          );
          const weightAsKg = product.value / 1000;

          return `${usedIngredient.name}:${weightAsKg.toFixed(2)}kg`;
        })
        .join("\n");
    };

    // Table fields which will be shown in the table
    const tableFields = [
      {
        key: "name",
        title: "Supplier Name",
      },
      ...["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
        (day, index) => ({
          key: index,
          title: day,
          textFormat,
        })
      ),
    ];

    return (
      <Table
        title={"Supplier List"}
        tableFields={tableFields}
        list={suppliers.filter((salad) => salad.productsToOrder?.length)}
      />
    );
  };

  const getSaladList = () => {
    // Table fields which will be shown in the table
    const tableFields = [
      {
        key: "name",
        title: "Salad Name",
      },
      {
        key: "size",
        title: "Salad Type",
        position: "center",
        // Create label for the size
        componentCreator: ({ size }) => <Label>{size}</Label>,
      },
      // Add columns for each day
      ...["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
        (day, index) => ({
          key: index,
          title: day,
          textFormat: (index, key, item) =>
            `${item.targetStockByWeekday[key]} salads`,
        })
      ),
    ];

    return (
      <Table
        title={"Salad List"}
        tableFields={tableFields}
        list={salads.filter((salad) => salad.targetStockByWeekday?.length)}
      />
    );
  };

  return (
    <Wrapper>
      {/* Header Section */}
      <Header>
        <FormTitle>Order Planner</FormTitle>
      </Header>
      <Divider />
      {/* Input Section */}
      <Card>
        <FilterContainer>
          <SaladSelectionContainer>
            {[
              { title: "Small Salad", key: "small" },
              { title: "Medium Salad", key: "medium" },
              { title: "Large Salad", key: "large" },
            ].map(getSaladTypeSelection)}
          </SaladSelectionContainer>
          <Footer>
            {/* SaveButton should be disabled if salads not selected */}
            <SaveButton
              role="button-run-planner"
              disabled={
                !usedSalads.small || !usedSalads.medium || !usedSalads.large
              }
              onClick={makePlan}
            >
              Start Planner
            </SaveButton>
          </Footer>
        </FilterContainer>
      </Card>
      {/* Report Section */}
      <Header style={{ marginTop: "15px" }}>
        <FormTitle>Plans</FormTitle>
      </Header>
      <Divider />
      {isPlannerDataAvailable ? (
        <ReportContainer>
          {/* Supplier Card */}
          <Card>{getSupplierList()}</Card>
          {/* Salad Card */}
          <Card>{getSaladList()}</Card>
          {/* Subscriber Card */}
          <Card>
            <SubscriberList />
          </Card>
        </ReportContainer>
      ) : (
        <InfoText type={InfoTextTypes.WARNING}>
          There is no data for planning.
        </InfoText>
      )}
    </Wrapper>
  );
};

export default Planner;
