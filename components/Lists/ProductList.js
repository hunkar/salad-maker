import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "@/utils/Services";
import { Table } from "../Table";

/**
 * Component which shows product list
 * @returns View
 */
export const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.ingredients.value);

  useEffect(() => {
    if (!productList?.length) {
      getIngredients(dispatch);
    }
  }, []);

  // Fields which will be shown in the table
  const tableFields = [
    {
      key: "name",
      title: "Product Name",
    },
    {
      key: "hoursFresh",
      title: "Freshness Duration",
      position: "center",
      //Transform number to the readable text
      textFormat: (hoursFresh) => `${hoursFresh} hours`,
    },
    {
      key: "weightPerServing",
      title: "Weight Per Serving",
      position: "center",
      //Transform number to the readable text
      textFormat: (weightPerServing) => `${weightPerServing} g`,
    },
    {
      key: "costPerServing",
      title: "Cost Per Serving",
      position: "center",
      //Transform number to the readable text
      textFormat: (costPerServing) => `${costPerServing} €`,
    },
  ];

  return (
    <Table
      title={"Product List"}
      tableFields={tableFields}
      list={productList}
    />
  );
};

export default ProductList;
