import React, { useState } from "react";
import { createContext } from "react";
import { Modal } from "antd";
import { ConfigModal } from "./ConfigModal";
import { DIALOG_MODAL } from "../../../config/enum/dialogModal.enum";
import ModalConfirmDelete from "./ModalConfirmDelete";

export const ModalContext = createContext();

const ModalContentCustom = (props) => (
  <div className="dialog__content">{props.children}</div>
);

Modal.ContentCustom = ModalContentCustom;

const ModalProvider = (props) => {
  const { children } = props;

  const [modal, updateModal] = useState({
    open: false,
    config: ConfigModal(),
  });

  const onCancel = () => {
    closeModal();
    modal?.config?.onHandleClose();
  };

  const closeModal = () => {
    updateModal({
      open: false,
    });
  };

  const openModal = (data) => {
    updateModal({
      open: true,
      config: data,
    });
  };

  return (
    <ModalContext.Provider
      value={{ open, openModal, closeModal, modelData: modal.config }}
    >
      {children}
      <Modal
        id="modal"
        destroyOnClose={true}
        width={modal.config?.width}
        open={modal?.open ?? false}
        footer={null}
        maskClosable={false}
        transitionName={modal?.open ? "fade-in-down" : "fade-out-up"}
        wrapClassName="dialog"
        title={modal.config?.title}
        onCancel={onCancel}
      >
        <Modal.ContentCustom>
          {modal?.config?.typeModal === DIALOG_MODAL.MODAL_TYPE.CONFIRM ? (
            <ModalConfirmDelete />
          ) : (
            modal?.config?.nodeComponentCustom
          )}
        </Modal.ContentCustom>
      </Modal>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
