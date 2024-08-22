import React, { useEffect, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import SectionBuilderViewLayout from "../../../atoms/SectionBuilderViewLayout";
import { fakeDataChartDoughnut } from "../../../../pages/showBuilder/serviceFakeData";

ChartJS?.register(ArcElement, Tooltip, Legend);

const SectionChartDoughnut = ({ component, isBuilder }) => {
  const configChartComponent = component?.chart_doughnut_config;

  const [viewState, setViewState] = useState({
    isLoading: false,
    data: null,
  });

  useEffect(() => {
    fetchDataChart();
  }, [component]);

  const fetchDataChart = () => {
    if (isBuilder) return;

    setViewState((state) => ({ ...state, isLoading: true }));

    const dataResponse = fakeDataChartDoughnut();
    setViewState((state) => ({
      ...state,
      isLoading: false,
      data: dataResponse,
    }));
  };

  const config = useMemo(() => {
    return {
      labels: configChartComponent?.map((el) => el.label),
      datasets: [
        {
          data: configChartComponent?.map(
            (el) => viewState?.data?.[el.field_mapping]
          ),
          backgroundColor: configChartComponent?.map(
            (el) => el.backgroundColor
          ),
          borderColor: configChartComponent?.map((el) => el.borderColor),
          borderWidth: 1,
        },
      ],
      type: 3,
    };
  }, [component, viewState]);

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
              <span>
                {config.label}
                {"  "}
              </span>
              <span
                className="font-medium"
                style={{ color: config?.backgroundColor ?? "#333" }}
              >
                {viewState?.data?.[config?.field_mapping] ?? 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionBuilderViewLayout>
  );
};

export default SectionChartDoughnut;
