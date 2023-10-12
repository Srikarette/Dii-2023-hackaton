import React from "react";

import ComponentContainer from "./components/ComponentContainer";
import GlobalStyle from "./components/GlobalStyle";
import Map from "./components/Map";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
    <Navbar />
      <GlobalStyle />
        <Map />
    </>
  );
}

export default App;
