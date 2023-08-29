import styled from "styled-components";
import { ActionButton } from "../CommonComponents";
import { FormItemStyle, FormTextStyle } from "../CommonComponents/styles";

/**
 * Column text component
 */
export const ColumnText = styled.div`
  ${FormTextStyle}
  padding: 5px 0px;
  text-align: ${(props) => props.position || "left"};
  white-space: pre-line;
`;

/**
 * Table component
 */
export const Table = styled.table`
  ${FormItemStyle}
  background-color: #f2f2f2;
  border-collapse: collapse;
  padding: 10px;
  width: 100%;
`;

/**
 * Table header component
 */
export const TableHeader = styled.thead`
  ${FormItemStyle}
  ${FormTextStyle}
  border-bottom: 2px black;
  font-weight: bold;
  position: sticky;
  top: 0;
`;

/**
 * Table column component
 */
export const TableColumn = styled.td`
  padding: 10px;
`;

/**
 * Table header row component
 */
export const TableHeaderRow = styled.tr`
  background-color: #f2f2f2;
  border-bottom: 2px #c4c4c4 solid;
  text-align: left;
`;

/**
 * Table body row component
 */
export const TableBodyRow = styled.tr`
  border-bottom: 1px #c4c4c4 solid;
`;

/**
 * Table header column component
 */
export const TableHeadColumn = styled.th`
  padding: 10px;
  text-align: ${(props) => props.position || "left"};
`;

/**
 * Table container component
 */
export const TableContainer = styled.div`
  height: 90%;
  overflow-x: auto;
`;

/**
 * Table body component
 */
export const TableBody = styled.tbody``;

/**
 * Custom column container component
 */
export const CustomColumnContainer = styled.div`
  display: flex;
  justify-content: ${(props) => props.position || "left"};
`;

/**
 * Add button component
 */
export const AddButton = styled(ActionButton)`
  align-items: center;
  background-color: green;
  color: white;
  display: flex;
  font-weight: bold;
  gap: 10px;
  padding: 5px 15px;
`;
