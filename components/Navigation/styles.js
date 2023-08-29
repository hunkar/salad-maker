import { styled } from "styled-components";

/**
 * Navigation view container component
 */
export const NavigationContainer = styled.div`
  background-color: #ffa62e;
  color: white;
  display: flex;
  font-size: 23px;
  position: sticky;
  top: 0;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  z-index: 2;
`;

/**
 * Navigation item component
 * Extra attribute is added for the tests
 */
export const NavigationItem = styled.div.attrs((props) => ({
  "data-selected": props.selected,
}))`
  background-color: ${(props) => (props.selected ? "#96631d" : "#ffa62e")};
  border-right: 2px solid #ffffff40;
  cursor: pointer;
  display: flex;
  padding: 15px;

  &:hover {
    cursor: pointer;
    background-color: #fab85f;
  }
`;
