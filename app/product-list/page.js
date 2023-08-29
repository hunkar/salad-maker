"use client";
import ReduxWrapper from "@/components/ReduxWrapper";
import { BodyContainer } from "@/components/CommonComponents";
import { Navigation } from "@/components/Navigation";
import { ProductList } from "@/components/Lists";

/**
 * Shows product list
 * 
 * @returns View
 */
export const Products = () => {
  return (
    <ReduxWrapper>
      <Navigation />
      <BodyContainer>
        <ProductList />
      </BodyContainer>
    </ReduxWrapper>
  );
};

export default Products;
