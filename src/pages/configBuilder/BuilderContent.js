import React, { Fragment } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { CONFIG_BUILDER } from "../../config/enum/configBuilder.enum";
import SectionTableBuilder from "../../components/molecules/node-builder/SectionTableBuilder";
import SectionChartLineBuilder from "../../components/molecules/node-builder/SectionChartLineBuilder";
import SectionChartDoughnut from "../../components/molecules/node-builder/SectionChartDoughnut";

const ResponsiveReactGridLayout = WidthProvider(RGL);

const BuilderContent = ({
  layouts,
  data,
  onHandleConfig,
  onHandleOnDrop,
  onChangeLayout,
  onRemoveSection,
}) => {
  const onDrop = (layout, layoutItem, _event) => {
    const componentInfo = JSON.parse(_event.dataTransfer.getData("text/plain"));
    onHandleOnDrop(layout, layoutItem, componentInfo.component_type);
  };

  const handleDragStop = (layout, oldItem, newItem) => {
    if (oldItem.w !== newItem.w || oldItem.h !== newItem.h) {
      onChangeLayout(layout);
    }
  };

  const handleResizeStop = (layout, oldItem, newItem) => {
    if (oldItem.w !== newItem.w || oldItem.h !== newItem.h) {
      onChangeLayout(layout);
    }
  };

  return (
    <Fragment>
      <div id="content">
        <ResponsiveReactGridLayout
          className="layout"
          layout={layouts}
          cols={12}
          rowHeight={50}
          isDroppable={true}
          margin={[16, 16]}
          onDrop={onDrop}
          onDragStop={handleDragStop}
          onResizeStop={handleResizeStop}
        >
          {_?.map(layouts, function (component, index) {
            return (
              <div key={component.i} data-grid={component}>
                <div className="layout__item-wrapper">
                  {
                    {
                      [CONFIG_BUILDER.COMPONENT_TYPE.TAB]: <div>tab build</div>,
                      [CONFIG_BUILDER.COMPONENT_TYPE.TABLE]: (
                        <SectionTableBuilder
                          isBuilder={true}
                          component={data[component.i]}
                        />
                      ),
                      [CONFIG_BUILDER.COMPONENT_TYPE.DETAIL]: <div>detail</div>,
                      [CONFIG_BUILDER.COMPONENT_TYPE.DETAIL]: <div>detail</div>,
                      [CONFIG_BUILDER.COMPONENT_TYPE.DOUGHNUT_CHART]: (
                        <SectionChartDoughnut
                          isBuilder={true}
                          component={data[component.i]}
                        />
                      ),
                      [CONFIG_BUILDER.COMPONENT_TYPE.CHART_LINE]: (
                        <SectionChartLineBuilder
                          isBuilder={true}
                          component={data[component.i]}
                        />
                      ),
                    }[data[component.i].component_type]
                  }
                </div>
                <Dropdown
                  placement="bottomLeft"
                  menu={{
                    items: [
                      {
                        label: (
                          <Button
                            className="btn__dropdown"
                            onMouseDown={(e) => {
                              e.stopPropagation();
                            }}
                            onTouchStart={(e) => e.stopPropagation()}
                          >
                            <DeleteOutlined />
                            Xóa thành phần
                          </Button>
                        ),
                        key: "0",
                      },
                      data[component.i]?.component_type !==
                        CONFIG_BUILDER.COMPONENT_TYPE.TAB && {
                        label: (
                          <Button
                            className="btn__dropdown"
                            onMouseDown={(e) => {
                              e.stopPropagation();
                            }}
                            onTouchStart={(e) => e.stopPropagation()}
                          >
                            <EditOutlined />
                            Sửa thông tin
                          </Button>
                        ),
                        key: "1",
                      },
                    ],
                    onClick: (e) => {
                      switch (e?.key) {
                        case "0":
                          onRemoveSection(component.i);
                          break;
                        case "1":
                          onHandleConfig(component.i);
                        default:
                          break;
                      }
                    },
                  }}
                  trigger={["click"]}
                >
                  <Button
                    size="small"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                    }}
                    onTouchStart={(e) => e.stopPropagation()}
                    className="hide-button"
                  >
                    <EllipsisOutlined />
                  </Button>
                </Dropdown>
              </div>
            );
          })}
        </ResponsiveReactGridLayout>
      </div>
    </Fragment>
  );
};

export default BuilderContent;
