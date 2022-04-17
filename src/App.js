import './App.css';
import React, { useState, useEffect } from "react";
import PuzzleComponent from './Puzzle.js';
import FieldComponent from './Field';

function App() {
  const image_src = require("./images/image-3.jpg");
  const [xSize, setXSize] = useState(0);
  const [ySize, setYSize] = useState(0);
  const [fields, setFields] = useState([]);
  const [fieldsRefs, setFieldsRefs] = useState([]);
  useEffect(()=>{
    var img = new Image();
    img.onload = function() {
      setXSize(this.width/2);
      setYSize(this.height/2);
    };
    img.src = image_src;

    setFields(
      [...Array(16)].map((x, i) =>  
        <FieldComponent key={i} puzzle_nr={i} xSize={xSize} ySize={ySize} />
      )
    )
    //setFieldsRefs(fields.map(field => field.ref))
  }, [image_src])

  /*const refCallback = useCallback(
    () => {
      doSomething(a, b);
    },
    [a, b],
  );
  */
  return (
    <div className="App">
      <div style={{display: "flex", flexDirection: "row", height: "100vh", minHeight: ySize + "px", minWidth: 2*xSize + "px"}}>
        <div style={{width: "50%", zIndex: 200}}>
            {[...Array(16)].map((x, i) =>
              <PuzzleComponent puzzle_nr={i} key={i} image_src={image_src} xSize={xSize} ySize={ySize}/>
            )}
        </div>
        <div style={{position: "relative", width: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <div style={{position: "relative", width: xSize + "px", height: ySize + "px", boxShadow: "0 0 0 3px black"}}>
            {[...Array(16)].map((x, i) =>  
              <FieldComponent key={i} puzzle_nr={i} xSize={xSize} ySize={ySize} />
            )}
          </div>
        </div>
      </div>    
    </div>
  );
}

export default App;
