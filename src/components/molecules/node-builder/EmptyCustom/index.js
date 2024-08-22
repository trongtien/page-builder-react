import React from "react";
import { Empty } from "antd";

const EmptyCustom = () => {
  return (
    <div className="w-full h-full flex justify-center items-center align-middle">
      <Empty description={<span>Chưa tồn tại thành phần!</span>} />
    </div>
  );
};

export default EmptyCustom;
