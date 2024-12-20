/***************************************************************************
 *                           IMPORTS & GLOBAL SETUP
 * This section imports all dependencies, themes, fonts, images, and sets 
 * up the global styling. It also imports components from React95.
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

/* Images & Icons */
import win95Logo from "./assets/images/win95.png";
import bgImage from "./assets/images/windows95bglogo.png";
import notepad from "./assets/images/notepad.png";
import globe from "./assets/images/globe.png";
import search from "./assets/images/search.png";
import consoleIcon from "./assets/images/console_prompt-0.png";
import pumpIco from "./assets/images/pump-ico.png";
import xIco from "./assets/images/x-ico.png";
import teleIco from "./assets/images/tele-ico.png";
import cursor from "./assets/cursors/arrow0.png";
import hand from "./assets/cursors/hand0.png";

/* Theme & Fonts */
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

/***************************************************************************
 *                          GLOBAL STYLES
 * Applies the Windows 95 style reset and fonts, sets up the background and 
 * cursors, and ensures no scrollbars.
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
    overflow: hidden;
  }

  button, [role='button'], a, .pointer {
    cursor: url(${hand}), pointer;
  }

  img {
    user-drag: none;  
    user-select: none;
   -moz-user-select: none;
   -webkit-user-drag: none;
   -webkit-user-select: none;
   -ms-user-select: none;
  }
`;

/***************************************************************************
 *                           MODAL COMPONENT
 * Reusable modal window that can show different content, menu bars, and 
 * status bars. Supports dragging, resizing, and custom styling.
 ***************************************************************************/
const ModalWindow = ({
  title,
  content,
  isOpen,
  isVisible,
  onClose,
  modalWidth,
  modalHeight,
  setModalWidth,
  setModalHeight,
  customStyles = {},
  showMenuBar = true,
  showStatusBar = true,
  customMenuBar,
  customStatusBar,
  customTitleBar,
}) => {
  const modalRef = useRef(null);
  if (!isOpen) return null;

  // Handle resizing
  const startResizing = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = modalWidth;
    const startH = modalHeight;

    const doDrag = (moveEvent) => {
      const newWidth = startW + (moveEvent.clientX - startX);
      const newHeight = startH + (moveEvent.clientY - startY);
      setModalWidth(Math.max(newWidth, 200));
      setModalHeight(Math.max(newHeight, 200));
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);
    };
    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  // Handle dragging by title bar
  const handleMouseDown = (e) => {
    const modal = modalRef.current;
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

    if (e.target.closest(".modal-titlebar")) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", stopDragging);
    }
  };

  const mainAreaStyles = {
    flex: 1,
    overflow: "auto",
    fontSize: "14px",
    backgroundColor: "#fff",
    color: "#000",
    display: "flex",
    flexDirection: "column",
    ...customStyles.main,
  };

  return (
    <div
      ref={modalRef}
      style={{
        position: "fixed",
        top: "calc(50vh - 200px)",
        left: "calc(50vw - 200px)",
        width: `${modalWidth}px`,
        height: `${modalHeight}px`,
        backgroundColor: "#fff",
        border: "2px solid black",
        zIndex: 1000,
        display: isVisible ? "flex" : "none",
        flexDirection: "column",
        ...customStyles.container,
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="modal-titlebar"
        style={{
          backgroundColor: "#000080",
          color: "white",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 10px",
          fontSize: "14px",
          userSelect: "none",
          cursor: "move",
          ...customStyles.titleBar,
        }}
      >
        {customTitleBar ? customTitleBar : <span>{title}</span>}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
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

      {showMenuBar && (
        <div
          style={{
            backgroundColor: "#c0c0c0",
            borderBottom: "1px solid #808080",
            padding: "5px 10px",
            fontSize: "12px",
            display: "flex",
            userSelect: "none",
            ...customStyles.menuBar,
          }}
        >
          {customMenuBar ? customMenuBar : (
            <>
              <span style={{ marginRight: "15px" }} className="pointer">File</span>
              <span style={{ marginRight: "15px" }} className="pointer">Edit</span>
              <span style={{ marginRight: "15px" }} className="pointer">Search</span>
              <span style={{ marginRight: "15px" }} className="pointer">Help</span>
            </>
          )}
        </div>
      )}

      <div style={mainAreaStyles}>{content}</div>

      {showStatusBar && (
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
            userSelect: "none",
            ...customStyles.statusBar,
          }}
        >
          {customStatusBar ? customStatusBar : (
            <>
              <span>Ln 1, Col 1</span>
              <span>100%</span>
            </>
          )}
        </div>
      )}

      <div
        onMouseDown={startResizing}
        style={{
          width: "15px",
          height: "15px",
          backgroundColor: "#c0c0c0",
          borderTop: "1px solid #808080",
          borderLeft: "1px solid #808080",
          cursor: "nwse-resize",
          alignSelf: "flex-end",
          userSelect: "none",
          ...customStyles.resizer,
        }}
      ></div>
    </div>
  );
};

