import React, { useState, useEffect } from "react";
import {
  Button,
  styleReset,
  MenuList,
  MenuListItem,
  TextInput,
} from "react95";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import win95Logo from "./assets/images/win95.png";
import bgImage from "./assets/images/windowsbackground.jpg";
import notepad from "./assets/images/notepad.png";
import globe from "./assets/images/globe.png";
import search from "./assets/images/search.png";

/* Pick a theme of your choice */
import original from "react95/dist/themes/original";

/* Original Windows95 font (optional) */
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

const GlobalStyles = createGlobalStyle`
  ${styleReset}
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
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
  body {
    margin: 0;
    background: url(${bgImage}) no-repeat center center fixed;
    background-size: cover;
  }
`;

const App = () => {
  const [time, setTime] = useState("");
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        {/* Desktop Icons */}
        <div className="ml-3 mt-3">
          <img
            src={notepad}
            alt="About Icon"
            className="h-10 mb-1"
            onClick={() => alert("Notepad clicked")}
          />
          <span style={{ fontSize: "0.8rem", textAlign: "center" }}>About</span>

          <img
            src={globe}
            alt="Globe Icon"
            className="h-10 mb-1"
          />
          <span style={{ fontSize: "0.8rem", textAlign: "center" }}>Roadmap</span>

          <img
            src={search}
            alt="Contact Icon"
            className="h-10 mb-1"
          />
          <span style={{ fontSize: "0.8rem", textAlign: "center" }}>Contact</span>
        </div>

        {/* Taskbar */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100vw",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#c0c0c0",
            borderTop: "2px solid #ffffff",
            borderBottom: "2px solid #808080",
          }}
        >
          {/* Left side: Start Button and Menu Items */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", paddingLeft: "5px" }}>
            <Button
              onClick={() => setStartMenuOpen(!startMenuOpen)}
              active={startMenuOpen}
              style={{ fontWeight: "bold", marginRight: "10px" }}
            >
              <img
                src={win95Logo}
                alt="Start Icon"
                style={{ height: "20px", marginRight: "5px" }}
              />
              Start
            </Button>
            <div style={{ display: "flex", gap: "15px" }}>
                            <TextInput
                                variant='flat'
                                placeholder='Search...'
                                width={150}
                                fullWidth
                            />
                        </div>
            {startMenuOpen && (
              <MenuList
                style={{
                  position: "absolute",
                  bottom: "40px",
                  left: "0",
                }}
                onClick={() => setStartMenuOpen(false)}
              >
                <MenuListItem onClick={() => alert("X clicked")}>X</MenuListItem>
                <MenuListItem onClick={() => alert("Telegram clicked")}>
                  Telegram
                </MenuListItem>
                <MenuListItem onClick={() => alert("DexScreener clicked")}>
                  DexScreener
                </MenuListItem>
              </MenuList>
            )}
          </div>

          {/* Right side: Clock */}
          <div style={{ paddingRight: "10px" }}>
            <Button active>{time}</Button>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default App;
