import { v4 as uuidv4 } from "uuid";

const screen_id = uuidv4();
export const fetchDetail = () => {
  return [
    {
      _id: uuidv4(),
      screen_id: screen_id,
      component_name: "",
      component_display: "",
      component_type: "chart_line", //"table_3rd", "infor_3rd", "tab"
      location_x: 0,
      location_y: 0,
      width: 12,
      height: 7,
      table_column_list: [],
      chart_line_config: {
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
      },
      chart_doughnut_config: null,
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
    },
    {
      _id: uuidv4(),
      screen_id: screen_id,
      component_name: "",
      component_display: "",
      component_type: "chart_doughnut", //"table_3rd", "infor_3rd", "tab"
      location_x: 0,
      location_y: 7,
      width: 12,
      height: 7,
      table_column_list: [],
      chart_line_config: null,
      chart_doughnut_config: [
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
      ],
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
    },
  ];
};

export const fakeDataChartLine = () => {
  return [
    {
      hour: 0,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 1,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 2,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 3,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 4,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 5,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 6,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 7,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 8,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 9,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 10,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 11,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 12,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 13,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 14,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 15,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 16,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 17,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 18,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 19,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 20,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 21,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 22,
      countSuccess: 0,
      countFail: 0,
    },
    {
      hour: 23,
      countSuccess: 0,
      countFail: 0,
    },
  ];
};

export const fakeDataChartDoughnut = () => {
  return {
    countSuccess: 3296,
    countFail: 0,
  };
};
