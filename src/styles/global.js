import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,800&display=swap');
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    background: #fff no-repeat center top;
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
  }
  #root{
    max-width: 1020px;
    margin: 0 auto;
  }
  button {
    cursor: pointer;
  }

`;
