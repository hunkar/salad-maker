const { styled } = require("styled-components");
import { ReactSortable } from "react-sortablejs";
import {
  FormInfoTextStyle,
  FormItemStyle,
  FormTextStyle,
  FormTitleStyle,
  LabelStyle,
} from "./styles";

/**
 * Divider style for the forms
 */
export const Divider = styled.div`
  background-clip: content-box, padding-box;
  background-color: gray;
  height: 2px;
  margin: 15px 0px;
  opacity: 0.3;
  width: 100%;
`;

/**
 * Label style for the forms
 */
export const Label = styled.div`
  ${LabelStyle}
`;

/**
 * Select input with label style for the forms
 */
export const LabelSelect = styled.select`
  ${LabelStyle}
  padding: 5px 0px;

  option {
    font-size: 16px;
  }
`;

/**
 * Title style for the forms
 */
export const FormTitle = styled.div`
  ${FormTitleStyle}
`;

/**
 * Input style with title component for the forms
 */
export const FormTitleInput = styled.input`
  ${FormTitleStyle}
`;

/**
 * Info text component for the forms
 */
export const FormInfoText = styled.div`
  ${FormInfoTextStyle}
`;

/**
 * Normal text component for the forms
 */
export const FormText = styled.div`
  ${FormTextStyle}
`;

/**
 * Normal text input component for the forms
 */
export const FormTextInput = styled.input`
  ${FormTextStyle}
  ${FormItemStyle}
`;

/**
 * Normal select input component for the forms
 */
export const FormTextSelect = styled.select`
  ${FormTextStyle}
  ${FormItemStyle}
  border-radius: 5px;
  min-width: 250px;
  padding: 5px 0px;

  @media (max-width: 700px) {
    min-width: 0px;
    max-width: 100%;
  }

  option {
    ${FormTextStyle}
  }
`;

/**
 * Header container component for the forms
 */
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

/**
 * Button component for the forms
 */
export const FormButton = styled.button`
  ${FormItemStyle}
  background-color: #e0e0e0;
  color: #151515;
  font-size: 15px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) -3px 0px 20px;
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

/**
 * Action button component for the form
 */
export const ActionButton = styled(FormButton)`
  ${FormItemStyle}
  background-color: transparent;
  border: none;
  color: #a9a9a9;
`;

/**
 * Item component for the form lists
 */
export const FormListItem = styled.div`
  ${FormItemStyle}
  align-items: center;
  background-color: #f2f2f2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 5px 0px;
  padding: 10px;
  width: 100%;
`;

/**
 * List component for the forms
 */
export const FormList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 5px 0px;
  overflow-y: auto;
  width: 100%;
`;

/**
 * Sortable component for the forms
 */
export const SortableFormList = styled(ReactSortable)`
  margin: 5px 0px;
  overflow-y: auto;
  width: 100%;
`;

/**
 * Footer container style for the pages
 */
export const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: flex-end;
  margin: 15px 0px;
`;

/**
 * Footer buttons component
 */
export const FooterButton = styled(FormButton)`
  color: white;
  font-size: 15px;
  height: 30px;
  min-width: 100px;
  padding: 5px 25px;
`;

/**
 * Footer button which has different color
 */
export const SaveButton = styled(FooterButton)`
  background-color: #ffa62e;
`;

/**
 * Footer button which has different color
 */
export const CancelButton = styled(FooterButton)`
  background-color: #c4c4c4;
`;

/**
 * Body container component for the list pages
 */
export const BodyContainer = styled.div`
  background-color: #c4c4c4;
  padding: 15px;
`;

/**
 * Wrapper container component for the pages
 */
export const Wrapper = styled.div`
  background-color: white;
  border-radius: 15px;
  height: 100%;
  max-height: 100%;
  padding: 50px;

  @media (max-width: 700px) {
    padding: 15px;
   }
`;

/**
 * Card item container component
 */
export const Card = styled.div`
  background-color: white;
  border: 2px #00000010 solid;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  max-height: 500px;
  width: 100%;
`;
