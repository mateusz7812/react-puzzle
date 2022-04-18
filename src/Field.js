import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';

const FieldComponent = ({puzzle_nr, xSize, ySize, setCords}) => {
  const startX = (puzzle_nr%4)*xSize/4;
  const startY = Math.floor(puzzle_nr/4)*ySize/4;
  const ref = useRef();
  useEffect(()=>{
    const rect = ReactDOM.findDOMNode(ref.current).getBoundingClientRect();
    setCords(rect.left, rect.top)
  }, [xSize, ySize])
  return (
    <div ref={ref} style={{
      position: "absolute",
      width: xSize/4 + "px",
      height: ySize/4 + "px",
      transform: 'translate(' + startX + 'px, ' + startY + 'px)',
      boxShadow: "0px 0px 0px 1px black inset",
    }}>
    </div>
  );
};

export default FieldComponent;