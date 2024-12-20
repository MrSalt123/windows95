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
import bgImage from "./assets/images/windowsbackground_2.png";
import notepad from "./assets/images/notepad.png";
import globe from "./assets/images/globe.png";
import search from "./assets/images/search.png";
import console from "./assets/images/console_prompt-0.png";

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
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "20px",
            color: "white",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          {/* Terminal Icon */}
          <div
            style={{
              padding: "10px",
              cursor: "pointer",
              textAlign: "center",
              transition: "background-color 0.1 ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <img
              src={console}
              alt="Console Icon"
              style={{ width: "85px", height: "auto" }}
              onClick={() => alert("Console clicked")}
            />
            <span style={{ fontSize: "1.1rem" }}>Terminal</span>
          </div>

          {/* About Icon */}
          <div
            style={{
              padding: "10px",
              cursor: "pointer",
              textAlign: "center",
              transition: "background-color 0.1s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <img
              src={notepad}
              alt="Notepad Icon"
              style={{ width: "85px", height: "auto" }}
              onClick={() => alert("Notepad clicked")}
            />
            <span style={{ fontSize: "1.1rem" }}>About</span>
          </div>

          {/* Roadmap Icon */}
          <div
            style={{
              padding: "10px",
              cursor: "pointer",
              textAlign: "center",
              transition: "background-color 0.1s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <img
              src={globe}
              alt="Globe Icon"
              style={{ width: "85px", height: "auto" }}
              onClick={() => alert("Roadmap clicked")}
            />
            <span style={{ fontSize: "1.1rem" }}>Roadmap</span>
          </div>

          {/* Contact Icon */}
          <div
            style={{
              padding: "10px",
              cursor: "pointer",
              textAlign: "center",
              transition: "background-color 0.1s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <img
              src={search}
              alt="Search Icon"
              style={{ width: "85px", height: "auto" }}
              onClick={() => alert("Contact clicked")}
            />
            <span style={{ fontSize: "1.1rem" }}>Contact</span>
          </div>
        </div>

        {/* Taskbar */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100vw",
            height: "90px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#c0c0c0",
            borderTop: "2px solid #ffffff",
            borderBottom: "2px solid #808080",
            padding: "0 10px",
          }}
        >
          {/* Left side: Start Button and Search Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              onClick={() => setStartMenuOpen(!startMenuOpen)}
              active={startMenuOpen}
              style={{
                fontWeight: "bold",
                height: "70px",
                width: "150px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={win95Logo}
                alt="Start Icon"
                style={{
                  height: "60px",
                  marginRight: "10px",
                }}
              />
              <p style={{fontSize: "1.4rem"}}>Start</p>
            </Button>


            {startMenuOpen && (
              <MenuList
                style={{
                  position: "absolute",
                  width: "410px",
                  bottom: "90px",
                  left: "0",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "stretch",
                }}
              >
                {/* Rotated Windows 95 Banner */}
                <div
                  style={{
                    // add other font family
  
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "80px",
                    backgroundColor: "#008080",
                    color: "#c0c0c0",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    fontSize: "3rem", 
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  <p>Windows</p><p style={{color: "white"}}> 95</p>
                </div>

                {/* Menu Items */}
                <div
                  style={{
                    flex: "1",
                    backgroundColor: "#C1C1C1F",

                  }}
                >
                  <MenuListItem style={{height: "85px", fontSize: "1.4rem",}} onClick={() => alert("X clicked")}>
                  <p style={{transform: "translateX(20px)"}}>X</p>
                  </MenuListItem>

                  <MenuListItem style={{height: "85px", fontSize: "1.4rem",}} onClick={() => alert("Telegram clicked")}>
                    <p style={{transform: "translateX(20px)"}}>Telegram</p>
                  </MenuListItem>

                  <MenuListItem style={{height: "85px", fontSize: "1.4rem",}} onClick={() => alert("DexScreener clicked")}>
                    <p style={{transform: "translateX(20px)"}}>DexScreener</p>
                  </MenuListItem>

                  <MenuListItem style={{height: "85px", fontSize: "1.4rem",}} onClick={() => alert("Pumpfun clicked")}>
                    <p style={{transform: "translateX(20px)"}}>PumpFun</p>
                  </MenuListItem>
                </div>
              </MenuList>
            )}

            <TextInput
              variant="flat"
              placeholder="Search..."
              width={200}
              style={{
                height: "70px",
                width: "320px",
              }}
            />
          </div>

          {/* Right side: Clock */}
          <div style={{ 
            paddingRight: "4px",
             }}>
            <Button active style={{
              height: "70px",
              width: "100px",
              fontSize: "1.3rem"
          
            }}>{time}</Button>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default App;
