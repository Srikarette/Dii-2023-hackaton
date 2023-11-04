import React from "react";
import styles from "./index.css"; //Must import for tailwindCss bug
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MapNew from "./components/MapNew";
import Erro404 from "./pages/Erro404";
import Navbar from "./components/Navbar";
import AdminLoginForm from "./components/Form/AdminLoginForm";
import Mapcontent from "./components/Mapcontent";
import Mapuser from "./components/Mapuser";
import GlobalStyle from "./components/GlobalStyle";
import Admin from "./pages/ManageAdmin";

function App() {
  return (
    <BrowserRouter>
      <>
        <div className="App">
          <GlobalStyle />
          <Navbar />
          <Switch>
            <Route path="/" component={Mapuser} exact />
            <Route path="/notifications" component={Notification} />
            <Route path="/officials" component={AdminLoginForm} />
            <Route path="/Mapadmin" component={MapNew} />
            <Route path="/mapuser" component={Mapcontent} />
            <Route path="/Admin" component={Admin} />
            <Route component={Erro404} />{" "}
            {/* This route will handle 404 cases */}
          </Switch>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
