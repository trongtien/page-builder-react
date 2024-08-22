import React, { useMemo } from "react";
import DeleteIcon from "../../../assets/images/icons/delete.svg";

import { Button } from "antd";
import useModal from "../../../hooks/useModal";

const ModalConfirmDelete = () => {
  const { closeModal, modelData } = useModal();

  const modalData = useMemo(() => modelData, [modelData]);

  const title = modalData?.title ? modalData?.title : "Dữ liệu";
  
  const description = modalData?.description
    ? modalData?.description
    : "Sau khi xóa dữ liệu sẽ không thể hoàn tác. Dữ liệu con cũng sẽ bị xóa theo đối tượng";

  const cancelTitle = modalData?.cancelTitle ? modalData?.cancelTitle : "Hủy";
  
  const confirmTitle = modalData?.confirmTitle
    ? modalData?.confirmTitle
    : "Xác nhận";

  const handleConfirmSuccess = () => {
    try {
      closeModal();
      modelData?.onHandleConfirm()('test');
    } catch (error) {
      console.error(`handle confirm success error ${error}`)
    }
  };

  return (
    <div className="p-4 modal__delete">
      <div className="flex justify-center">
        <DeleteIcon />
      </div>
      <div className="dialog__content__body">
        <div className="modal__delete__title my-2">
          Bạn chắc chắn muốn xóa {`"${title}"`}?
        </div>
        <div className="modal__delete__desc px-2">{description}</div>
      </div>
      <div className="coreLayout__card__action mt-4 flex justify-end gap-5">
        <Button type="default" onClick={closeModal}>
          {cancelTitle}
        </Button>
        <Button type="primary" onClick={handleConfirmSuccess}>
          {confirmTitle}
        </Button>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
