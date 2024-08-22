import React from 'react'
import { DIALOG_MODAL } from "../../../config/enum/dialogModal.enum";

/**
 *
 * @param {*} param
 * @returns
 */
export function ConfigModal(param) {
  const defaultTitle = param?.title ? "Title modal" : param?.title;
  const defaultWidth = param?.width ? "520px" : param?.width;
  const defaultContent = param?.content ? param?.content : null;
  const defaultData = param?.dataPropsComponent ? param?.dataPropsComponent : null;
  const defaultNodeComponentCustom = param?.nodeComponentCustom ? param?.nodeComponentCustom : <span>Node Component custom change field param nodeComponentCustom</span>;
  const defaultTypeModal = param?.type ? param?.type : DIALOG_MODAL.MODAL_TYPE.CUSTOM;

  const defaultOnHandleClose = param?.onHandleClose
    ? param?.onHandleClose
    : () => {};
  
    const defaultOnHandleConfirm = param?.onHandleConfirm
    ? () => param?.onHandleConfirm
    : () => {};

  return {
    title: defaultTitle,
    width: defaultWidth,
    content: defaultContent,
    typeModal: defaultTypeModal,
    nodeComponentCustom: defaultNodeComponentCustom,
    dataPropsComponent: defaultData,
    onHandleClose: defaultOnHandleClose,
    onHandleConfirm: defaultOnHandleConfirm,
  };
}
