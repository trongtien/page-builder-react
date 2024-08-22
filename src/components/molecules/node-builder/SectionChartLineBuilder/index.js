import React from "react";
import SectionBuilderViewLayout from "../../../atoms/SectionBuilderViewLayout";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS?.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
/**
 * title_x
 * field_title_y
 * chart_data_set [
 * {
 *  label,
 *  field_get_data
 *  borderColor,
 *  backgroundColor
 * }]
 */

const MOCK_DATA_CHART_LINE = [
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

const SectionChartLineBuilder = ({ component, isBuilder }) => {
  const dataChartFetch = MOCK_DATA_CHART_LINE;
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: component?.title_x,
          align: "end",
        },
      },
    },
  };

  const dataChartMapping = {
    labels: dataChartFetch?.map(
      (item) => item?.[component?.chart_line_config?.field_mapping_title_y]
    ),
    datasets: component?.chart_line_config?.chart_data_set?.map((e) => ({
      label: e?.label,
      data: dataChartFetch?.map((item) => item?.[e?.field_get_data]),
      borderColor: e?.borderColor,
      backgroundColor: e?.backgroundColor,
      yAxisID: "y",
    })),
  };

  return (
    <SectionBuilderViewLayout
      title={component?.component_display}
      className="relative overflow-hidden h-full"
    >
      <div className="h-full">
        <Line
          options={options}
          data={dataChartMapping}
          className="px-5 pb-10"
        />
      </div>
    </SectionBuilderViewLayout>
  );
};

export default SectionChartLineBuilder;
