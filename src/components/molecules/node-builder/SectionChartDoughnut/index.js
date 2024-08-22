import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import SectionBuilderViewLayout from "../../../atoms/SectionBuilderViewLayout";

const MOCK_DATA_TEST_CHART_PIE = {
  countSuccess: 3296,
  countFail: 0,
};

ChartJS?.register(ArcElement, Tooltip, Legend);

const SectionChartDoughnut = ({ component, isBuilder }) => {
  const dataChartPie = MOCK_DATA_TEST_CHART_PIE;
  const configChartComponent = component?.chart_doughnut_config;

  const config = {
    labels: configChartComponent?.map((el) => el.label),
    datasets: [
      {
        data: configChartComponent?.map((el) => dataChartPie[el.field_mapping]),
        backgroundColor: configChartComponent?.map((el) => el.backgroundColor),
        borderColor: configChartComponent?.map((el) => el.borderColor),
        borderWidth: 1,
      },
    ],
    type: 3,
  };

  return (
    <SectionBuilderViewLayout
      title={component?.component_display}
      className="relative overflow-hidden h-full"
    >
      <div className="relative w-full h-full flex shadow-md items-center">
        <div className="h-[80%] w-[60%]">
          <Pie data={config} />
        </div>
        <div className="w-[40%] flex flex-col ">
          {configChartComponent?.map((config, index) => (
            <div className="flex gap-2 items-center font-medium" key={index}>
              <span>{config.label}{"  "}</span>
              <span className="font-medium" style={{color: config?.backgroundColor ?? '#333'}}>
                {dataChartPie?.[config?.field_mapping] ?? 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionBuilderViewLayout>
  );
};

export default SectionChartDoughnut;
