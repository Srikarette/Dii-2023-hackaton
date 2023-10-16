import React from "react";

import ComponentContainer from "./components/ComponentContainer";
import GlobalStyle from "./components/GlobalStyle";
import Map from "./components/Map";
import Chatpage from "./pages/Chatpage";
import Erro404 from "./pages/Erro404";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <>
      <div className="App">
        <Route path="/" component={Map} exact />
        <Route path="/chat" component={Chatpage} />
      </div>
    </>
  );
}

export default App;
