/***************************************************************************
 *                           IMPORTS & GLOBAL SETUP
 ***************************************************************************/
import React, { useState, useEffect, useRef } from "react";
import GlobalStyles from "../styles/GlobalStyles"; // Styling for font, cursor, etc.
import { ThemeProvider } from "styled-components"; // Theme for components
import TopIndicators from "./TopIndicators"; // CA + current token price
import ModalWindow from "./ModalWindow"; // Modal Window for notepad, terminal, paint
import desktopItems from "./DesktopItems"; // Desktop Icons
import Taskbar from "./Taskbar"; // New component for taskbar

import bgImage from "../assets/images/windows95bglogo.png"; // Background
import original from "react95/dist/themes/original"; // Theme

/***************************************************************************
 * MAIN APP COMPONENT
 ***************************************************************************/
const App = () => {
    const [time, setTime] = useState("");
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const menuRef = useRef(null);
    const startButtonRef = useRef(null); // Reference for Start button

    // Header height to prevent modal overlap
    const headerHeight = 60;

    // Initialize modal states for desktop items
    const initialState = {};
    desktopItems.forEach((item) => {
        initialState[item.id] = {
            isOpen: false,
            isVisible: false,
            isMaximized: false,
        };
    });
    const [openModals, setOpenModals] = useState(initialState);
    const [zOrder, setZOrder] = useState([]);

    const handleIconClick = (id) => {
        if (openModals[id]?.isOpen) {
            // Do nothing if the modal is already open
            return;
        }
        const openModalCount = Object.values(openModals).filter(modal => modal.isOpen).length;
        setOpenModals((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                isOpen: true,
                isVisible: true,
                offset: openModalCount * 20, // Assign current global offset to the modal
            },
        }));
        bringToFront(id);
        // setGlobalOffset((prev) => prev + 20); // Increment system-wide offset for the next modal
    };

    const bringToFront = (id) => {
        setZOrder((prev) => {
            const newOrder = prev.filter((modalId) => modalId !== id); // Remove the clicked modal
            return [...newOrder, id]; // Add it to the end
        });
    };

    const handleMinimize = (id) => {
        setOpenModals((prev) => ({
            ...prev,
            [id]: { ...prev[id], isVisible: false },
        }));
    };

    const closeModal = (id) => {
        setOpenModals((prev) => ({
            ...prev,
            [id]: { ...prev[id], isOpen: false, isVisible: false, isMaximized: false },
        }));
        setZOrder((prev) => prev.filter((modalId) => modalId !== id));
    };

    const toggleMaximize = (id) => {
        setOpenModals((prev) => ({
            ...prev,
            [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
        }));
    };

    useEffect(() => {
        if (zOrder.length === 0) {
            // Initialize zOrder based on desktop items
            setZOrder(desktopItems.map((item) => item.id));
        }
    }, []);

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
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                startButtonRef.current &&
                !startButtonRef.current.contains(event.target)
            ) {
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
                    className="absolute top-1/2 left-1/2 w-[22%] min-w-[300px] transform -translate-x-1/2 -translate-y-1/2"
                    alt="background"
                />

                {/* Desktop Icons */}
                <div className="absolute top-[2%] left-[1vw] text-white text-center flex flex-col gap-5"
                                 style={{
                                    height: "auto",
                                }}>

                    {desktopItems.map((item) => (
                        <div
                            key={item.id}
                            className="p-2 text-center transition-colors duration-100 pointer hover:bg-white/30"
                            onClick={() => handleIconClick(item.id)}
                        >
                            <img

                                src={item.icon}
                                alt={`${item.name} Icon`}
                                className="h-[7vh] w-[7vh] min-w-[35px] min-h-[35px]"

                            />
                            <span className="text-[0.6rem]">{item.name}</span>
                        </div>
                    ))}
                </div>

                {/* Taskbar */}
                <Taskbar
                    desktopItems={desktopItems}
                    startMenuOpen={startMenuOpen}
                    setStartMenuOpen={setStartMenuOpen}
                    startButtonRef={startButtonRef}
                    menuRef={menuRef}
                    time={time}
                    windowWidth={windowWidth}
                    handleIconClick={handleIconClick}
                    openModals={openModals}
                    setOpenModals={setOpenModals}
                    bringToFront={bringToFront}
                    closeModal={closeModal}
                />

                {/* Render All Modals */}
                {desktopItems.map((item) => {
                    const modalState = openModals[item.id];
                    const zIndex = zOrder.indexOf(item.id) + 1;
                    const offset = openModals[item.id]?.offset || 0;

                    return (
                        <ModalWindow
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            icon={item.icon}
                            content={item.content}
                            isOpen={modalState.isOpen}
                            isVisible={modalState.isVisible}
                            onClose={() => closeModal(item.id)}
                            onMinimize={() => handleMinimize(item.id)}
                            onMaximizeToggle={() => toggleMaximize(item.id)}
                            onMouseDown={() => bringToFront(item.id)}
                            zIndex={zIndex}
                            customMenuBar={item.customMenuBar}
                            customStatusBar={item.customStatusBar}
                            showMenuBar={item.showMenuBar} 
                            showStatusBar={item.showStatusBar}
                            customStyles={{
                                container: modalState.isMaximized
                                    ? {
                                        top: "0px",
                                        left: "0px",
                                        width: "100vw",
                                        height: `calc(100vh - ${headerHeight}px)`,
                                    }
                                    : {
                                        top: `calc(50vh - ${450 / 2}px + ${offset}px)`,
                                        left: `calc(50vw - ${450 / 2}px + ${offset}px)`,
                                    },
                            }}
                        />
                    );
                })}

            </ThemeProvider>
        </div>
    );
};

export default App;
