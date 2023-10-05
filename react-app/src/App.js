import React from "react";

import ComponentContainer from "./component/ComponentContainer";
import GlobalStyle from "./component/GlobalStyle";


function App() {
  return (
    <>
      <GlobalStyle>
        <ComponentContainer />
      </GlobalStyle>
      
    </>
  );
}

export default App;
