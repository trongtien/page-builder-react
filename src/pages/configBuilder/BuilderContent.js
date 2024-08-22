import React from "react";
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

const ResponsiveReactGridLayout = WidthProvider(RGL);

const BuilderContent = ({
  layouts,
  data,
  handleConfig,
  onHandleOnDrop,
  handleLayoutChange,
  onRemoveSection
}) => {
  const onDrop = (layout, layoutItem, _event) => {
    const componentInfo = JSON.parse(_event.dataTransfer.getData("text/plain"));
    onHandleOnDrop(layout, layoutItem, componentInfo.component_type);
  };

  const handleDragStop = (layout, oldItem, newItem) => {
    
  };

  const handleResizeStop = (layout, oldItem, newItem) => {
    if (oldItem.w !== newItem.w || oldItem.h !== newItem.h) {
      handleLayoutChange(layout);
    }
  };

  return (
    <div id="content" className="h-full">
      <ResponsiveReactGridLayout
        className="builder-layout-grid"
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
                        handleConfig(component.i);
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
  );
};

export default BuilderContent;
