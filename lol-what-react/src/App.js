import React from "react";
import "./App.css";
import P5Wrapper from "react-p5-wrapper";
import { simpleFFT } from "./sketches/sketch";

function App() {
  return (
    <div className="App">
      <P5Wrapper sketch={simpleFFT}></P5Wrapper>
    </div>
  );
}

export default App;