/***************************************************************************
 * TOP INDICATORS (DEXSCREENER VERSION)
 * This component fetches the token's price and 24-hour performance from a 
 * DexScreener pair endpoint. It displays price & 24h change top-left, and 
 * a contract address with a copy button top-right.
 ***************************************************************************/


/*
  Replace '3gbbkbvn95e1uger8mynspjcldu59johk9rmcd24kdhz' with your actual pair address 
  from DexScreener. The one below is from your snippet.
*/
const DEXSCREENER_PAIR_ADDRESS = "3gbbkbvn95e1uger8mynspjcldu59johk9rmcd24kdhz"; 
const CONTRACT_ADDRESS = "G8GdCEU4C7QrZTXKtpikGxDjp9xAAmT6Dmp4BfRypump";

const TopIndicators = () => {
  const [price, setPrice] = useState("Loading...");
  const [priceChange, setPriceChange] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDexScreenerData = async () => {
      try {
        const url = `https://api.dexscreener.com/latest/dex/pairs/solana/${DEXSCREENER_PAIR_ADDRESS}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }
        const data = await res.json();
        
        // Check if the data has 'pair' info
        if (!data || !data.pair) {
          throw new Error("No pair data found");
        }

        const currentPrice = parseFloat(data.pair.priceUsd);
        const change24h = data.pair.priceChange ? data.pair.priceChange.h24 : 0;
        
        setPrice(currentPrice.toFixed(6)); // 6 decimals or adjust as needed
        setPriceChange(change24h);
        setError(null);
      } catch (err) {
        console.error("Error fetching from DexScreener:", err);
        setPrice("Error");
        setPriceChange(0);
        setError(err.message);
      }
    };

    fetchDexScreenerData();
    const interval = setInterval(fetchDexScreenerData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  let changeColor = 'white';
  if (priceChange > 0) changeColor = 'green';
  else if (priceChange < 0) changeColor = 'red';

  const formattedChange = `${priceChange > 0 ? '+' : ''}${priceChange.toFixed(2)}%`;

  const shortAddress = `${CONTRACT_ADDRESS.slice(0,6)}...${CONTRACT_ADDRESS.slice(-4)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS)
      .then(() => alert('Address copied!'))
      .catch((err) => console.error('Could not copy address:', err));
  };

  return (
    <>
      {/* Top-left Price & 24h Performance */}
      <div
        style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          color: 'white',
          display: 'flex',
          alignItems: 'baseline',
          fontWeight: "lighter",
          gap: '10px',
          zIndex: 9999,
        }}
      >
        <span style={{ fontSize: '1.1rem', color: 'white' }}>
          {price}
        </span>
        {!error && (
          <span style={{transform:"translateY(-10px)", fontSize: '0.8rem', color: changeColor }}>
            {formattedChange}
          </span>
        )}
      </div>

      {/* Top-right Contract Address + Copy Button */}
      <div
        style={{
          position: 'absolute',
          top: '30px',
          right: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          fontFamily: 'ms_sans_serif',
          zIndex: 9999,
        }}
      >

        <Button
          style={{ 
            color: "white",
            fontWeight: "bold",
            fontSize: '1.0rem', 
            height: '30px', 
            width: "70px",
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' }}
          onClick={copyToClipboard}
        >
          Copy
        </Button>

        <span 
          style={{
            color: "white",
            width: "100px",
            padding: '2px 4px', 
            fontSize: '1rem' 
          }}
        >
          {shortAddress}
        </span>
      </div>
    </>
  );
};




/***************************************************************************
 * DESKTOP ITEMS CONFIG
 ***************************************************************************/
const msPaintMenuBar = (
  <>
    <span style={{ marginRight: "15px" }} className="pointer">File</span>
    <span style={{ marginRight: "15px" }} className="pointer">Edit</span>
    <span style={{ marginRight: "15px" }} className="pointer">View</span>
    <span style={{ marginRight: "15px" }} className="pointer">Image</span>
    <span style={{ marginRight: "15px" }} className="pointer">Colors</span>
    <span style={{ marginRight: "15px" }} className="pointer">Help</span>
  </>
);

const msPaintStatusBar = (
  <>
    <span>X:0 Y:0</span>
    <span>100%</span>
  </>
);

const desktopItems = [
  {
    id: "terminal",
    name: "Terminal",
    icon: consoleIcon,
    content: (
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <p>Type commands here...</p>
        <p>dir</p>
        <p>... results ...</p>
      </div>
    ),
    title: "Terminal",
    customStyles: {
      main: {
        backgroundColor: "black",
        color: "green",
        fontFamily: "monospace",
        padding: "10px",
      },
    },
    showMenuBar: false,
    showStatusBar: false,
  },
  {
    id: "about",
    name: "About",
    icon: notepad,
    content: (
      <>
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
          This is a Windows 95-inspired UI built with React95.
        </p>
      </>
    ),
    title: "About - Notepad",
    showMenuBar: true,
    showStatusBar: true,
  },
  {
    id: "roadmap",
    name: "Roadmap",
    icon: globe,
    content: (
      <div
        style={{
          flex: 1,
          backgroundColor: "#c0c0c0",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          gap: "10px",
        }}
      >
        <div
          style={{
            height: "30px",
            backgroundColor: "#ffffff",
            border: "2px solid #000",
            padding: "2px",
            display: "inline-block",
          }}
        >
          <span>Tools</span>
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            border: "2px inset #808080",
          }}
        >
          <p style={{ margin: "10px", color: "black" }}>Draw something here...</p>
        </div>
        <div
          style={{
            height: "30px",
            backgroundColor: "#ffffff",
            border: "2px outset #808080",
            display: "flex",
            gap: "5px",
            alignItems: "center",
            padding: "5px",
          }}
        >
          <div style={{ width: "20px", height: "20px", backgroundColor: "red" }}></div>
          <div style={{ width: "20px", height: "20px", backgroundColor: "blue" }}></div>
          <div style={{ width: "20px", height: "20px", backgroundColor: "green" }}></div>
          <div style={{ width: "20px", height: "20px", backgroundColor: "yellow" }}></div>
        </div>
      </div>
    ),
    title: "Untitled - Paint",
    showMenuBar: true,
    showStatusBar: true,
    customMenuBar: msPaintMenuBar,
    customStatusBar: msPaintStatusBar,
    customStyles: {
      main: {
        backgroundColor: "#c0c0c0",
        color: "black",
      },
    },
  },
  {
    id: "contact",
    name: "Contact",
    icon: search,
    content: (
      <div>
        <h2>Contact Information</h2>
        <p>Email: contact@example.com</p>
        <p>Phone: +1-555-1234</p>
      </div>
    ),
    title: "Contact - Search",
    showMenuBar: true,
    showStatusBar: true,
    customMenuBar: (
      <>
        <span style={{ marginRight: "15px" }} className="pointer">Contact</span>
        <span style={{ marginRight: "15px" }} className="pointer">Help</span>
      </>
    ),
    customStyles: {
      main: {
        backgroundColor: "#fff8e1",
      },
    },
  },
];

