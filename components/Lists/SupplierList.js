import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients, getSuppliers } from "@/utils/Services";
import { Table } from "../Table";

/**
 * View which shows supplier list
 *
 * @returns View
 */
export const SupplierList = () => {
  const dispatch = useDispatch();

  const suppliers = useSelector((state) => state.suppliers.value);
  const ingredients = useSelector((state) => state.ingredients.value);

  useEffect(() => {
    if (!suppliers?.length) {
      getSuppliers(dispatch);
    }

    if (!ingredients?.length) {
      getIngredients(dispatch);
    }
  }, []);

  // Table fields which will be shown in the table
  const tableFields = [
    {
      key: "name",
      title: "Supplier Name",
    },
    {
      key: "productsToOrder",
      title: "Total Orders From Last Planning",
      position: "left",
      // Create total order text for the suppliers
      textFormat: (index, key, item) => {
        // Check if data exist
        if (!ingredients?.length || !item.productsToOrder?.length) {
          return "-";
        }

        // Create orders with sum value of product
        const orders = {};

        item.productsToOrder.forEach((productsOfDay) => {
          productsOfDay.forEach((product) => {
            orders[product.id] = (orders[product.id] || 0) + product.value;
          });
        });

        // Create text for the orders in kg
        return Object.entries(orders)
          .map(([key, productWeight]) => {
            const usedIngredient = ingredients.find(
              (ingredient) => ingredient.id == key
            );
            const weightAsKg = productWeight / 1000;

            return `${usedIngredient.name}:${weightAsKg.toFixed(2)}kg`;
          })
          .join(",");
      },
    },
  ];

  return (
    <div>
      <Table
        title={"Supplier List"}
        tableFields={tableFields}
        list={suppliers}
      />
    </div>
  );
};

export default SupplierList;
