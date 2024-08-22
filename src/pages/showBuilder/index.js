import React, { useState, useEffect, useLayoutEffect } from "react";
import RGL from "react-grid-layout";
import lodash from "lodash";
import { fetchDetail } from "./serviceFakeData";
import { CONFIG_BUILDER } from "../../config/enum/configBuilder.enum";
import SectionChartDoughnut from "../../components/molecules/node-builder/SectionChartDoughnut";
import SectionChartLineBuilder from "../../components/molecules/node-builder/SectionChartLineBuilder";
import SectionTableBuilder from "../../components/molecules/node-builder/SectionTableBuilder";

const ShowBuilder = () => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [configView, setConfigView] = useState({
    object: {},
    listLayout: null,
  });

  useEffect(() => {
    const debouncedHandleResize = _.debounce(() => {
      const width = document.getElementById("show-builder")?.clientWidth;
      setContainerWidth(width);
    }, 300); // Adjust debounce time as needed

    window.addEventListener("resize", debouncedHandleResize);

    debouncedHandleResize(); // Initialize width on mount

    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  useLayoutEffect(() => {
    const data = fetchDetail();
    const { object, listLayout } = mappingConfigView(data);

    setConfigView({
      listLayout: listLayout,
      object: object,
    });
  }, []);

  const mappingConfigView = (componentList) => {
    let object = {};
    let listLayout = [];

    for (const component of componentList) {
      object[component._id] = component;
      // Xử lý call mapping service api

      listLayout.push({
        x: component.location_x,
        y: component.location_y,
        w: component.width,
        h: component.height,
        i: component._id,
        isResizable: false,
        isDraggable: false,
      });
    }

    return { object, listLayout };
  };

  return (
    <div id="show-builder" className="w-full h-full">
      <RGL
        className="layout"
        layout={configView.listLayout}
        isResizable={false}
        isDraggable={false}
        cols={12}
        rowHeight={50}
        width={containerWidth}
        measureBeforeMount={false}
        margin={[16, 16]}
        containerPadding={[0, 0]}
      >
        {lodash?.map(configView.listLayout, function (component, index) {
          return (
            <div
              key={component.i}
              data-grid={component}
              style={{ height: component.h * 50 }}
            >
              <div className="layout__item-wrapper">
                {
                  {
                    [CONFIG_BUILDER.COMPONENT_TYPE.TAB]: <div>tab build</div>,
                    [CONFIG_BUILDER.COMPONENT_TYPE.TABLE]: (
                      <SectionTableBuilder
                        isBuilder={false}
                        component={configView.object[component.i]}
                      />
                    ),
                    [CONFIG_BUILDER.COMPONENT_TYPE.DETAIL]: <div>detail</div>,
                    [CONFIG_BUILDER.COMPONENT_TYPE.DETAIL]: <div>detail</div>,
                    [CONFIG_BUILDER.COMPONENT_TYPE.DOUGHNUT_CHART]: (
                      <SectionChartDoughnut
                        isBuilder={false}
                        component={configView.object[component.i]}
                      />
                    ),
                    [CONFIG_BUILDER.COMPONENT_TYPE.CHART_LINE]: (
                      <SectionChartLineBuilder
                        isBuilder={false}
                        component={configView.object[component.i]}
                      />
                    ),
                  }[configView.object[component.i].component_type]
                }
              </div>
            </div>
          );
        })}
      </RGL>
    </div>
  );
};

export default ShowBuilder;
