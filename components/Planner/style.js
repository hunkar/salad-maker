import styled from "styled-components";

/**
 * Filter container component
 */
export const FilterContainer = styled.div`
  padding: 50px;

  @media (max-width: 700px) {
    padding: 15px;
  }
`;

/**
 * Salad selection container component
 */
export const SaladSelectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 0px;

  @media (max-width: 700px) {
    flex-direction: row;
    gap: 10px;
  }
`;

/**
 * Report container component
 */
export const ReportContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 25px;
`;
