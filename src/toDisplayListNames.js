import React from "react";
import { NavItem } from "react-bootstrap";

const ToDisplayListNames = ({
  nameList,
  handleListNamesClick,
  handleHeaderMouseEnter,
  handleHeaderMouseLeave,
}) => {
  return (
    <div>
      {nameList.map((listNames, index) => {
        return (
          <div
            class={
              listNames.headerMouseEnter
                ? "p-2 card text-white bg-dark border-light"
                : "p-2 card text-white bg-dark"
            }
            key={index}
            onClick={() => handleListNamesClick(index)}
            onMouseEnter={() => handleHeaderMouseEnter(index)}
            onMouseLeave={() => handleHeaderMouseLeave(index)}
          >
            {listNames.name}
          </div>
        );
      })}
    </div>
  );
};

export default ToDisplayListNames;
