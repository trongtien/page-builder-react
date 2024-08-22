import React from "react";
import { Form } from "antd";

const ConfigHeader = () => {
  const form = Form.useFormInstance();
  return (
    <div>
      <table className="w-full bg-white">
        <thead className="border border-[#D9D9D9] bg-[#ECECEC]">
          <tr className="relative text-left font-medium text-base">
            <td style={{ width: "30%" }} className="">
              Tên field
              <span className="text-red-500">{" *"}</span>
            </td>
            <td style={{ width: "30%" }}>
              Giá trị
              <span className="text-red-500">{" *"}</span>
            </td>
            <td style={{ width: "25%" }}>Mô tả</td>
            <td style={{ width: "15%" }}>Hành động</td>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default ConfigHeader;
