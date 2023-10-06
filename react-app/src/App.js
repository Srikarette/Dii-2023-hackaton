import React from "react";

import ComponentContainer from "./component/ComponentContainer";
import GlobalStyle from "./component/GlobalStyle";
import Map from "./component/Map";


function App() {
  return (
    <>
      <GlobalStyle />
        <ComponentContainer>
          <Map />
        </ComponentContainer>
    </>
  );
}

export default App;
