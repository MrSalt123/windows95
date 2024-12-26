/***************************************************************************
 *                           TASKBAR COMPONENT
 * Renders the taskbar with Start button, search bar, open modals, and clock.
 ***************************************************************************/
import React from "react";
import { Button, TextInput } from "react95";
import win95Logo from "../assets/images/win95.png";
import StartMenu from "./StartMenu";

const Taskbar = ({
    desktopItems,
    startMenuOpen,
    setStartMenuOpen,
    startButtonRef,
    menuRef,
    time,
    windowWidth,
    handleIconClick,
    openModals,
    setOpenModals,
    bringToFront,
    closeModal,
}) => {
    return (
        <div
            style={{
                zIndex: 1000,
                position: "fixed",
                bottom: "0px",
                width: "100vw",
                height: "4.3vh",
                minHeight: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#c0c0c0",
                borderTop: "2px solid #ffffff",
                borderBottom: "2px solid #808080",
                padding: "1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             px 2px",
            }}
        >
            {/* Start Button & Search */}
            <div
                style={{
                    height: "90%",
                    display: "flex",
                    alignItems: "center",
                    margin: "0px 5px",
                    gap: "5px",

                }}
            >
                <Button
                    ref={startButtonRef}
                    onClick={(e) => {
                        e.stopPropagation();
                        setStartMenuOpen(!startMenuOpen);
                    }}
                    active={false}
                    style={{
                        height:"100%",
                        fontWeight: "bold",
                        border: "none",
                        backgroundColor: "transparent",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 10px",
                        cursor: "pointer",
                    }}
                >
                    <img
                        src={win95Logo}
                        alt="Start Icon"
                        style={{
                            width: "30%", // Adjusted size for consistency
                            minWidth:"20px",
                            marginRight: "5px",
                        }}
                    />
                    {windowWidth > 1200 && (
                        <span style={{ fontSize: "1rem" }}>Start</span>
                    )}
                </Button>

                {startMenuOpen && (
                    <StartMenu
                        ref={menuRef}
                        handleIconClick={handleIconClick}
                        desktopItems={desktopItems}
                    />
                )}

                {/* Search Bar: Visible only on desktop (windowWidth >= 600) */}
                {/* Search Bar: Visible only on desktop (windowWidth >= 600) */}
                {windowWidth >= 600 && (
                    <div
                        style={{
                            height: "100%", // Ensures the wrapper div takes full height
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Search..."
                            style={{
                                height: "90%", // Desired height
                                width: "200px",
                                outline: "none",
                                border: "1px solid #808080",
                                padding: "2px",
                                fontSize: "0.9rem",
                                borderTop: "2px solid #FFFFFF",
                                borderLeft: "2px solid #FFFFFF",
                                borderBottom: "2px solid #black",
                                borderRight: "2px solid #808080",
                                backgroundColor: "white",
                                cursor: "text",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Taskbar Tabs (Modals) */}
            <div
                style={{
                    height: "90%",
                    display: "flex",
                    alignItems: "center",
                    margin: "0px 5px",
                    gap: "5px",
                    flex: 1,
                    overflowX: "auto", // Added scroll for overflow
                }}
            >
                {Object.keys(openModals).map((key) => {
                    const modal = openModals[key];
                    if (!modal.isOpen) return null;

                    // Find the corresponding desktop item
                    const desktopItem = desktopItems.find((item) => item.id === key);

                    if (!desktopItem) return null; // Skip if no match

                    return (
                        <div
                            key={key}
                            style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height:"100%",
                                width: "16.66%",
                                minWidth: "60px",
                                backgroundColor: "#c0c0c0",
                                boxShadow: "inset 1px 1px 3px #000000",
                                fontFamily: "ms_sans_serif",
                                cursor: "pointer",
                                overflow: "hidden",
                                
                            }}
                        >
                            {/* Taskbar Tab Button */}
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation(); // Avoid triggering unwanted actions
                                    setOpenModals((prev) => ({
                                        ...prev,
                                        [key]: {
                                            ...prev[key],
                                            isVisible: true, // Restore visibility if minimized
                                        },
                                    }));
                                    bringToFront(key); // Bring the modal to the front
                                }}
                                style={{
                                    width: "100%",
                                    height:"90%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={desktopItem.icon}
                                    alt={`${desktopItem.name} Icon`}
                                    style={{
                                        height: "20px",
                                        width: "20px",
                                        marginRight: windowWidth > 1200 ? "5px" : "0px",
                                    }}
                                />
                                {windowWidth > 1200 && (
                                    <span style={{ fontSize: "0.9rem" }}>{desktopItem.name}</span>
                                )}
                            </Button>

                            {/* Close Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent tab click action
                                    closeModal(key); // Call the passed-in closeModal function
                                }}
                                style={{
                                    position: "absolute",
                                    top: "2px",
                                    right: "5px",
                                    height: "16px",
                                    width: "16px",
                                    color: "black",
                                    border: "none",
                                    borderRadius: "50%",
                                    fontSize: "10px",
                                    cursor: "pointer",
                                }}
                                title="Close"
                            >
                                ✕
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Clock */}
            <div style={{ paddingRight: "4px" }}>
                <div
                    style={{
                        height:"90%",
                        width: "5vw",
                        minWidth: "50px",
                        fontSize: "0.9rem",
                        backgroundColor: "#c0c0c0",
                        border: "3px inset #e6e6e6",
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
        </div>
    );
};
    export default Taskbar;
