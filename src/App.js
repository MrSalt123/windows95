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
import cursor from "./assets/cursors/arrow0.png";
import hand from "./assets/cursors/hand0.png";

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
    cursor: url(${cursor}), auto;
  }

  button, [role='button'], a, .pointer {
    cursor: url(${hand}), pointer;
  }
`;

const App = () => {
    const [time, setTime] = useState("");
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAboutClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
                        top: "1vh",
                        left: "1vw",
                        color: "white",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    {/* Terminal Icon */}
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
                        className='pointer'
                    >
                        <img
                            src={console}
                            alt="Console Icon"
                            style={{ width: "4vw", height: "auto" }}
                            onClick={() => alert("Console clicked")}
                        />
                        <span style={{ fontSize: "0.9rem" }}>Terminal</span>
                    </div>

                    {/* About Icon */}
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
                        className='pointer'
                    >
                        <img
                            src={notepad}
                            alt="Notepad Icon"
                            style={{ width: "4vw", height: "auto" }}
                            onClick={handleAboutClick}
                        />
                        <span style={{ fontSize: "0.9rem" }}>About</span>
                    </div>

                    {isModalOpen && (
                        <div
                            style={{
                                position: "fixed",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "500px",
                                height: "400px",
                                backgroundColor: "#fff",
                                border: "2px solid black",
                                zIndex: 1000,
                                display: "flex",
                                flexDirection: "column",
                            }}
                            
                        >
                            {/* Title Bar */}
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
                                    className='pointer'
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Menu Bar */}
                            <div
                                style={{
                                    backgroundColor: "#c0c0c0",
                                    borderBottom: "1px solid #808080",
                                    padding: "5px 10px",
                                    fontSize: "12px",
                                    display: "flex",
                                }}
                            >
                                <span style={{ marginRight: "15px"}} className='pointer'>
                                    File
                                </span>
                                <span style={{ marginRight: "15px"}} className='pointer'>
                                    Edit
                                </span>
                                <span style={{ marginRight: "15px"}} className='pointer'>
                                    Search
                                </span>
                                <span style={{ marginRight: "15px"}} className='pointer'>
                                    Help
                                </span>
                            </div>

                            {/* Content Area */}
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
                                    This is a Windows 95-inspired UI built with React95.
                                    It mimics the look and feel of classic Windows 95 applications,
                                    like Notepad.
                                </p>
                            </div>

                            {/* Status Bar */}
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

                    {/* Roadmap Icon */}
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
                        className='pointer'
                    >
                        <img
                            src={globe}
                            alt="Globe Icon"
                            style={{ width: "4vw", height: "auto" }}
                            onClick={() => alert("Roadmap clicked")}
                        />
                        <span style={{ fontSize: "0.9rem" }}>Roadmap</span>
                    </div>

                    {/* Contact Icon */}
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
                        className='pointer'
                    >
                        <img
                            src={search}
                            alt="Search Icon"
                            style={{ width: "4vw", height: "auto" }}
                            onClick={() => alert("Contact clicked")}
                        />
                        <span style={{ fontSize: "0.9rem" }}>Contact</span>
                    </div>
                </div>

                {/* Taskbar */}
                <div
                    style={{
                        position: "fixed",
                        bottom: 0,
                        width: "100vw",
                        height: "6vh",
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
                                height: "5vh",
                                width: "8vw",
                                display: "flex",
                            }}
                        >
                            <img
                                src={win95Logo}
                                alt="Start Icon"
                                style={{
                                    height: "4vh",
                                    marginRight: "10px",
                                }}
                            />
                            <p style={{ fontSize: "1.2rem" }}>Start</p>
                        </Button>

                        {startMenuOpen && (
                            <MenuList
                                style={{
                                    position: "absolute",
                                    width: "25vw",
                                    bottom: "6vh",
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
                                        width: "4vw",
                                        backgroundColor: "#008080",
                                        color: "#c0c0c0",
                                        writingMode: "vertical-rl",
                                        transform: "rotate(180deg)",
                                        fontSize: "3rem",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}
                                >
                                    <p>Windows</p><p style={{ color: "white" }}> 95</p>
                                </div>

                                {/* Menu Items */}
                                <div
                                    style={{
                                        flex: "1",
                                        backgroundColor: "#C1C1C1F",

                                    }}
                                >
                                    <MenuListItem style={{ height: "85px", fontSize: "1.4rem", }} onClick={() => window.open("https://x.com/windows95cto", "_blank")}>
                                        <p style={{ transform: "translateX(20px)" }}>X</p>
                                    </MenuListItem>

                                    <MenuListItem style={{ height: "85px", fontSize: "1.4rem", }} onClick={() => window.open("https://t.me/windows95ctosol", "_blank")}>
                                        <p style={{ transform: "translateX(20px)" }}>Telegram</p>
                                    </MenuListItem>

                                    <MenuListItem style={{ height: "85px", fontSize: "1.4rem", }} onClick={() => window.open("https://dexscreener.com/solana/3gbbkbvn95e1uger8mynspjcldu59johk9rmcd24kdhz", "_blank")}>
                                        <p style={{ transform: "translateX(20px)" }}>DexScreener</p>
                                    </MenuListItem>

                                    <MenuListItem style={{ height: "85px", fontSize: "1.4rem", }} onClick={() => window.open("https://pump.fun/coin/G8GdCEU4C7QrZTXKtpikGxDjp9xAAmT6Dmp4BfRypump", "_blank")}>
                                        <p style={{ transform: "translateX(20px)" }}>PumpFun</p>
                                    </MenuListItem>
                                </div>
                            </MenuList>
                        )}

                        <TextInput
                            variant="flat"
                            placeholder="Search..."
                            width={200}
                            style={{
                                height: "4vh",
                                width: "320px",
                            }}
                        />
                    </div>

                    {/* Right side: Clock */}
                    <div style={{ paddingRight: "4px" }}>
                        <Button
                            active
                            style={{
                                height: "4vh",
                                width: "5vw",
                                fontSize: "1rem",
                            }}
                        >
                            {time}
                        </Button>
                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default App;
