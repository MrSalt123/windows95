import React, { useState, useEffect } from "react";
import { Button, styleReset, MenuListItem } from "react95";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import win95Logo from "./assets/images/win95.png";
import win95Computer from "./assets/images/computer.png";
import bgImage from "./assets/images/windowsbackground.jpg"
import recycle from "./assets/images/recycle.png"

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
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
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

const handleClick = () => {
    console.log('clicked');
}

const App = () => {
    const [time, setTime] = useState("");

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
                <div className="ml-3 mt-3">
                    <img
                        src={win95Computer}
                        alt="My Computer Icon"
                        style={{ height: "5vh", marginBottom: "5px" }}
                        onClick={handleClick}
                    />
                    <span style={{ fontSize: "0.8rem", textAlign: "center" }}>My Computer</span>
                    
                    <img
                        src={recycle}
                        alt="My Computer Icon"
                        style={{ height: "5vh", marginBottom: "5px" }}
                    />
                    <span style={{ fontSize: "0.8rem", textAlign: "center" }}>Recycle</span>
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
                    <div style={{ display: "flex", alignItems: "center", paddingLeft: "5px" }}>
                        <Button style={{ fontWeight: "bold", marginRight: "10px" }}>
                            <img
                                src={win95Logo}
                                alt="Start Icon"
                                style={{ height: "20px", marginRight: "5px" }}
                            />
                            Start
                        </Button>
                        <div style={{ display: "flex", gap: "15px" }}>
                            <MenuListItem style={{ fontWeight: "bold", cursor: "pointer" }} onClick={handleClick}>Roadmap</MenuListItem>
                            <MenuListItem style={{ fontWeight: "bold", cursor: "pointer" }}>About</MenuListItem>
                            <MenuListItem style={{ fontWeight: "bold", cursor: "pointer" }}>Contact</MenuListItem>
                        </div>
                    </div>

                    {/* Right side: Clock */}
                    <div style={{ paddingRight: "10px" }}>
                        <Button className="font-bold" active>{time}</Button>
                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default App;
