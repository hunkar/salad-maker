import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteSalad, getSalads, postSalad } from "@/utils/Services";
import { ActionButton, Label } from "../CommonComponents";
import { Modal } from "../Modal";
import { SaladDetail } from "../SaladDetail";
import { Table } from "../Table";

/**
 * Action button container component
 */
const ActionButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

/**
 * View which shows salad list
 * 
 * @returns View
 */
export const SaladList = () => {
  // Salad will be show in the modal
  const [selectedSalad, setSelectedSalad] = useState(null);

  const dispatch = useDispatch();
  const salads = useSelector((state) => state.salads.value);

  // Get salads if it is not exist
  useEffect(() => {
    if (!salads?.length) {
      getSalads(dispatch);
    }
  }, []);

  // Close salad detail modal
  const closeModal = () => {
    setSelectedSalad(null);
  };

  // Open salad detail with empty salad
  const addNewItemToList = () => {
    setSelectedSalad({});
  };

  // Open salad detail with existed salad
  const onUpdateClick = (salad) => {
    setSelectedSalad(salad);
  };

  // If salad is in use and has targetStockByWeekday, doesn't allow deletion
  // This check can be added in the backend side
  const onDeleteClick = async (salad) => {
    if (salad?.targetStockByWeekday?.length) {
      alert(
        "This salad is used in the active planning. You can delete salad if you make new plan without this salad."
      );
    } else {
      await deleteSalad(dispatch, salad);
    }
  };

  // Save salad and close modal
  const onSubmit = async (salad) => {
    await postSalad(dispatch, salad);
    setSelectedSalad(null);
  };

  // Table fields which will be shown in the table
  const tableFields = [
    {
      key: "name",
      title: "Name",
    },
    {
      key: "size",
      title: "Salad Type",
      position: "center",
      // Create label for the size
      componentCreator: ({ size }) => <Label>{size}</Label>,
    },
    {
      key: "cost",
      title: "Cost",
      position: "center",
      // Transform number to the readable text
      textFormat: (cost) => `${cost.toFixed(2)} €`,
    },
    {
      key: "price",
      title: "Price",
      position: "center",
      // Transform number to the readable text
      textFormat: (price) => `${price.toFixed(2)} €`,
    },
    {
      key: "actionButtons",
      position: "right",
      // Create delete and udpate buttons for the salad
      componentCreator: (salad) => (
        <ActionButtonContainer>
          <ActionButton
            role="button-delete-salad"
            onClick={() => onDeleteClick(salad)}
          >
            <FaTrashAlt size={20} />
          </ActionButton>
          <ActionButton
            role="button-update-salad"
            onClick={() => onUpdateClick(salad)}
          >
            <FaEdit size={20} />
          </ActionButton>
        </ActionButtonContainer>
      ),
    },
  ];

  return (
    <div>
      {selectedSalad && (
        <Modal>
          <SaladDetail
            salad={selectedSalad}
            onCancel={closeModal}
            onSubmit={onSubmit}
          />
        </Modal>
      )}
      <Table
        title={"Salad List"}
        tableFields={tableFields}
        list={salads}
        onAddClick={addNewItemToList}
      />
    </div>
  );
};

export default SaladList;
