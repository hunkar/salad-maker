import { styled } from "styled-components";

export const Modal = styled.div`
  align-items: center;
  background-color: #000000da;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
`;

export const ModalBody = styled.div`
  background-color: white;
  border: 2px gray solid;
  border-radius: 5px;
  max-width: 80%;
  min-height: 50%;
  padding: 15px;
  width: 50%;

  @media (max-width: 700px) {
    width: 80%;
    max-width: 80%;
    min-height: 70%;
  }
`;
