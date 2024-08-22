import { Table } from "antd";
import React from "react";

const SectionTableBuilder = ({component, isBuilder}) => {
  const columns = component?.table_column_list?.map((item) => {
    return {
      title: item?.column_label,
      dataIndex: item?.column_name,
      width: item?.width,
      ellipsis: true,
    };
  });

  const data = () => {
    const list = [];
    for (let i = 0; i < 10; i++) {
      const item = {};
      component?.table_3rd_column_list?.map((tb) => {
        item[tb?.column_name] = `-`;
      });
      item.key = i;
      list.push(item);
    }

    return list;
  };

  return (
    <div className="">
      <h3 className="pb-2 component__title">{component?.component_display}</h3>
      <Table
        columns={columns}
        dataSource={data()}
        pagination={false}
        stick={true}
        className="table__component"
      />
    </div>
  );
};

export default SectionTableBuilder;
