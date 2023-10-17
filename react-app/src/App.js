import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ComponentContainer from "./components/ComponentContainer";
import GlobalStyle from "./components/GlobalStyle";
import Map from "./components/Map";
import Chatpage from "./pages/Chatpage";
import Erro404 from "./pages/Erro404";

function App() {
  return (
    <BrowserRouter>
      <>
        <div className="App">
          <Switch>
            <Route path="/" component={Map} exact />
            <Route path="/chats" component={Chatpage} />
            <Route component={Erro404} />{" "}
            {/* This route will handle 404 cases */}
          </Switch>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
