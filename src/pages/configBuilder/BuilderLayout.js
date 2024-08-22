import React, { useMemo, useState } from "react";
import { Layout, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  TableOutlined,
} from "@ant-design/icons";
import TabsIcon from '../../assets/images/icons/tabs-icon-sm.svg';
import { CONFIG_BUILDER } from "../../config/enum/configBuilder.enum";

const BuilderLayout = ({ children }) => {
  const [collapsed, updateState] = useState(false);

  const layoutInfo = useMemo(() => {
    return [
      {
        component_type: CONFIG_BUILDER.COMPONENT_TYPE.DOUGHNUT_CHART,
        label: "Chart Doughnut",
      },
      {
        component_type: CONFIG_BUILDER.COMPONENT_TYPE.CHART_LINE,
        label: "Chart line",
      },
      {
        component_type: CONFIG_BUILDER.COMPONENT_TYPE.TAB,
        label: "Multiple Tabs",
      },
      {
        component_type: CONFIG_BUILDER.COMPONENT_TYPE.TABLE,
        label: "Data Table",
      },
      {
        component_type: CONFIG_BUILDER.COMPONENT_TYPE.DETAIL,
        label: "Data Detail",
      },
    ];
  }, []);

  return (
    <Layout className="builder p-4">
      <Layout.Sider
        className="builder__sidebar"
        collapsedWidth={80}
        width={180}
        collapsed={collapsed}
      >
        <Layout.Header className="builder__sidebar-header builder-header">
          <div className="flex w-full h-full items-center justify-center">
            <Button
              onClick={(e) => updateState(!collapsed)}
              icon={!collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            ></Button>
          </div>
        </Layout.Header>
        <div className="builder__sidebar-content overflow-y-auto">
          {layoutInfo.map((layout) => {
            return (
              <div
                key={layout.component_type}
                className="builder__item-wrapper"
                draggable={true}
                unselectable="on"
                onDragStart={(e) => {
                  return e.dataTransfer.setData("text/plain", JSON.stringify(layout));
                }}
              >
                <div className="builder__item-wrapper-icon">
                  {
                    {
                      [CONFIG_BUILDER.COMPONENT_TYPE.TAB]: <TabsIcon />,
                      [CONFIG_BUILDER.COMPONENT_TYPE.TABLE]: (
                        <TableOutlined style={{ fontSize: "24px" }} />
                      ),
                      [CONFIG_BUILDER.COMPONENT_TYPE.DETAIL]: (
                        <ProfileOutlined style={{ fontSize: "24px" }} />
                      ),
                      [CONFIG_BUILDER.COMPONENT_TYPE.CHART_LINE]: <TabsIcon />,
                      [CONFIG_BUILDER.COMPONENT_TYPE.DOUGHNUT_CHART]: <TabsIcon />,
                    }[layout.component_type]
                  }
                </div>
                {!collapsed && (
                  <div className="builder__item-wrapper-label">
                    {layout.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Layout.Sider>

      <Layout className="builder__content">
        <Layout.Header className="builder__content-header builder-header">
        </Layout.Header>
        <Layout.Content>
          <div className="builder__content-body">{children}</div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default BuilderLayout;
