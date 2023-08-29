import { FaPlus } from "react-icons/fa";
import {
  AddButton,
  Table,
  TableContainer,
  TableHeader,
  TableHeaderRow,
  TableHeadColumn,
  TableBody,
  TableBodyRow,
  TableColumn,
  CustomColumnContainer,
  ColumnText,
} from "./styles";
import { Divider, FormTitle, Header, Wrapper } from "../CommonComponents";
import { InfoText, InfoTextTypes } from "../InfoText";

export const TableComponent = (props) => {
  const { title, tableFields = [], list = [], onAddClick } = props;

  return (
    <Wrapper>
      {/* Table title section */}
      <Header>
        <FormTitle>{title}</FormTitle>
        <div>
          {onAddClick && (
            <AddButton role="table-add-click" onClick={onAddClick}>
              <FaPlus /> Add
            </AddButton>
          )}
        </div>
      </Header>
      <Divider />
      {list?.length ? (
        <TableContainer>
          {/* Table section */}
          <Table>
            {/* Table header section */}
            <TableHeader>
              <TableHeaderRow>
                {/* Table header items */}
                {tableFields.map((field, index) => (
                  <TableHeadColumn key={index} position={field.position}>
                    {field.title}
                  </TableHeadColumn>
                ))}
              </TableHeaderRow>
            </TableHeader>
            {/* Table body */}
            <TableBody>
              {/* Table body items */}
              {list.map((item, index) => (
                <TableBodyRow key={index}>
                  {tableFields.map((field, index) => (
                    <TableColumn key={index}>
                      {field.componentCreator ? (
                        <CustomColumnContainer position={field.position}>
                          {field.componentCreator(item)}
                        </CustomColumnContainer>
                      ) : (
                        <ColumnText position={field.position}>
                          {field.textFormat
                            ? field.textFormat(item[field.key], field.key, item)
                            : item[field.key]}
                        </ColumnText>
                      )}
                    </TableColumn>
                  ))}
                </TableBodyRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <InfoText type={InfoTextTypes.WARNING}>There is no item!</InfoText>
      )}
    </Wrapper>
  );
};

export default TableComponent;
