
import React from "react";
import consoleIcon from "../assets/images/console_prompt-0.png";
import notepad from "../assets/images/notepad.png";
import globe from "../assets/images/globe.png";
import search from "../assets/images/search.png";
import pumpIco from "../assets/images/pump-ico.png";

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
                <p style={{ lineHeight: "1.5", color: "black" }}>
                    The Windows95 Token is a tribute to the charm of simplicity and nostalgia, a digital reminder of a time when computing was excitingly fresh, yet delightfully uncomplicated. This token encapsulates the essence of the mid-90s tech era: the sound of a dial-up connection, the iconic startup chime, and the thrill of discovering the endless possibilities of a personal computer for the first time.
                </p>
                <br></br>
                <p style={{ lineHeight: "1.5", color: "black" }}>
                    In a world rapidly advancing with AI-driven coins and high-tech innovation, Windows95 Token offers a breath of fresh air—proof that sometimes, less is more. It's a celebration of clean interfaces, straightforward functionality, and the joy of exploration without overwhelming complexity.
                </p>
                <br></br>
                <p style={{ lineHeight: "1.5", color: "black" }}>
                    It’s not just a cryptocurrency; it’s a movement that reminds us to embrace simplicity, appreciate history, and find innovation in nostalgia. Experience a time when every pixel had meaning, and let Windows95 Token refresh your perspective in the digital revolution.
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
    // **DexScreener Desktop Item**
    {
        id: "chart",
        name: "Chart",
        icon: consoleIcon, // Replace with a specific DexScreener icon if available
        content: (
            <iframe
                height="100%"
                width="100%"
                id="geckoterminal-embed"
                title="GeckoTerminal Embed"
                src="https://www.geckoterminal.com/solana/pools/3gbBKbVn95E1UGeR8MYNsPJcLdU59johk9rmCD24kdHz?embed=1&info=0&swaps=1&grayscale=0&light_chart=1"
                frameBorder="0"
                allow="clipboard-write"
                allowFullScreen
                style={{ border: "none", fontWeight: "bold" }}
            ></iframe>
        ),
        title: "Chart",
        showMenuBar: false,
        showStatusBar: false,
        customStyles: {
            main: {
                padding: "0",
            },
        },
    },
];

export default desktopItems;
