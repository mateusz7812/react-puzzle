import React, { useCallback, useEffect, useState } from "react";
import useDraggable from "./use-draggable";
  
  const PuzzleComponent = ({puzzle_nr, image_src, xSize, ySize}) => {
    const handleDrag = useCallback(
      ({ x, y }) => {
        /*fields.forEach(field => {
          const { offsetTop } = field.ref.current;
          console.log(offsetTop);
        });
        console.log("y");
        console.log(y);
*/

        return ({
          x: x,
          y: y
        })
      },
      []
    );

    const [initx, setInitX] = useState(0);
    const [inity, setInitY] = useState(0);

    const [ref, pressed, changePosition] = useDraggable({
      onDrag: handleDrag
    });

    useEffect(()=> {
      setInitX(Math.random() * (xSize*3/4));
      setInitY(Math.random() * ySize);
    }, [xSize, ySize])

    useEffect(() => {
      changePosition(initx, inity);
    }, [initx, inity])
  
    return (
      <div ref={ref} style={{
        position: "absolute",
        width: xSize/4 + "px",
        height: ySize/4 + "px",
        backgroundImage: "url(" + image_src + ")",
        backgroundSize: xSize + "px " + ySize + "px", 
        backgroundPosition: (puzzle_nr%4)*xSize/4 + "px " + Math.floor(puzzle_nr/4)*ySize/4 + "px",
      }}>
      </div>
    );
  };

  export default PuzzleComponent;