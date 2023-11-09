import React from "react";
import styles from "./index.css"; //Must import for tailwindCss bug
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Mapadmin from "./components/Mapadmin";
import Erro404 from "./pages/Erro404";
import Navbar from "./components/Navbar";
import AdminLoginForm from "./components/Form/AdminLoginForm";
import Mapuser from "./components/Mapuser";
import Admin from "./pages/ManageAdmin";
import Home from "./components/Home";
import Hometest from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/map" component={Mapuser} exact />
            <Route path="/notifications" component={Notification} />
            <Route path="/officials" component={AdminLoginForm} />
            <Route path="/Mapadmin" component={Mapadmin} />
            <Route path="/Admin" component={Admin} />
            <Route path="/hometest" component={Hometest} />
            <Route component={Erro404} />{" "}
            {/* This route will handle 404 cases */}
          </Switch>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
