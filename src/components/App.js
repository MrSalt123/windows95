/***************************************************************************
 *                           IMPORTS & GLOBAL SETUP
 ***************************************************************************/
import React, { useState, useEffect, useRef } from "react";
import GlobalStyles from "../styles/GlobalStyles"; 
import { ThemeProvider } from "styled-components";
import TopIndicators from "./TopIndicators"; 
import ModalWindow from "./ModalWindow"; 
import desktopItems from "./DesktopItems"; 
import Taskbar from "./Taskbar"; 
import bgImage from "../assets/images/windows95bglogo.png"; 
import original from "react95/dist/themes/original";

/***************************************************************************
 * MAIN APP COMPONENT
 ***************************************************************************/
const App = () => {
    const [time, setTime] = useState("");
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const menuRef = useRef(null);
    const startButtonRef = useRef(null);

    const isMobile = windowWidth <= 768;
    const headerHeight = 40;

    // Build an object that tracks open/closed state for each desktop item
    const initialState = {};
    desktopItems.forEach((item) => {
        initialState[item.id] = {
            isOpen: false,
            isVisible: false,
            isMaximized: false,
            offset: 0, // We'll store the per-modal offset here
        };
    });
    const [openModals, setOpenModals] = useState(initialState);

    // Keep track of a zOrder array so we can bring modals to front
    const [zOrder, setZOrder] = useState([]);

    /**
     * handleIconClick:
     * Previously you had an if-check that prevented opening a modal
     * if it was already open. That also meant no new offset. 
     * Removing that check => multiple modals can open & keep stacking.
     */
    const handleIconClick = (id) => {
        // Count how many modals are currently open
        const openModalCount = Object.values(openModals).filter((modal) => modal.isOpen).length;

        // Assign the next offset = (# currently open) * 20
        const newOffset = openModalCount * 20;

        // Now open or re-open the modal, and store that new offset
        setOpenModals((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                isOpen: true,
                isVisible: true,
                isMaximized: false,
                offset: newOffset,
            },
        }));
        bringToFront(id);
    };

    // Bring the given modal to front by adjusting zOrder
    const bringToFront = (id) => {
        setZOrder((prev) => {
            const newOrder = prev.filter((modalId) => modalId !== id);
            return [...newOrder, id];
        });
    };

    // Minimizing => isVisible=false (still open in background)
    const handleMinimize = (id) => {
        setOpenModals((prev) => ({
            ...prev,
            [id]: { ...prev[id], isVisible: false },
        }));
    };

    // Full close => isOpen=false, not visible, not maximized
    const closeModal = (id) => {
        setOpenModals((prev) => ({
            ...prev,
            [id]: { ...prev[id], isOpen: false, isVisible: false, isMaximized: false },
        }));
        setZOrder((prev) => prev.filter((modalId) => modalId !== id));
    };

    // Toggle the maximize state
    const toggleMaximize = (id) => {
        setOpenModals((prev) => ({
            ...prev,
            [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
        }));
    };

    // Initialize zOrder with all desktop item IDs once on mount
    useEffect(() => {
        if (zOrder.length === 0) {
            setZOrder(desktopItems.map((item) => item.id));
        }
    }, [zOrder.length]);

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

    // Close Start menu if user clicks outside
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

    // Track window size changes
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            <GlobalStyles />
            <ThemeProvider theme={original}>
                {/* Top Indicators */}
                <TopIndicators />

                {/* Wallpaper */}
                <img
                    src={bgImage}
                    className="absolute top-1/2 left-1/2 w-[22%] min-w-[130px] transform -translate-x-1/2 -translate-y-1/2"
                    alt="background"
                />

                {/* Desktop Icons */}
                <div className="absolute top-[2%] left-[1vw] text-white text-center flex flex-col gap-5">
                    {desktopItems.map((item) => (
                        <div
                            key={item.id}
                            className="p-2 text-center transition-colors duration-100 pointer hover:bg-white/30"
                            onClick={() => handleIconClick(item.id)}
                        >
                            <img
                                style={{
                                    width: "2.7dvw",
                                    height: "auto",
                                }}
                                src={item.icon}
                                alt={`${item.name} Icon`}
                                className="h-[7vh] w-[7vh] min-w-[35px] min-h-[35px]"
                            />
                            <span className="text-[0.7rem]">{item.name}</span>
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
                    if (!modalState.isOpen) return null; // skip if not open

                    // Each modal's zIndex = its position in zOrder + 1 (just for layering)
                    const modalZIndex = zOrder.indexOf(item.id) + 1;

                    // Use the offset from openModals to stack
                    const offset = modalState.offset || 0;

                    const isMobile = windowWidth <= 768;

                    return (
                        <ModalWindow
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            icon={item.icon}
                            content={item.content}
                            isOpen={modalState.isOpen}
                            isVisible={modalState.isVisible}
                            isMobile={isMobile}
                            onClose={() => closeModal(item.id)}
                            onMinimize={() => handleMinimize(item.id)}
                            onMaximizeToggle={() => toggleMaximize(item.id)}
                            onMouseDown={() => bringToFront(item.id)}
                            zIndex={modalZIndex}
                            showMenuBar={item.showMenuBar}
                            showStatusBar={item.showStatusBar}
                            customMenuBar={item.customMenuBar}
                            customStatusBar={item.customStatusBar}
                            // We'll rely on the built-in offset logic from ModalWindow
                            // by passing it the "stackIndex" derived from offset/20
                            // so it can do the final calc in the "calc(50vw - ... )" code
                            stackIndex={Math.round(offset / 20)}
                        />
                    );
                })}
            </ThemeProvider>
        </div>
    );
};

export default App;
