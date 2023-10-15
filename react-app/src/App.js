import React from "react";
import './index.css'; // Import your CSS file
import ComponentContainer from "./components/ComponentContainer";
import Navbar from "./components/navbar/Navbar";
// page
import GlobalStyle from "./components/GlobalStyle";
import Map from "./components/Map";
import News from "./components/Page/News";
import Notifications from "./components/Page/Notifications";
import Support from "./components/Page/Support";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="News" element={<News />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="support" element={<Support />} />
        </Routes>
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
}

root.render(<App />); // Render the App component within the root
