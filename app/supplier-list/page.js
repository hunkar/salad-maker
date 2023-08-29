"use client";
import ReduxWrapper from "@/components/ReduxWrapper";
import { BodyContainer } from "@/components/CommonComponents";
import { Navigation } from "@/components/Navigation";
import { SupplierList } from "@/components/Lists";

/**
 * Show supplier list
 * 
 * @returns View
 */
export const Suppliers = (props) => {
  return (
    <ReduxWrapper>
      <Navigation />
      <BodyContainer>
        <SupplierList />
      </BodyContainer>
    </ReduxWrapper>
  );
};

export default Suppliers;
