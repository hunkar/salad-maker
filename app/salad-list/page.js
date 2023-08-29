"use client";
import ReduxWrapper from "@/components/ReduxWrapper";
import { BodyContainer } from "@/components/CommonComponents";
import { Navigation } from "@/components/Navigation";
import { SaladList } from "@/components/Lists";

/**
 * Show salad list
 *
 * @returns View
 */
export const Salads = () => {
  return (
    <ReduxWrapper>
      <Navigation />
      <BodyContainer>
        <SaladList />
      </BodyContainer>
    </ReduxWrapper>
  );
};

export default Salads;
