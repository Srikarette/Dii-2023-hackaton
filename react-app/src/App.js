import React from "react";
import styles from "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ComponentContainer from "./components/ComponentContainer";
import GlobalStyle from "./components/GlobalStyle";
import Map from "./components/Map";
import Chatpage from "./pages/Chatpage";
import MapNew from "./components/MapNew";
import Erro404 from "./pages/Erro404";
import Navbar from "./components/Navbar";
import OfficialsLogin from "./pages/OfficialsLogin";
import Notification from "./pages/Notifcation";

function App() {
  return (
    <BrowserRouter>
      <>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" component={MapNew} exact />
            <Route path="/map" component={Map} />
            <Route path="/notifications" component={Notification} />
            <Route path="/officials" component={OfficialsLogin} />
            <Route component={Erro404} />{" "}
            {/* This route will handle 404 cases */}
          </Switch>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
