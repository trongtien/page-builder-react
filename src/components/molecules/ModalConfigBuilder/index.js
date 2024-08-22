import React from "react"
import useModal from "../../../hooks/useModal";

const ModalConfigBuilder = () => {
    const { closeModal, modelData } = useModal();
    const dataPropsComponent = modelData?.dataPropsComponent


    return (
        <div>
            Modal Config builder
        </div>
    )
}

export default ModalConfigBuilder