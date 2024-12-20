/***************************************************************************
 *                           IMPORTS & GLOBAL SETUP
 * This section imports all required dependencies, sets up fonts, and applies
 * global styling for our Windows 95 themed UI. It includes React, React95 
 * components, styled-components, images, cursors, and font definitions.
 ***************************************************************************/
import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  styleReset,
  MenuList,
  MenuListItem,
  TextInput,
} from "react95";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import win95Logo from "./assets/images/win95.png";
import bgImage from "./assets/images/windows95bglogo.png";
import notepad from "./assets/images/notepad.png";
import globe from "./assets/images/globe.png";
import search from "./assets/images/search.png";
import console from "./assets/images/console_prompt-0.png";
import cursor from "./assets/cursors/arrow0.png";
import hand from "./assets/cursors/hand0.png";
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import { shadow } from "react95/dist/common";

/***************************************************************************
 *                          GLOBAL STYLES
 * We reset default browser styles, define fonts, and set the application’s 
 * background, cursors, and general aesthetic. Also configures buttons, links, 
 * and other clickable elements to use a custom Windows 95 hand cursor.
 ***************************************************************************/
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

    cursor: url(${cursor}), auto;
    width: 100dvw;
    height: 100dvh;
  }

  button, [role='button'], a, .pointer {
    cursor: url(${hand}), pointer;
  }
