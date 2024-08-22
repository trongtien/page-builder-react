import classNames from "classnames";
import React from "react";

const SectionBuilderViewLayout = ({ children, title, className }) => {
  return (
    <div className={classNames({ [className]: className })}>
      <h3 className="pb-2 component__title">{title || ""}</h3>
      {children}
    </div>
  );
};

export default SectionBuilderViewLayout;
