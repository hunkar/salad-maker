import { Modal as ModalComponent, ModalBody } from "./styles";

/**
 * View which show modal
 *
 * @returns View
 */
const Modal = ({ children }) => {
  return (
    <ModalComponent data-testid="modal-container">
      <ModalBody>{children}</ModalBody>
    </ModalComponent>
  );
};

export default Modal;
