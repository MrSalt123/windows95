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
                zIndex: "1000",
                position: "fixed",
                bottom: "0px",
                width: "100%",
                height: "4vh",
                minHeight: "40px",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#c0c0c0",
                borderTop: "2px solid #ffffff",
                borderBottom: "2px solid #808080",
                padding: "5px, 1px",
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
                    ref={startButtonRef}
                    onClick={(e) => {
                        e.stopPropagation();
                        setStartMenuOpen(!startMenuOpen);
                    }}
                    active={false}
                    style={{
                        fontWeight: "bold",
                        height: "90%",
                        border: "none",
                        backgroundColor: "transparent",
                        left: "5px",
                        width: "100%",
                        minWidth: "50px",
                        display: "flex",
                        marginRight:"10px" 
                    }}
                >
                    <img
                        src={win95Logo}
                        alt="Start Icon"
                        style={{
                            minWidth: "35px",
                            height: "80%",
                            minHeight: "20px",
                            marginRight: "10px",
                        }}
                    />
                    {windowWidth > 1200 && (
                        <p style={{ fontSize: "1.2rem" }}>Start</p>
                    )}
                </Button>

                {startMenuOpen && <StartMenu ref={menuRef} handleIconClick={handleIconClick} />}

                {windowWidth >= 600 && (
                    <TextInput
                        variant="flat"
                        placeholder="Search..."
                        width={200}
                        style={{
                            height: "90%",
                            width: "18dvw",
                            visibility: "hidden",
                            display: "none",
                        }}
                    />
                )}
            </div>

            {/* Taskbar Tabs (Modals) */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "0px 5px",
                    gap: "5px",
                    flex: 1,
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
                                height: "100%",
                                top: "1px",
                                width: "13vw",
                                minWidth: "60px",
                                backgroundColor: "#c0c0c0",
                                border: "3px inset #e6e6e6",
                                boxShadow: "inset 1px 1px 3px #000000",
                                fontFamily: "ms_sans_serif",
                                cursor: "pointer",
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
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={desktopItem.icon}
                                    alt={`${desktopItem.name} Icon`}
                                    style={{
                                        height: "24px",
                                        marginRight: windowWidth > 1200 ? "10px" : "0px",
                                    }}
                                />
                                {windowWidth > 1200 && desktopItem.name}
                            </Button>

                            {/* Close Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent tab click action
                                    closeModal(key); // Call the passed-in closeModal function
                                }}
                                style={{
                                    position: "absolute",
                                    top: "10%",
                                    right: "5%",
                                    height: "16px",
                                    width: "16px",
                                    color: "black",
                                    border: "none",
                                    borderRadius: "50%",
                                    fontSize: "12px",
                                    cursor: "pointer",
                                }}
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
                        height: "100%",
                        width: "5vw",
                        minWidth: "80px",
                        fontSize: "1.1rem",
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
