import React from "react";
import './index.css'; // Import your CSS file
import ComponentContainer from "./components/ComponentContainer";
import GlobalStyle from "./components/GlobalStyle";
import Map from "./components/Map";
import Navbar from "./components/navbar/Navbar";
import News from "./components/Page/News";
import Noti from "./components/Page/Notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="Notifications" element={<Noti />} />
        </Routes>
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
