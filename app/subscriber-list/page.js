"use client";
import ReduxWrapper from "@/components/ReduxWrapper";
import { BodyContainer } from "@/components/CommonComponents";
import { Navigation } from "@/components/Navigation";
import { SubscriberList } from "@/components/Lists";

/**
 * Show subscriber list
 * 
 * @returns View
 */
export const Subscribers = () => {
  return (
    <ReduxWrapper>
      <Navigation />
      <BodyContainer>
        <SubscriberList />
      </BodyContainer>
    </ReduxWrapper>
  );
};

export default Subscribers;
