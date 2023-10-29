import React from "react";
import styles from "./index.css"; //Must import for tailwindCss bug
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MapNew from "./components/MapNew";
import Erro404 from "./pages/Erro404";
import Navbar from "./components/Navbar";
import OfficialsLogin from "./pages/OfficialsLogin";
import Notification from "./pages/Notifcation";
import Mapcontent from "./components/Mapcontent";

function App() {
  return (
    <BrowserRouter>
      <>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" component={MapNew} exact />
            <Route path="/notifications" component={Notification} />
            <Route path="/officials" component={OfficialsLogin} />
            <Route path="/mapnode" component={Mapcontent} />
            <Route component={Erro404} />{" "}
            {/* This route will handle 404 cases */}
          </Switch>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