`;

/***************************************************************************
 *                             MAIN APP COMPONENT
 * The App component sets up the Windows 95-style desktop environment,
 * including:
 *  - A dynamic clock in the taskbar
 *  - Icons on the desktop (Terminal, About, Roadmap, Contact)
 *  - A movable "About" modal window, triggered by the About icon
 *  - The start menu with links to various external resources
 *
 * State variables manage the open/close states of menus and modals, and 
 * useEffect hooks keep the clock updated and handle outside-click logic 
 * for closing the start menu.
 ***************************************************************************/
const App = () => {
  /*************************************************************************
   *                             STATE & REF HOOKS
   * time:          Stores the current time in "HH:MM" format.
   * startMenuOpen: Boolean flag to show/hide the Start Menu.
   * isModalOpen:   Boolean flag to show/hide the About Modal.
   * menuRef:       A reference to the menu element for outside-click detection.
   *
   * windowWidth:   Tracks the current window width to conditionally show/hide 
   *                the "Start" text in the start button.
   *************************************************************************/
  const [time, setTime] = useState("");
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const menuRef = useRef(null);

  /*************************************************************************
   *                           EVENT HANDLERS
   * handleAboutClick: Opens the About Modal when the "About" icon is clicked.
   * closeModal:       Closes the About Modal.
   *************************************************************************/
  const handleAboutClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  /*************************************************************************
   *                           EFFECT HOOKS
   * 1. Clock Update Effect:
   *    Sets an interval to update 'time' every second, formatting hours 
   *    and minutes as "HH:MM".
   *
   * 2. Outside Click Effect (for Start Menu):
   *    If the Start Menu is open, listens for clicks outside it to close it.
   *
   * 3. Window Resize Effect:
   *    Updates 'windowWidth' whenever the browser window is resized, allowing
   *    conditional rendering of the "Start" text based on screen size.
   *************************************************************************/
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setStartMenuOpen(false);
      }
    };
    if (startMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [startMenuOpen]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /*************************************************************************
   *                               RENDER
   * We structure the UI similar to a Windows 95 desktop:
   *  - Desktop icons at the top-left
   *  - A fixed taskbar at the bottom with a Start button, search input, and clock
   *  - Conditionals to display the About Modal and Start Menu
   *************************************************************************/
  return (
    <div>
      {/* Apply global styles and theme */}
      <GlobalStyles />
      <ThemeProvider theme={original}>

        <img src={bgImage}
             style={{
              width: "27%",
              minWidth: "300px",
              position: "absolute",
              top: "50%",
              left: "50%",

              transform: "translate(-50%, -50%)"
              
             }}>
        </img>

        {/********************************************************************
         *                         DESKTOP ICONS
         ********************************************************************/}
        <div
          style={{
            position: "absolute",
            top: "1vh",
            left: "1vw",
            color: "white",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* ---------------------- Terminal Icon ---------------------- */}
          <div
            style={{
              padding: "8px",
              textAlign: "center",
              transition: "background-color 0.1 ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
            className="pointer"
          >
            <img
              src={console}
              alt="Console Icon"
              style={{ 
                width: "4vw",
                minWidth: "60px", 
                height: "auto" }}
              onClick={() => alert("Console clicked")}
            />
            <span style={{ fontSize: "0.9rem" }}>Terminal</span>
          </div>

          {/* ---------------------- About Icon ---------------------- */}
          <div
            style={{
              padding: "8px",
              textAlign: "center",
              transition: "background-color 0.1s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
            className="pointer"
          >
            <img
              src={notepad}
              alt="Notepad Icon"
              style={{ 
                width: "4vw",
                minWidth: "60px", }}
              onClick={handleAboutClick}
            />
            <span style={{ fontSize: "0.9rem" }}>About</span>
          </div>

          {/* ---------------------- Roadmap Icon ---------------------- */}
          <div
            style={{
              padding: "8px",
              textAlign: "center",
              transition: "background-color 0.1s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
            className="pointer"
          >
            <img
              src={globe}
              alt="Globe Icon"
              style={{ 
                width: "4vw",
                minWidth: "60px", }}
              onClick={() => alert("Roadmap clicked")}
            />
            <span style={{ fontSize: "0.9rem" }}>Roadmap</span>
          </div>

          {/* ---------------------- Contact Icon ---------------------- */}
          <div
            style={{
              padding: "8px",
              textAlign: "center",
              transition: "background-color 0.1s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
            className="pointer"
          >
            <img
              src={search}
              alt="Search Icon"
              style={{ 
                width: "4vw",
                minWidth: "60px",  }}
              onClick={() => alert("Contact clicked")}
            />
            <span style={{ fontSize: "0.9rem" }}>Contact</span>
          </div>
        </div>

        {/********************************************************************
         *                             TASKBAR
         ********************************************************************/}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#c0c0c0",
            borderTop: "2px solid #ffffff",
            borderBottom: "2px solid #808080",
            padding: "0 10px",
          }}
        >
          {/* --- Left side: Start Button & Search Bar --- */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              onClick={() => setStartMenuOpen(!startMenuOpen)}
              active={false}
              style={{
                fontWeight: "bold",
                height: "50px",
                width: "30%",
                minWidth: "80px",
                display: "flex",
              }}
            >
              <img
                src={win95Logo}
                alt="Start Icon"
                style={{
                  height: "40px",
                  marginRight: "10px",
                }}
              />
              {/* Conditionally render the "Start" text only if windowWidth > 400 */}
              {windowWidth > 1200 && <p style={{ fontSize: "1.2rem" }}>Start</p>}
            </Button>

            {/* --- Start Menu (Conditional Rendering) --- */}
            {startMenuOpen && (
              <MenuList
                ref={menuRef}
                style={{
                  position: "absolute",
                  width: "20%",
                  height: "215px",
                  minWidth: "250px",
                  bottom: "60px",
                  left: "0",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "stretch",
                }}
              >
                {/* Vertical Windows 95 Banner */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "20%",
                    backgroundColor: "#008080",
                    color: "#c0c0c0",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    fontSize: "1.9rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    height: "200px",
                  }}
                >
                  <p>Windows</p>
                  <p style={{ color: "white" }}>95</p>
                </div>

                {/* Start Menu Items */}
                <div
                  style={{
                    flex: "1",
                    backgroundColor: "#C1C1C1",
                  }}
                >
                  <MenuListItem
                    style={{ height: "50px", fontSize: "1.4rem" }}
                    onClick={() =>
                      window.open("https://x.com/windows95cto", "_blank")
                    }
                  >
                    <p style={{ transform: "translateX(20px)" }}>X</p>
                  </MenuListItem>

                  <MenuListItem
                    style={{ height: "50px", fontSize: "1.4rem" }}
                    onClick={() =>
                      window.open("https://t.me/windows95ctosol", "_blank")
                    }
                  >
                    <p style={{ transform: "translateX(20px)" }}>Telegram</p>
                  </MenuListItem>

                  <MenuListItem
                    style={{ height: "50px", fontSize: "1.4rem" }}
                    onClick={() =>
                      window.open(
                        "https://dexscreener.com/solana/3gbbkbvn95e1uger8mynspjcldu59johk9rmcd24kdhz",
                        "_blank"
                      )
                    }
                  >
                    <p style={{ transform: "translateX(20px)" }}>DexScreener</p>
                  </MenuListItem>

                  <MenuListItem
                    style={{ height: "50px", fontSize: "1.4rem" }}
                    onClick={() =>
                      window.open(
                        "https://pump.fun/coin/G8GdCEU4C7QrZTXKtpikGxDjp9xAAmT6Dmp4BfRypump",
                        "_blank"
                      )
                    }
                  >
                    <p style={{ transform: "translateX(20px)" }}>PumpFun</p>
                  </MenuListItem>
                </div>
              </MenuList>
            )}

            {/* Search Input Field */}
            <TextInput
              variant="flat"
              placeholder="Search..."
              width={200}
              style={{
                height: "50px",
                width: "20dvw",
              }}
            />
          </div>

          {/* --- Right side: Clock Display --- */}
          <div style={{ paddingRight: "4px" }}>
            <div
              style={{
                height: "50px",
                width: "5vw",
                minWidth: "80px",
                fontSize: "1.1rem",
                backgroundColor: "#c0c0c0", // Button gray
                border: "3px inset  #e6e6e6",
                boxShadow: "inset 1px 1px 3px #000000", // White as secondary color
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000000", // Text color
                fontFamily: "ms_sans_serif", // Classic Windows 95 font
              }}
            >
              {time}
            </div>
          </div>
        
          {/****************************************************************
           *                            MODALS
           ****************************************************************/}
          {isModalOpen && (
            <div
              style={{
                position: "fixed",
                top: "calc(50vh - 200px)",
                left: "calc(50vw - 250px)",
                width: "500px",
                height: "400px",
                backgroundColor: "#fff",
                border: "2px solid black",
                zIndex: 1000,
                display: "flex",
                flexDirection: "column",
                cursor: "move",
              }}

              onMouseDown={(e) => {
                const modal = e.currentTarget;
                const offsetX = e.clientX - modal.getBoundingClientRect().left;
                const offsetY = e.clientY - modal.getBoundingClientRect().top;

                const handleMouseMove = (moveEvent) => {
                  modal.style.left = `${moveEvent.clientX - offsetX}px`;
                  modal.style.top = `${moveEvent.clientY - offsetY}px`;
                };

                const stopDragging = () => {
                  document.removeEventListener("mousemove", handleMouseMove);
                  document.removeEventListener("mouseup", stopDragging);
                };

                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", stopDragging);
              }}
            >
              {/* ---- About Modal Title Bar ---- */}
              <div
                style={{
                  backgroundColor: "#000080",
                  color: "white",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 10px",
                  fontSize: "14px",
                }}
              >
                <span>About - Notepad</span>
                <button
                  onClick={closeModal}
                  style={{
                    background: "none",
                    border: "none",
                    color: "white",
                    fontSize: "16px",
                    lineHeight: "14px",
                  }}
                  className="pointer"
                >
                  ✕
                </button>
              </div>

              {/* ---- About Modal Menu Bar (Non-functional) ---- */}
              <div
                style={{
                  backgroundColor: "#c0c0c0",
                  borderBottom: "1px solid #808080",
                  padding: "5px 10px",
                  fontSize: "12px",
                  display: "flex",
                }}
              >
                <span style={{ marginRight: "15px" }} className="pointer">
                  File
                </span>
                <span style={{ marginRight: "15px" }} className="pointer">
                  Edit
                </span>
                <span style={{ marginRight: "15px" }} className="pointer">
                  Search
                </span>
                <span style={{ marginRight: "15px" }} className="pointer">
                  Help
                </span>
              </div>

              {/* ---- About Modal Content Area ---- */}
              <div
                style={{
                  flex: 1,
                  padding: "20px",
                  overflow: "auto",
                  fontSize: "14px",
                  backgroundColor: "#fff",
                }}
              >
                <h1
                  style={{
                    fontSize: "18px",
                    marginBottom: "10px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  About This App
                </h1>
                <p style={{ lineHeight: "1.5", color: "black" }}>
                  This is a Windows 95-inspired UI built with React95. It mimics
                  the look and feel of classic Windows 95 applications, like
                  Notepad.
                </p>
              </div>

              {/* ---- About Modal Status Bar ---- */}
              <div
                style={{
                  backgroundColor: "#c0c0c0",
                  borderTop: "1px solid #808080",
                  height: "25px",
                  padding: "0 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "black",
                }}
              >
                <span>Ln 1, Col 1</span>
                <span>100%</span>
              </div>
            </div>
          )}

        </div>
      </ThemeProvider>
    </div>
  );
};

export default App;
