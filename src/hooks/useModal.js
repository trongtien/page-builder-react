import { useContext } from "react";
import { ModalContext } from "../components/atoms/modals/ModalProvider";

const useModal = () => {
  const { modelData, closeModal, openModal } = useContext(ModalContext);
  return { modelData, openModal, closeModal };
};

export default useModal;
