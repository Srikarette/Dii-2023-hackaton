import React from "react";
import input from './input.css' //If not import can't use Taiwindcss
import ComponentContainer from "./components/ComponentContainer";
import GlobalStyle from "./components/GlobalStyle";
import Map from "./components/Map";
import  Navbar from "./components/navbar/Navbar";



function App() {
  return (
    <>
    <Navbar />
      <GlobalStyle />
        <Navbar />
        <Map />
    </>
  );
}

export default App;
