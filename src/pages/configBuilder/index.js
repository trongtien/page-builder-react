import "./style.scss";
import React, { lazy, Suspense, useState } from "react";
import BuilderLayout from "./BuilderLayout";
import BuilderContentLoading from "./BuilderContentLoading";
import { v4 as uuidv4 } from "uuid";
import { ConfigModal } from "../../components/atoms/modals/ConfigModal";
import useModal from "../../hooks/useModal";
import { DIALOG_MODAL } from "../../config/enum/dialogModal.enum";

const LazyBuilderContent = lazy(() => import("./BuilderContent"));

const defaultValue = (screen_id, component_type, location) => {
  return {
    screen_id: screen_id,
    component_name: "",
    component_display: "",
    component_type: component_type, //"table_3rd", "infor_3rd", "tab"
    location_x: location.x,
    location_y: location.y,
    width: location.w,
    height: location.h,
    table_column_list: [],
    api_url: "",
    api_method: "GET", //GET/POST
    api_authen_type: "bearer_token", //"bearer_token", "basic_auth", "no_auth"
    api_token: "",
    api_verify_key: "",
    api_username: "",
    api_password: "",
    api_body_request_type: "json", //"json", "xml"
    api_body: "",
    api_header: [
      { key: "content-type", value: "application/json", description: "" },
    ],
  };
};

const modelGrid = (item) => {
  return {
    x: item.location_x,
    y: item.location_y,
    w: item.width,
    h: item.height,
    i: item._id,
  };
};

const ConfigBuilder = () => {
  const { openModal } = useModal();
  const screen_id = uuidv4();

  // Data layout
  const [layouts, updateLayouts] = useState([]);
  const [screenData, updateScreenData] = useState({
    list: {},
    total: 0,
  });

  const handleOnDrop = (_, layoutInfo, component_type) => {
    const valueAddSection = defaultValue(screen_id, component_type, layoutInfo);
    callAddSection(valueAddSection);
  };

  // Call API add section
  // data -> body request send api
  const callAddSection = (data) => {
    const MOCK_RESPONSE_CREATE_SUCCESS = {
      _id: uuidv4(),
      ...data,
    };

    // update state
    handlingConvertData([MOCK_RESPONSE_CREATE_SUCCESS]);
  };

  const handlingConvertData = (data) => {
    let listObject = {};
    let layout = [];

    for (let i = 0; i < data.length; i++) {
      const component = data[i];

      layout.push(modelGrid(component));
      listObject[component._id] = component;
    }

    updateScreenData((state) => ({
      list: { ...state.list, ...listObject },
      total: data.length,
    }));

    // Update layout data react grid
    updateLayouts((state) => [...state, ...layout]);
  };

  /**
   * @param {*} sectionId id section component
   */
  const handleRemoveSection = (sectionId) => {
    // Show confirm
    const deleteConfirm = ConfigModal({
      title: "Xác nhận component",
      width: "500px",
      type: DIALOG_MODAL.MODAL_TYPE.CONFIRM,
      onHandleConfirm: () => {
        // Accept -> call api -> show message

        // update data state
        const stateLayouts = [...layouts];
        const indexRemove = stateLayouts.findIndex((e) => e.i === sectionId);
        if (indexRemove === -1) {
          console.error(`Can not find index remove section`);
          return;
        }

        stateLayouts.splice(indexRemove, 1);
        updateLayouts(stateLayouts);
      },
    });

    openModal(deleteConfirm);
  };

  return (
    <BuilderLayout>
      <Suspense fallback={<BuilderContentLoading />}>
        <LazyBuilderContent
          layouts={layouts}
          data={screenData.list}
          onHandleOnDrop={handleOnDrop}
          onRemoveSection={handleRemoveSection}
        />
      </Suspense>
    </BuilderLayout>
  );
};

export default ConfigBuilder;
