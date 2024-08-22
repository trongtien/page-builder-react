import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import React, { lazy, Suspense, useState } from "react";
import BuilderLayout from "./BuilderLayout";
import { v4 as uuidv4 } from "uuid";
import { ConfigModal } from "../../components/atoms/modals/ConfigModal";
import useModal from "../../hooks/useModal";
import { DIALOG_MODAL } from "../../config/enum/dialogModal.enum";
import BuilderContentLoading from "../../components/molecules/BuilderContentLoading";
import ModalConfigBuilder from "../../components/molecules/ModalConfigBuilder";

const LazyBuilderContent = lazy(() => import("./BuilderContent"));

// * title_x
// * field_title_y
// * chart_data_set {
// *  label,
// *  field_get_data
// *  borderColor,
// *  backgroundColor
// * }

const MOCK_CONFIG_DATA_CHART_LINE = {
  title_x: "Ngày",
  field_mapping_title_y: "hour",
  chart_data_set: [
    {
      label: "Chạy thành công",
      field_get_data: "countSuccess",
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      yAxisID: "y",
    },
    {
      label: "Chạy thất bại",
      field_get_data: "countFail",
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      yAxisID: "y",
    },
  ],
};

const MOCK_CONFIG_DATA_CHART_DOUGHNUT = [
  {
    label: "Thành công",
    field_mapping: "countSuccess",
    backgroundColor: "#98cff4",
    borderColor: "#98cff4",
  },
  {
    label: "Thất bại",
    field_mapping: "countFail",
    backgroundColor: "#ff7592",
    borderColor: "#ff7592",
  },
];

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
    chart_line_config: MOCK_CONFIG_DATA_CHART_LINE,
    chart_doughnut_config: MOCK_CONFIG_DATA_CHART_DOUGHNUT,
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

  const handleChangeLayout = (layouts) => {
    // Call Api update

    // update state
    let screenState = screenData;
    let layoutState = layouts;
    for (const layout of layouts) {
      const indexLayoutState = layoutState.findIndex((e) => e.i === layout.i);
      if (indexLayoutState !== -1) {
        layoutState[indexLayoutState] = {
          ...layoutState[indexLayoutState],
          h: layout.h,
          i: layout.i,
          x: layout.x,
          y: layout.y,
          w: layout.w,
        };
      }

      if (screenState.list?.[layout.i]) {
        screenState.list[layout.i] = {
          ...screenState.list[layout.i],
          location_x: layout.x,
          location_y: layout.y,
          height: layout.h,
          width: layout.w,
        };
      }
    }

    updateLayouts(layoutState);
    updateScreenData(screenState);
  };

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
      width: 1000,
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

  const handleConfigSection = (sectionId) => {
    const deleteConfirm = ConfigModal({
      title: "Cập nhật component",
      width: "1500px",
      type: DIALOG_MODAL.MODAL_TYPE.CUSTOM,
      dataPropsComponent: {
        sectionId: sectionId,
      },
      nodeComponentCustom: <ModalConfigBuilder />,
      onHandleConfirm: () => {},
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
          onHandleConfig={handleConfigSection}
          onRemoveSection={handleRemoveSection}
          onChangeLayout={handleChangeLayout}
        />
      </Suspense>
    </BuilderLayout>
  );
};

export default ConfigBuilder;
