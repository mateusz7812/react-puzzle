import './App.css';
import React, { useState, useEffect, useRef } from "react";
import PuzzleComponent from './Puzzle.js';
import FieldComponent from './Field';

function App() {
  const image_src = require("./images/image-3.jpg");
  const gif_src = require("./images/fireworks.gif");
  const [xSize, setXSize] = useState(0);
  const [ySize, setYSize] = useState(0);
  const [fieldsCords, setFieldsCords] = useState([]);
  const [puzzlePlaced, setPuzzlePlaced] = useState(Array.from({length: 16}, (_, i) => false))
  const [end, setEnd] = useState(false);
  useEffect(()=>{
    var img = new Image();
    img.onload = function() {
      setXSize(this.width/2);
      setYSize(this.height/2);
    };
    img.src = image_src;
  }, [image_src])

  const updatePuzzlePlaced = (index, placed) => {
    let placeds = puzzlePlaced.slice();
    placeds[index] = placed;
    setPuzzlePlaced(placeds);
  }

  useEffect(()=>{
    if(puzzlePlaced.every(p => p == true)){
      setEnd(true);
    }
    console.log(puzzlePlaced);
  }, [puzzlePlaced])

  return (
    <div className="App">
      <div style={{display: "flex", flexDirection: "row", height: "100vh", minHeight: ySize + "px", minWidth: 2*xSize + "px"}}>
        <div style={{position: "relative", width: "50%", zIndex: 200}}>
            {[...Array(16)].map((x, i) =>
              <PuzzleComponent puzzle_nr={i} key={i} image_src={image_src} xSize={xSize} ySize={ySize}
                moveOnPutDown={
                  (position,  changePosition) => {
                    updatePuzzlePlaced(i, false);
                    for (let j = 0; j < fieldsCords.length; j++) {
                      const fieldCords = fieldsCords[j];
                      if(Math.abs(fieldCords.x - position.current.x) < 50 && Math.abs(fieldCords.y - position.current.y) < 50){
                        changePosition(fieldCords.x, fieldCords.y)
                        if(i == j){
                          updatePuzzlePlaced(i, true);
                          break;
                        }
                      }
                    }
                  }
                }
              />
            )}
            {
              end &&
                <div style={{position: "absolute", top: "0", left: "0", height: "100%", width: "100vw", zIndex: 400}}>
                  <div style={{position: "absolute", left: "25%", top: "50%", transform: "translate(-50%, -50%)"}}>
                    <h1>Congratulations</h1>
                  </div>
                  <div style={{position: "absolute", left: "25%", top: "50%", transform: "translate(-75%, -50%)"}}>
                    <img src={gif_src} style={{width: "150%"}}/>
                  </div>
                </div>
            }
        </div>
        <div style={{position: "relative", width: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <div style={{position: "relative", width: xSize + "px", height: ySize + "px", boxShadow: "0 0 0 3px black"}}>
            {[...Array(16)].map((x, i) =>  
              <FieldComponent key={i} puzzle_nr={i} xSize={xSize} ySize={ySize} 
                setCords={(x, y) => {
                  fieldsCords[i] = {"x": x, "y": y};
                  setFieldsCords(fieldsCords)
                }
              }/>
            )}
          </div>
        </div>
      </div>    
    </div>
  );
}

export default App;
