import React from "react";
import { getCircleStyle } from "./circlecomponent";

const Circle = ({ id,number, position, hidden, isRemove }) => {
  const circleSize = 50;
  const style = getCircleStyle(position, circleSize);

  return (
    <button
      className="circle"
      style={{ 
        ...style, 
        display: hidden ? 'none' : 'block',  
        zIndex: id 
      }}
      onClick={isRemove}
    >
      {number}
    </button>
  );
}

export default Circle;