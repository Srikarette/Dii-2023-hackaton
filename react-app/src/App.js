import React from "react";

import ComponentContainer from "./components/ComponentContainer";
import GlobalStyle from "./components/GlobalStyle";
import Map from "./components/Map";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  Link,
  Outlet,
  RouterProvider,
  Switch,
} from "react-router-dom";
import Chatpage from "./pages/Chatpage";
import Erro404 from "./pages/Erro404";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Map />} />
        <Route path="/chat" element={<Chatpage />} />
        <Route path="/404" element={<Erro404 />} />
      </Route>
    )
  );

  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
        <GlobalStyle />
      </div>
    </>
  );
}
const Root = () => {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Map} />
        <Route path="/chat" component={Chatpage} />
        <Route component={Erro404} />
      </Switch>
    </>
  );
};

export default App;
