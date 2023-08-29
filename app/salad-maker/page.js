"use client";
import ReduxWrapper from "@/components/ReduxWrapper";
import { Navigation } from "@/components/Navigation";
import { Planner } from "@/components/Planner";
import { BodyContainer } from "@/components/CommonComponents";

// Main code here.
/**
 * Shows Planner page
 *
 * @returns View
 */
export const SaladMaker = () => {
  return (
    <ReduxWrapper>
      <Navigation />
      <BodyContainer>
        <Planner />
      </BodyContainer>
    </ReduxWrapper>
  );
};

export default SaladMaker;
