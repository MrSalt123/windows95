import React, { useState, useEffect } from "react";
import consoleIcon from "../assets/images/console_prompt-0.png";
import notepad from "../assets/images/notepad.png";
import globe from "../assets/images/globe.png";
import roadmap from "../assets/images/roadmap.png";
import chart from "../assets/images/chart-ico.png";
import folderIco from "../assets/images/folderIco.png";
import MusicFolderContent from "../utils/musicFolder";


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

const TerminalContent = () => {
    const [output] = useState([
        "crypto-ops --sync blockchain",
        "Initializing crypto operations...",
        "[ 0% ] Connecting to the blockchain...",
        "[ 5% ] Loading Windows95 Token...",
        "[ 10% ] Fetching token metadata...",
        "[ 20% ] Checking current price:",
        "[ 30% ] Synchronizing mempool: 100 transactions pending..",
        "[ 40% ] Verifying 1000x incoming...",
        "[ 50% ] Confirming: Preparing for liftoff...",
        "[ 60% ] Token status: Ready to moon",
        "[ 70% ] Broadcasting to the blockchain...",
        "[ 80% ] Accumulating community FOMO...",
        "[ 90% ] Reaching escape velocity...",
        "[100% ] Operations complete. The moon is calling.",
    ]);
    const [displayedLines, setDisplayedLines] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [input, setInput] = useState("");

    useEffect(() => {
        if (currentIndex < output.length) {
            const timer = setTimeout(() => {
                setDisplayedLines((prev) => [...prev, output[currentIndex]]);
                setCurrentIndex((prev) => prev + 1);
            }, 750); // 500ms delay
            return () => clearTimeout(timer);
        }
    }, [currentIndex, output]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (input.trim()) {
                setDisplayedLines((prev) => [
                    ...prev,
                    `> ${input}`,
                    "Command not found",
                ]);
                setInput("");
            }
        }
    };

    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                fontFamily: "monospace",
                color: "green",
                backgroundColor: "black",
                padding: "10px",
                overflowY: "auto",
            }}
        >
            {displayedLines.map((line, index) => (
                <p key={index} style={{ margin: 0 }}>
                    {line}
                </p>
            ))}
            <div>
                <span style={{ color: "green" }}>$ </span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{
                        backgroundColor: "black",
                        color: "green",
                        border: "none",
                        outline: "none",
                        width: "90%",
                    }}
                    autoFocus
                />
            </div>
        </div>
    );
};


const desktopItems = [
    {
        id: "terminal",
        name: "Terminal",
        icon: consoleIcon,
        content: <TerminalContent />,
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
                    <img src={roadmap} alt="Roadmap" style={{
                        position: "relative",


                    }} />
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
        title: "Roadmap - Paint",
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
        id: "chart",
        name: "Chart",
        icon: chart,
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