/***************************************************************************
 * MAIN APP COMPONENT
 * Integrates global styles, top indicators, wallpaper, desktop icons, 
 * taskbar, modals, etc.
 ***************************************************************************/
const App = () => {
  const [time, setTime] = useState("");
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const menuRef = useRef(null);

  // Initialize modal states
  const initialState = {};
  desktopItems.forEach((item) => {
    initialState[item.id] = {
      isOpen: false,
      isVisible: false,
      width: 400,
      height: 400,
    };
  });
  const [openModals, setOpenModals] = useState(initialState);

  const handleIconClick = (id) => {
    setOpenModals((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isVisible: true },
    }));
  };

  const closeModal = (id) => {
    setOpenModals((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false, isVisible: false },
    }));
  };

  const setModalSize = (id, w, h) => {
    setOpenModals((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        width: w !== undefined ? w : prev[id].width,
        height: h !== undefined ? h : prev[id].height,
      },
    }));
  };

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close start menu when clicking outside
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

  // Track window width changes
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <GlobalStyles />
      <ThemeProvider theme={original}>

        {/* TOP INDICATORS: Mint Price & Contract */}
        <TopIndicators />

        {/* Wallpaper */}
        <img
          src={bgImage}
          style={{
            width: "27%",
            minWidth: "300px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          alt="background"
        />

        {/* Desktop Icons */}
        <div
          style={{
            position: "absolute",
            top: "40%",
            transform: "translateY(-50%)",
            left: "1vw",
            color: "white",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {desktopItems.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "8px",
                textAlign: "center",
                transition: "background-color 0.1s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              className="pointer"
            >
              <img
                src={item.icon}
                alt={`${item.name} Icon`}
                style={{
                  width: "4vw",
                  minWidth: "60px",
                  height: "auto",
                }}
                onClick={() => handleIconClick(item.id)}
              />
              <span style={{ fontSize: "0.9rem" }}>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Taskbar */}
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
          {/* Start Button & Search */}
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
              {windowWidth > 1200 && (
                <p style={{ fontSize: "1.2rem" }}>Start</p>
              )}
            </Button>

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

                <div
                  style={{
                    flex: "1",
                    backgroundColor: "#C1C1C1",
                  }}
                >
                  <MenuListItem
                    style={{ height: "50px", fontSize: "1.4rem" }}
                    onClick={() => window.open("https://x.com/windows95cto", "_blank")}
                  >
                    <img
                      src={xIco}
                      style={{
                        position: "absolute",
                        width: "20px",
                        left: "15px",
                      }}
                      alt="X Icon"
                    />
                    <p style={{ transform: "translateX(50px)" }}>X</p>
                  </MenuListItem>

                  <MenuListItem
                    style={{ height: "50px", fontSize: "1.4rem" }}
                    onClick={() => window.open("https://t.me/windows95ctosol", "_blank")}
                  >
                    <img
                      src={teleIco}
                      style={{
                        position: "absolute",
                        width: "30px",
                      }}
                      alt="Telegram Icon"
                    />
                    <p style={{ transform: "translateX(50px)" }}>Telegram</p>
                  </MenuListItem>

                  <MenuListItem
                    style={{ height: "50px", fontSize: "1.4rem" }}
                    onClick={() => window.open("https://dexscreener.com/solana/3gbbkbvn95e1uger8mynspjcldu59johk9rmcd24kdhz", "_blank")}
                  >
                    <img
                      src={consoleIcon}
                      style={{
                        position: "absolute",
                        width: "20px",
                        left: "15px",
                      }}
                      alt="Console Icon"
                    />
                    <p style={{ transform: "translateX(50px)" }}>DexScreener</p>
                  </MenuListItem>

                  <MenuListItem
                    style={{ height: "50px", fontSize: "1.4rem" }}
                    onClick={() => window.open("https://pump.fun/coin/G8GdCEU4C7QrZTXKtpikGxDjp9xAAmT6Dmp4BfRypump", "_blank")}
                  >
                    <img
                      src={pumpIco}
                      style={{
                        position: "absolute",
                        width: "25px",
                        left: "15px",
                      }}
                      alt="Pump Icon"
                    />
                    <p style={{ transform: "translateX(50px)" }}>PumpFun</p>
                  </MenuListItem>
                </div>
              </MenuList>
            )}

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

          {/* Taskbar Tabs (Modals) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "0px 5px",
              gap: "10px",
              flex: 1,
            }}
          >
            {desktopItems.map((item) => {
              const modalState = openModals[item.id];
              if (!modalState.isOpen) return null;
              return (
                <Button
                  key={item.id}
                  style={{
                    height: "50px",
                    width: "13vw",
                    minWidth: "80px",
                    fontSize: "1.1rem",
                    backgroundColor: "#c0c0c0",
                    border: "3px inset  #e6e6e6",
                    boxShadow: "inset 1px 1px 3px #000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000000",
                    fontFamily: "ms_sans_serif",
                  }}
                  onClick={() =>
                    setOpenModals((prev) => ({
                      ...prev,
                      [item.id]: {
                        ...prev[item.id],
                        isVisible: !prev[item.id].isVisible,
                      },
                    }))
                  }
                >
                  <img
                    src={item.icon}
                    alt={`${item.name} Icon`}
                    style={{
                      height: "24px",
                      marginRight: windowWidth > 1200 ? "20px" : "0px",
                    }}
                  />
                  {windowWidth > 1200 && item.name}
                </Button>
              );
            })}
          </div>

          {/* Clock */}
          <div style={{ paddingRight: "4px" }}>
            <div
              style={{
                height: "50px",
                width: "5vw",
                minWidth: "80px",
                fontSize: "1.1rem",
                backgroundColor: "#c0c0c0",
                border: "3px inset  #e6e6e6",
                boxShadow: "inset 1px 1px 3px #000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000000",
                fontFamily: "ms_sans_serif",
              }}
            >
              {time}
            </div>
          </div>

          {/* Render All Modals */}
          {desktopItems.map((item) => {
            const modalState = openModals[item.id];
            return (
              <ModalWindow
                key={item.id}
                title={item.title}
                content={item.content}
                isOpen={modalState.isOpen}
                isVisible={modalState.isVisible}
                onClose={() =>
                  setOpenModals((prev) => ({
                    ...prev,
                    [item.id]: { ...prev[item.id], isOpen: false, isVisible: false },
                  }))
                }
                modalWidth={modalState.width}
                modalHeight={modalState.height}
                setModalWidth={(w) =>
                  setModalSize(item.id, w, modalState.height)
                }
                setModalHeight={(h) =>
                  setModalSize(item.id, modalState.width, h)
                }
                customStyles={item.customStyles}
                showMenuBar={item.showMenuBar}
                showStatusBar={item.showStatusBar}
                customMenuBar={item.customMenuBar}
                customStatusBar={item.customStatusBar}
              />
            );
          })}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default App;
