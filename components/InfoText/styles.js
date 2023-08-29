import { styled } from "styled-components";

/**
 * Text container of component
 */
export const TextContainer = styled.div`
  background-color: ${(props) => props.color}20;
  color: ${(props) => props.color};
  border: 2px ${(props) => props.color} solid;
  border-radius: 15px;
  font-size: 20px;
  padding: 15px;
  text-align: center;
  width: 100%;
`;
