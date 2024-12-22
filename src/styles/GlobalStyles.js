/***************************************************************************
 *                          GLOBAL STYLES
 * Applies the Windows 95 style reset and fonts, sets up the background and 
 * cursors, and ensures no scrollbars.
 ***************************************************************************/

import { createGlobalStyle } from "styled-components";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import cursor from "../assets/cursors/arrow0.png";
import hand from "../assets/cursors/hand0.png";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal;
  }

  body {
    margin: 0;
    font-family: 'ms_sans_serif';
    cursor: url(${cursor}), auto;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }


  img {
    user-drag: none;  
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  body {
    cursor: url('../assets/cursors/hand0.png'), auto;
}

  .pointer {
      cursor: url('../assets/cursors/hand0.png'), pointer;
  }

  img:hover, div:hover, button:hover, a:hover {
      cursor: url('../assets/cursors/hand0.pngg'), pointer;
  }

`;

export default GlobalStyles;