import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Geologica:wght@100;200;300;400;500;600;700;800;900&display=swap');
  * {
    margin: 0;
    font-family: 'Anton','Geologica', sans-serif;
  }

`;

export default GlobalStyle;
